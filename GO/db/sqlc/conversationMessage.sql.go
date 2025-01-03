// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: conversationMessage.sql

package db

import (
	"context"
	"database/sql"
)

const createConversationMessage = `-- name: CreateConversationMessage :one
INSERT INTO "conversationMessage" ("conversationId", "content", "fileUrl", "deleted", "deletedAt", "createdAt", "updatedAt")
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING id, "conversationId", content, "fileUrl", deleted, "deletedAt", "createdAt", "updatedAt"
`

type CreateConversationMessageParams struct {
	ConversationId int64          `db:"conversationId"`
	Content        string         `db:"content"`
	FileUrl        sql.NullString `db:"fileUrl"`
	Deleted        sql.NullBool   `db:"deleted"`
	DeletedAt      sql.NullTime   `db:"deletedAt"`
	CreatedAt      sql.NullTime   `db:"createdAt"`
	UpdatedAt      sql.NullTime   `db:"updatedAt"`
}

func (q *Queries) CreateConversationMessage(ctx context.Context, arg CreateConversationMessageParams) (ConversationMessage, error) {
	row := q.db.QueryRowContext(ctx, createConversationMessage,
		arg.ConversationId,
		arg.Content,
		arg.FileUrl,
		arg.Deleted,
		arg.DeletedAt,
		arg.CreatedAt,
		arg.UpdatedAt,
	)
	var i ConversationMessage
	err := row.Scan(
		&i.ID,
		&i.ConversationId,
		&i.Content,
		&i.FileUrl,
		&i.Deleted,
		&i.DeletedAt,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteConversationMessage = `-- name: DeleteConversationMessage :exec
UPDATE "conversationMessage"
SET "deleted" = true, "deletedAt" = now()
WHERE "id" = $1
`

func (q *Queries) DeleteConversationMessage(ctx context.Context, id int64) error {
	_, err := q.db.ExecContext(ctx, deleteConversationMessage, id)
	return err
}

const getConversationMessageById = `-- name: GetConversationMessageById :one
SELECT id, "conversationId", content, "fileUrl", deleted, "deletedAt", "createdAt", "updatedAt" FROM "conversationMessage"
WHERE "id" = $1
`

func (q *Queries) GetConversationMessageById(ctx context.Context, id int64) (ConversationMessage, error) {
	row := q.db.QueryRowContext(ctx, getConversationMessageById, id)
	var i ConversationMessage
	err := row.Scan(
		&i.ID,
		&i.ConversationId,
		&i.Content,
		&i.FileUrl,
		&i.Deleted,
		&i.DeletedAt,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getMessagesByConversationId = `-- name: GetMessagesByConversationId :many
SELECT id, "conversationId", content, "fileUrl", deleted, "deletedAt", "createdAt", "updatedAt" FROM "conversationMessage"
WHERE "conversationId" = $1
`

func (q *Queries) GetMessagesByConversationId(ctx context.Context, conversationid int64) ([]ConversationMessage, error) {
	rows, err := q.db.QueryContext(ctx, getMessagesByConversationId, conversationid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []ConversationMessage{}
	for rows.Next() {
		var i ConversationMessage
		if err := rows.Scan(
			&i.ID,
			&i.ConversationId,
			&i.Content,
			&i.FileUrl,
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

const updateConversationMessage = `-- name: UpdateConversationMessage :exec
UPDATE "conversationMessage"
SET "content" = $1, "updatedAt" = now()
WHERE "id" = $2
`

type UpdateConversationMessageParams struct {
	Content string `db:"content"`
	ID      int64  `db:"id"`
}

func (q *Queries) UpdateConversationMessage(ctx context.Context, arg UpdateConversationMessageParams) error {
	_, err := q.db.ExecContext(ctx, updateConversationMessage, arg.Content, arg.ID)
	return err
}