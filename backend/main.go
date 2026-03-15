package main

import (
	"github.com/Dreamdevfull/Bootcamp/config"
	"github.com/Dreamdevfull/Bootcamp/container"
	"github.com/Dreamdevfull/Bootcamp/routes"
	"github.com/gofiber/fiber/v3"
)

func main() {
	app := fiber.New()
	config.DatabaseConnected()

	container := container.NewContainer(config.DB)
	routes.SetupRoutes(app, container)

	app.Listen(":8080")
}
