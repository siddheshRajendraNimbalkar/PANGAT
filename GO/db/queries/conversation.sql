-- name: CreateConversation :one
INSERT INTO "conversation" ("memberIdOne", "memberNameOne", "memberIdTwo", "memberNameTwo", "memberImageOne", "memberImageTwo", "createdAt")
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: GetConversationByMembers :one
SELECT * FROM "conversation"
WHERE ("memberIdOne" = $1 AND "memberIdTwo" = $2)
   OR ("memberIdOne" = $2 AND "memberIdTwo" = $1);

-- name: GetConversationsByMemberId :many
SELECT * FROM "conversation"
WHERE "memberIdOne" = $1 OR "memberIdTwo" = $1;

-- name: UpdateConversationMemberName :exec
UPDATE "conversation"
SET "memberNameOne" = $2, "memberNameTwo" = $3
WHERE "id" = $1;

-- name: UpdateConversationMemberImage :exec
UPDATE "conversation"
SET "memberImageOne" = $2, "memberImageTwo" = $3
WHERE "id" = $1;
