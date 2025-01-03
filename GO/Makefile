.PHONY: postgres createdb dropdb migrateup migratedown

postgres:
	docker run --name Pangat -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -d postgres

createdb:
	docker exec -it Pangat createdb --username=root --owner=root sockets

dropdb:
	docker exec -it Pangat dropdb sockets

migrateup:
	migrate -path db/migrations -database "postgresql://root:password@localhost:5432/sockets?sslmode=disable" -verbose up

migratedown:
	migrate -path db/migrations -database "postgresql://root:password@localhost:5432/sockets?sslmode=disable" -verbose down

sqlc:
	sqlc generate
