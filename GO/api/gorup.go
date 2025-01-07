package api

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	db "github.com/siddheshRajendraNimbalkar/PANGAT/GO/db/sqlc"
)

type Group struct {
	GroupId string `json:"groupId" binding:"required"`
	UserId  string `json:"userId" binding:"required"`
}

func (server *Server) createGroup(ctx *gin.Context) {
	var req Group
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	existingGroup, err := server.store.GetGroupByGroupId(ctx, req.GroupId)
	if err != nil && err != sql.ErrNoRows {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Database error: " + err.Error(),
		})
		return
	}

	if existingGroup.ID != 0 {
		ctx.JSON(http.StatusOK, gin.H{
			"success": true,
			"data":    existingGroup,
		})
		return
	}

	createArg := db.CreateGroupParams{
		GroupId: req.GroupId,
		UserId:  req.UserId,
	}

	group, err := server.store.CreateGroup(ctx, createArg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to create group: " + err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    group,
	})
}
