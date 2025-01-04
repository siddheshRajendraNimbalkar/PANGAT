package api

import (
	"fmt"
	"log"

	socketio "github.com/googollee/go-socket.io"
	"github.com/googollee/go-socket.io/engineio"
)

func (server *Server) setupSocketServer() error {
	socketServer := socketio.NewServer(&engineio.Options{
		PingTimeout:  5000,
		PingInterval: 2500,
	})

	// Define Socket.IO events
	socketServer.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		log.Println("connected:", s.ID())
		return nil
	})

	socketServer.OnError("/", func(s socketio.Conn, e error) {
		log.Printf("Socket error from %s: %v\n", s.ID(), e)
	})

	socketServer.OnEvent("/", "chat message", func(s socketio.Conn, msg string) {
		log.Printf("Message received from %s: %s\n", s.ID(), msg)
		s.Emit("chat message", fmt.Sprintf("Echo: %s", msg))
	})

	socketServer.OnDisconnect("/", func(s socketio.Conn, reason string) {
		log.Printf("Client disconnected: %s, reason: %s\n", s.ID(), reason)
	})

	// Set the server instance
	server.socket = socketServer

	// Run the Socket.IO server in a goroutine
	go func() {
		if err := socketServer.Serve(); err != nil {
			log.Printf("Socket.IO server error: %v\n", err)
		}
	}()

	return nil
}
