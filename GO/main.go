package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
	"github.com/siddheshRajendraNimbalkar/PANGAT/GO/api"
	db "github.com/siddheshRajendraNimbalkar/PANGAT/GO/db/sqlc"
	"github.com/siddheshRajendraNimbalkar/PANGAT/GO/util"
)

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	if err := conn.Ping(); err != nil {
		log.Fatal("cannot ping db:", err)
	}

	store := db.New(conn)
	server := api.NewServer(store)

	fmt.Println("Server is running on port", config.Addr)

	if err = server.Start(config.Addr); err != nil {
		log.Fatal("cannot start server:", err)
	}

}
