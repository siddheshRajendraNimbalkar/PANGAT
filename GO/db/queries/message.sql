-- name: CreateMessage :one
INSERT INTO "message" ("content", "fileUrl", "memberId", "channelId", "deleted", "deletedAt", "createdAt", "updatedAt")
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;

-- name: GetMessagesByMemberId :many
SELECT * FROM "message"
WHERE "memberId" = $1;

-- name: GetMessagesByChannelId :many
SELECT * FROM "message"
WHERE "channelId" = $1;

-- name: DeleteMessage :exec
UPDATE "message"
SET "deleted" = true, "deletedAt" = now()
WHERE "id" = $1;

-- name: UpdateMessage :exec
UPDATE "message"
SET "content" = $1, "updatedAt" = now()
WHERE "id" = $2;

-- name: GetMessageById :one
SELECT * FROM "message"
WHERE "id" = $1;
