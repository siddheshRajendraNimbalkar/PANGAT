-- name: CreateGroupMessage :one
INSERT INTO "groupMessage" ("content", "fileUrl", "memberId", "memberImage", "channelId", "groupId")
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: GetGroupMessagesByGroupId :many
SELECT * FROM "groupMessage"
WHERE "groupId" = $1;
