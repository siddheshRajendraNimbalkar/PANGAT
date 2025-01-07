-- name: CreateGroup :one
INSERT INTO "group" ("groupId","userId")
VALUES ($1,$2)
RETURNING *;

-- name: GetGroupById :one
SELECT * FROM "group"
WHERE "id" = $1;

-- name: GetGroupsByUserId :many
SELECT * FROM "group"
WHERE "userId" = $1;

-- name: GetGroupByGroupId :one
SELECT * FROM "group"
WHERE "groupId" = $1;