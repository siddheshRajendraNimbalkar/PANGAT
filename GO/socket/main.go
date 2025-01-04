package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
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

func broadcastMessage(roomID string, sender *websocket.Conn, messageType int, message []byte) {
	clientsMu.Lock()
	defer clientsMu.Unlock()

	if clients, exists := rooms[roomID]; exists {
		for client := range clients {
			if client == sender {
				continue
			}
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

func main() {
	r := gin.Default()

	r.GET("/conversation/:id", func(c *gin.Context) {
		roomID := c.Param("id")
		if roomID == "" {
			fmt.Println("[-----------------Room ID-----------------------------]", roomID)
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
			log.Printf("Message Received in room %s from %v: %s", roomID, conn.RemoteAddr(), message)
			broadcastMessage(roomID, conn, messageType, message)
		}
	})

	fmt.Println("Server started on port 8081")
	if err := r.Run(":8081"); err != nil {
		fmt.Println("Error while starting server:", err)
	}
}
