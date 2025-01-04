package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	db "github.com/siddheshRajendraNimbalkar/PANGAT/GO/db/sqlc"
)

type createConversationRequest struct {
	MemberIdOne    string `json:"memberIdOne" binding:"required"`
	MemberIdTwo    string `json:"memberIdTwo" binding:"required"`
	MemberNameOne  string `json:"memberNameOne" binding:"required"`
	MemberNameTwo  string `json:"memberNameTwo" binding:"required"`
	MemberImageOne string `json:"memberImageOne" binding:"required"`
	MemberImageTwo string `json:"memberImageTwo" binding:"required"`
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

	arg := db.GetConversationByMembersParams{
		MemberIdOne: req.MemberIdOne,
		MemberIdTwo: req.MemberIdTwo,
	}

	conversation, _ := server.store.GetConversationByMembers(ctx, arg)

	if conversation.ID != 0 {
		if conversation.MemberNameOne != req.MemberNameOne || conversation.MemberNameTwo != req.MemberNameTwo {

			updateNameArg := db.UpdateConversationMemberNameParams{
				ID:            conversation.ID,
				MemberNameOne: req.MemberNameOne,
				MemberNameTwo: req.MemberNameTwo,
			}
			err := server.store.UpdateConversationMemberName(ctx, updateNameArg)

			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"success": false,
					"error":   err.Error(),
				})

				return
			}
		}

		if conversation.MemberImageOne != req.MemberImageOne || conversation.MemberImageTwo != req.MemberImageTwo {
			updateImageArg := db.UpdateConversationMemberImageParams{
				ID:             conversation.ID,
				MemberImageOne: req.MemberImageOne,
				MemberImageTwo: req.MemberImageTwo,
			}
			err := server.store.UpdateConversationMemberImage(ctx, updateImageArg)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"success": false,
					"error":   err.Error(),
				})
				return
			}
		}
		ctx.JSON(http.StatusOK, gin.H{
			"success": true,
			"data":    conversation,
		})

		return
	}

	createArg := db.CreateConversationParams{
		MemberIdOne:    req.MemberIdOne,
		MemberNameOne:  req.MemberNameOne,
		MemberIdTwo:    req.MemberIdTwo,
		MemberNameTwo:  req.MemberNameTwo,
		MemberImageOne: req.MemberImageOne,
		MemberImageTwo: req.MemberImageTwo,
	}

	newConversation, err := server.store.CreateConversation(ctx, createArg)
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
