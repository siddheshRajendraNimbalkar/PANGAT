-- name: CreateConversationMessage :one
INSERT INTO "conversationMessage" ("conversationId", "content", "fileUrl", "deleted", "deletedAt", "createdAt", "updatedAt")
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: GetMessagesByConversationId :many
SELECT * FROM "conversationMessage"
WHERE "conversationId" = $1;

-- name: DeleteConversationMessage :exec
UPDATE "conversationMessage"
SET "deleted" = true, "deletedAt" = now()
WHERE "id" = $1;

-- name: UpdateConversationMessage :exec
UPDATE "conversationMessage"
SET "content" = $1, "updatedAt" = now()
WHERE "id" = $2;

-- name: GetConversationMessageById :one
SELECT * FROM "conversationMessage"
WHERE "id" = $1;
