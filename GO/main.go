package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	_ "github.com/lib/pq"
	"github.com/siddheshRajendraNimbalkar/PANGAT/GO/api"
	db "github.com/siddheshRajendraNimbalkar/PANGAT/GO/db/sqlc"
	"github.com/siddheshRajendraNimbalkar/PANGAT/GO/util"
)

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	dbConn  *sql.DB
	clients sync.Map
)

type CreateMessageProps struct {
	Content     string         `json:"content" binding:"required"`
	FileUrl     sql.NullString `json:"fileUrl"`
	MemberId    string         `json:"memberId" binding:"required"`
	ChannelId   string         `json:"channelId" binding:"required"`
	MemberImage string         `json:"memberImage"`
	RoomId      string         `json:"roomId" binding:"required" default:"0"`
	GroupId     string         `json:"groupId" binding:"required" default:"0"`
}

func initDB() *sql.DB {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	db, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal("cannot ping db:", err)
	}
	fmt.Println("Connected to Database!")
	return db
}

func broadcastMessage(roomID string, sender *websocket.Conn, messageType int, message []byte) {
	value, ok := clients.Load(roomID)
	if !ok {
		return
	}
	clientMap := value.(map[*websocket.Conn]bool)
	for client := range clientMap {

		if err := client.WriteMessage(messageType, message); err != nil {
			log.Printf("[Socket Error]: %v", err)
			client.Close()
			delete(clientMap, client)
		}

	}
	if len(clientMap) == 0 {
		clients.Delete(roomID)
	}
}

func handleSocket(c *gin.Context, store *db.Queries) {
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

	clientMap, _ := clients.LoadOrStore(roomID, make(map[*websocket.Conn]bool))
	clientMap.(map[*websocket.Conn]bool)[conn] = true

	log.Printf("Client Connected to room %s: %v", roomID, conn.RemoteAddr())

	defer func() {
		delete(clientMap.(map[*websocket.Conn]bool), conn)
		if len(clientMap.(map[*websocket.Conn]bool)) == 0 {
			clients.Delete(roomID)
		}
		conn.Close()
		log.Printf("Client Disconnected from room %s: %v", roomID, conn.RemoteAddr())
	}()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Printf("[Socket Error]: %v", err)
			break
		}

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
		} else if req.GroupId != "0" && (len(req.RoomId) > 0 || req.GroupId[0] == 'g') {
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
}

func startSocketServer(store *db.Queries) {
	r := gin.Default()
	r.GET("/conversation/:id", func(c *gin.Context) {
		handleSocket(c, store)
	})

	fmt.Println("WebSocket Server started on port 8081")
	if err := r.Run(":8081"); err != nil {
		log.Fatal("Error while starting WebSocket server:", err)
	}
}

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	dbConn = initDB()
	store := db.New(dbConn)
	server := api.NewServer(store)

	go startSocketServer(store)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	fmt.Println("Server is running on port", config.Addr)

	go func() {
		if err := server.Start(config.Addr); err != nil {
			log.Fatal("cannot start server:", err)
		}
	}()

	<-ctx.Done()
	fmt.Println("\nShutting down gracefully...")

	dbConn.Close()
	fmt.Println("Database connection closed.")

	time.Sleep(2 * time.Second)
	fmt.Println("Server stopped.")
}
