package api

import (
	"github.com/gin-gonic/gin"
	db "github.com/siddheshRajendraNimbalkar/PANGAT/GO/db/sqlc"
)

type Server struct {
	store  *db.Queries
	router *gin.Engine
}

func NewServer(store *db.Queries) *Server {
	server := &Server{store: store}
	router := gin.Default()

	router.POST("/conversation", server.createConversation)

	server.router = router
	return server
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
