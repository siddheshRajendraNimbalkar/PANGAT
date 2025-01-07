package api

import (
	"strconv"

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

	roomIdInt, err := strconv.ParseInt(roomId, 10, 64)
	if err != nil {
		ctx.JSON(400, gin.H{"error": "invalid room id"})
		return
	}

	messages, err := server.store.GetAllMessageByRoomId(ctx, roomIdInt)
	if err != nil {
		ctx.JSON(500, gin.H{"error": "failed to get messages"})
		return
	}
	ctx.JSON(200, gin.H{"success": true, "messages": messages})
}
