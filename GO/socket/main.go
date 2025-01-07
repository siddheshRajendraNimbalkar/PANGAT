package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	_ "github.com/lib/pq"
	db "github.com/siddheshRajendraNimbalkar/PANGAT/GO/db/sqlc"
	"github.com/siddheshRajendraNimbalkar/PANGAT/GO/util"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var (
	clientsMu sync.Mutex
	rooms     = make(map[string]map[*websocket.Conn]bool)
)

var dbConn *sql.DB

type CreateMessageProps struct {
	Content     string         `json:"content" binding:"required"`
	FileUrl     sql.NullString `json:"fileUrl"`
	MemberId    string         `json:"memberId" binding:"required"`
	ChannelId   string         `json:"channelId" binding:"required"`
	MemberImage string         `json:"memberImage" `
	RoomId      string         `json:"roomId" binding:"required" default:"0"`
	GroupId     string         `json:"groupId" binding:"required" default:"0"`
}

func broadcastMessage(roomID string, sender *websocket.Conn, messageType int, message []byte) {
	clientsMu.Lock()
	defer clientsMu.Unlock()

	if clients, exists := rooms[roomID]; exists {
		for client := range clients {
			if err := client.WriteMessage(messageType, message); err != nil {
				log.Printf("[Socket Error]: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
		if len(clients) == 0 {
			delete(rooms, roomID)
		}
	}
}

func initDB() *sql.DB {
	config, err := util.LoadConfig("../")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	dbConn, err = sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	if err := dbConn.Ping(); err != nil {
		log.Fatal("cannot ping db:", err)
	}
	return dbConn
}

func main() {
	dbConn = initDB()
	store := db.New(dbConn)
	r := gin.Default()

	r.GET("/conversation/:id", func(c *gin.Context) {
		roomID := c.Param("id")
		if roomID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": "Room ID is required"})
			return
		}

		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			log.Printf("[Socket Error]: %v", err)
			return
		}

		clientsMu.Lock()
		if rooms[roomID] == nil {
			rooms[roomID] = make(map[*websocket.Conn]bool)
		}
		rooms[roomID][conn] = true
		clientsMu.Unlock()

		log.Printf("Client Connected to room %s: %v", roomID, conn.RemoteAddr())

		defer func() {
			clientsMu.Lock()
			if room := rooms[roomID]; room != nil {
				delete(room, conn)
				if len(room) == 0 {
					delete(rooms, roomID)
				}
			}
			clientsMu.Unlock()

			log.Printf("Client Disconnected from room %s: %v", roomID, conn.RemoteAddr())
			conn.Close()
		}()

		for {
			messageType, message, err := conn.ReadMessage()
			if err != nil {
				log.Printf("[Socket Error]: %v", err)
				break
			}

			// Parse the incoming WebSocket message as JSON
			var req CreateMessageProps
			if err := json.Unmarshal(message, &req); err != nil {
				log.Printf("Error parsing message: %v", err)
				conn.WriteJSON(gin.H{"success": false, "error": "Invalid message format"})
				continue
			}

			if req.RoomId == "0" && req.GroupId == "0" {
				conn.WriteJSON(gin.H{"success": false, "error": "Room ID or Group ID is required"})
				continue
			}
			fmt.Println(req)
			if req.RoomId != "0" && len(req.RoomId) > 0 && req.RoomId[0] != 'g' {
				params := db.CreateMessageParams{
					Content:   req.Content,
					FileUrl:   req.FileUrl,
					MemberId:  req.MemberId,
					ChannelId: req.ChannelId,
					RoomId:    req.RoomId,
				}

				if _, err := store.CreateMessage(c, params); err != nil {
					log.Printf("Error creating message: %v", err)
					conn.WriteJSON(gin.H{"success": false, "error": "Error storing message in database"})
					continue
				}
			} else if req.GroupId != "0" && len(req.RoomId) > 0 || req.GroupId[0] == 'g' {
				params := db.CreateGroupMessageParams{
					GroupId:     req.GroupId,
					Content:     req.Content,
					FileUrl:     req.FileUrl,
					MemberId:    req.MemberId,
					MemberImage: req.MemberImage,
					ChannelId:   req.ChannelId,
				}

				if _, err := store.CreateGroupMessage(c, params); err != nil {
					log.Printf("Error creating message: %v", err)
					conn.WriteJSON(gin.H{"success": false, "error": "Error storing message in database"})
					continue
				}
			}
			broadcastMessage(roomID, conn, messageType, message)
		}
	})

	fmt.Println("Server started on port 8081")
	if err := r.Run(":8081"); err != nil {
		fmt.Println("Error while starting server:", err)
	}
}
