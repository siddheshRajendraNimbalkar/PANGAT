// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: conversation.sql

package db

import (
	"context"
	"database/sql"
)

const createConversation = `-- name: CreateConversation :one
INSERT INTO "conversation" ("memberIdOne", "memberNameOne", "memberIdTwo", "memberNameTwo", "createdAt")
VALUES ($1, $2, $3, $4, $5)
RETURNING id, "memberIdOne", "memberNameOne", "memberIdTwo", "memberNameTwo", "createdAt"
`

type CreateConversationParams struct {
	MemberIdOne   int64        `db:"memberIdOne"`
	MemberNameOne string       `db:"memberNameOne"`
	MemberIdTwo   int64        `db:"memberIdTwo"`
	MemberNameTwo string       `db:"memberNameTwo"`
	CreatedAt     sql.NullTime `db:"createdAt"`
}

func (q *Queries) CreateConversation(ctx context.Context, arg CreateConversationParams) (Conversation, error) {
	row := q.db.QueryRowContext(ctx, createConversation,
		arg.MemberIdOne,
		arg.MemberNameOne,
		arg.MemberIdTwo,
		arg.MemberNameTwo,
		arg.CreatedAt,
	)
	var i Conversation
	err := row.Scan(
		&i.ID,
		&i.MemberIdOne,
		&i.MemberNameOne,
		&i.MemberIdTwo,
		&i.MemberNameTwo,
		&i.CreatedAt,
	)
	return i, err
}

const getConversationByMembers = `-- name: GetConversationByMembers :one
SELECT id, "memberIdOne", "memberNameOne", "memberIdTwo", "memberNameTwo", "createdAt" FROM "conversation"
WHERE ("memberIdOne" = $1 AND "memberIdTwo" = $2)
   OR ("memberIdOne" = $2 AND "memberIdTwo" = $1)
`

type GetConversationByMembersParams struct {
	MemberIdOne int64 `db:"memberIdOne"`
	MemberIdTwo int64 `db:"memberIdTwo"`
}

func (q *Queries) GetConversationByMembers(ctx context.Context, arg GetConversationByMembersParams) (Conversation, error) {
	row := q.db.QueryRowContext(ctx, getConversationByMembers, arg.MemberIdOne, arg.MemberIdTwo)
	var i Conversation
	err := row.Scan(
		&i.ID,
		&i.MemberIdOne,
		&i.MemberNameOne,
		&i.MemberIdTwo,
		&i.MemberNameTwo,
		&i.CreatedAt,
	)
	return i, err
}

const getConversationsByMemberId = `-- name: GetConversationsByMemberId :many
SELECT id, "memberIdOne", "memberNameOne", "memberIdTwo", "memberNameTwo", "createdAt" FROM "conversation"
WHERE "memberIdOne" = $1 OR "memberIdTwo" = $1
`

func (q *Queries) GetConversationsByMemberId(ctx context.Context, memberidone int64) ([]Conversation, error) {
	rows, err := q.db.QueryContext(ctx, getConversationsByMemberId, memberidone)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Conversation{}
	for rows.Next() {
		var i Conversation
		if err := rows.Scan(
			&i.ID,
			&i.MemberIdOne,
			&i.MemberNameOne,
			&i.MemberIdTwo,
			&i.MemberNameTwo,
			&i.CreatedAt,
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