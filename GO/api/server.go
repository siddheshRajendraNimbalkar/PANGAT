package api

import (
	"log"

	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"
	db "github.com/siddheshRajendraNimbalkar/PANGAT/GO/db/sqlc"
)

type Server struct {
	store  *db.Queries
	router *gin.Engine
	socket *socketio.Server
}

func NewServer(store *db.Queries) *Server {
	server := &Server{store: store}
	router := gin.Default()

	router.POST("/conversation", server.createConversation)

	if err := server.setupSocketServer(); err != nil {
		log.Fatal("[Socket Error ]:", err)
	}
	router.GET("/socket/*any", gin.WrapH(server.socket))

	server.router = router
	return server
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
