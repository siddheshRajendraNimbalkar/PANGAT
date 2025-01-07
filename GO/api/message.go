package api

import (
	"github.com/gin-gonic/gin"
)

type GetAllMessageParams struct {
	RoomId string `json:"room_id"`
}

func (server *Server) putAllMessage(ctx *gin.Context) {
	roomId := ctx.Param("id")
	if roomId == "" {
		ctx.JSON(400, gin.H{"error": "room id is required"})
		return
	}

	messages, err := server.store.GetAllMessageByRoomId(ctx, roomId)
	if err != nil {
		ctx.JSON(500, gin.H{"error": "failed to get messages"})
		return
	}
	ctx.JSON(200, gin.H{"success": true, "messages": messages})
}
