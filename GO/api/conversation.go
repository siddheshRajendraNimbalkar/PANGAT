package api

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	db "github.com/siddheshRajendraNimbalkar/PANGAT/GO/db/sqlc"
)

type createConversationRequest struct {
	MemberIdOne   string `json:"memberIdOne" binding:"required"`
	MemberIdTwo   string `json:"memberIdTwo" binding:"required"`
	MemberNameOne string `json:"memberNameOne" binding:"required"`
	MemberNameTwo string `json:"memberNameTwo" binding:"required"`
}

func (server *Server) createConversation(ctx *gin.Context) {
	var req createConversationRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}
	fmt.Println("1-here")

	arg := db.GetConversationByMembersParams{
		MemberIdOne: req.MemberIdOne,
		MemberIdTwo: req.MemberIdTwo,
	}

	conversation, _ := server.store.GetConversationByMembers(ctx, arg)

	if conversation.ID != 0 {
		fmt.Println("4-here")
		if conversation.MemberNameOne != req.MemberNameOne || conversation.MemberNameTwo != req.MemberNameTwo {
			fmt.Println("5-here")
			updateNameArg := db.UpdateConversationMemberNameParams{
				ID:            conversation.ID,
				MemberNameOne: req.MemberNameOne,
				MemberNameTwo: req.MemberNameTwo,
			}
			fmt.Println("6-here")
			err := server.store.UpdateConversationMemberName(ctx, updateNameArg)
			fmt.Println("7-here")
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"success": false,
					"error":   err.Error(),
				})
				fmt.Println("8-here")
				return
			}
		}
		ctx.JSON(http.StatusOK, gin.H{
			"success": true,
			"data":    conversation,
		})
		fmt.Println("9-here")
		return
	}
	fmt.Println("10-here")

	createArg := db.CreateConversationParams{
		MemberIdOne:   req.MemberIdOne,
		MemberNameOne: req.MemberNameOne,
		MemberIdTwo:   req.MemberIdTwo,
		MemberNameTwo: req.MemberNameTwo,
	}

	newConversation, err := server.store.CreateConversation(ctx, createArg)
	fmt.Println("11-here")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    newConversation,
	})
}
