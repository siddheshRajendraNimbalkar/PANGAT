// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: message.sql

package db

import (
	"context"
	"database/sql"
	"time"
)

const createMessage = `-- name: CreateMessage :one
INSERT INTO "message" ("content","roomId", "fileUrl", "memberId", "channelId", "deleted", "deletedAt", "createdAt", "updatedAt")
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING id, "roomId", content, "fileUrl", "memberId", "channelId", deleted, "deletedAt", "createdAt", "updatedAt"
`

type CreateMessageParams struct {
	Content   string         `db:"content"`
	RoomId    int64          `db:"roomId"`
	FileUrl   sql.NullString `db:"fileUrl"`
	MemberId  string         `db:"memberId"`
	ChannelId string         `db:"channelId"`
	Deleted   sql.NullBool   `db:"deleted"`
	DeletedAt sql.NullTime   `db:"deletedAt"`
	CreatedAt time.Time      `db:"createdAt"`
	UpdatedAt sql.NullTime   `db:"updatedAt"`
}

func (q *Queries) CreateMessage(ctx context.Context, arg CreateMessageParams) (Message, error) {
	row := q.db.QueryRowContext(ctx, createMessage,
		arg.Content,
		arg.RoomId,
		arg.FileUrl,
		arg.MemberId,
		arg.ChannelId,
		arg.Deleted,
		arg.DeletedAt,
		arg.CreatedAt,
		arg.UpdatedAt,
	)
	var i Message
	err := row.Scan(
		&i.ID,
		&i.RoomId,
		&i.Content,
		&i.FileUrl,
		&i.MemberId,
		&i.ChannelId,
		&i.Deleted,
		&i.DeletedAt,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteMessage = `-- name: DeleteMessage :exec
UPDATE "message"
SET "deleted" = true, "deletedAt" = now()
WHERE "id" = $1
`

func (q *Queries) DeleteMessage(ctx context.Context, id int64) error {
	_, err := q.db.ExecContext(ctx, deleteMessage, id)
	return err
}

const getAllMessageByRoomId = `-- name: GetAllMessageByRoomId :many
SELECT id, "roomId", content, "fileUrl", "memberId", "channelId", deleted, "deletedAt", "createdAt", "updatedAt" FROM "message"
WHERE "roomId" = $1
ORDER BY "createdAt" ASC
`

func (q *Queries) GetAllMessageByRoomId(ctx context.Context, roomid int64) ([]Message, error) {
	rows, err := q.db.QueryContext(ctx, getAllMessageByRoomId, roomid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Message{}
	for rows.Next() {
		var i Message
		if err := rows.Scan(
			&i.ID,
			&i.RoomId,
			&i.Content,
			&i.FileUrl,
			&i.MemberId,
			&i.ChannelId,
			&i.Deleted,
			&i.DeletedAt,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getMessageById = `-- name: GetMessageById :one
SELECT id, "roomId", content, "fileUrl", "memberId", "channelId", deleted, "deletedAt", "createdAt", "updatedAt" FROM "message"
WHERE "id" = $1
`

func (q *Queries) GetMessageById(ctx context.Context, id int64) (Message, error) {
	row := q.db.QueryRowContext(ctx, getMessageById, id)
	var i Message
	err := row.Scan(
		&i.ID,
		&i.RoomId,
		&i.Content,
		&i.FileUrl,
		&i.MemberId,
		&i.ChannelId,
		&i.Deleted,
		&i.DeletedAt,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getMessagesByChannelId = `-- name: GetMessagesByChannelId :many
SELECT id, "roomId", content, "fileUrl", "memberId", "channelId", deleted, "deletedAt", "createdAt", "updatedAt" FROM "message"
WHERE "channelId" = $1
`

func (q *Queries) GetMessagesByChannelId(ctx context.Context, channelid string) ([]Message, error) {
	rows, err := q.db.QueryContext(ctx, getMessagesByChannelId, channelid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Message{}
	for rows.Next() {
		var i Message
		if err := rows.Scan(
			&i.ID,
			&i.RoomId,
			&i.Content,
			&i.FileUrl,
			&i.MemberId,
			&i.ChannelId,
			&i.Deleted,
			&i.DeletedAt,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getMessagesByMemberId = `-- name: GetMessagesByMemberId :many
SELECT id, "roomId", content, "fileUrl", "memberId", "channelId", deleted, "deletedAt", "createdAt", "updatedAt" FROM "message"
WHERE "memberId" = $1
`

func (q *Queries) GetMessagesByMemberId(ctx context.Context, memberid string) ([]Message, error) {
	rows, err := q.db.QueryContext(ctx, getMessagesByMemberId, memberid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Message{}
	for rows.Next() {
		var i Message
		if err := rows.Scan(
			&i.ID,
			&i.RoomId,
			&i.Content,
			&i.FileUrl,
			&i.MemberId,
			&i.ChannelId,
			&i.Deleted,
			&i.DeletedAt,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateMessage = `-- name: UpdateMessage :exec
UPDATE "message"
SET "content" = $1, "updatedAt" = now()
WHERE "id" = $2
`

type UpdateMessageParams struct {
	Content string `db:"content"`
	ID      int64  `db:"id"`
}

func (q *Queries) UpdateMessage(ctx context.Context, arg UpdateMessageParams) error {
	_, err := q.db.ExecContext(ctx, updateMessage, arg.Content, arg.ID)
	return err
}
