package main

import (
	"github.com/Dreamdevfull/Bootcamp/config"
	"github.com/Dreamdevfull/Bootcamp/container"
	"github.com/Dreamdevfull/Bootcamp/routes"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v3"
)

func main() {
	app := fiber.New()
	config.DatabaseConnected()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET,POST,PUT,DELETE",
		AllowHeaders:     "Origin,Content-Type,Accept,Authorization",
		AllowCredentials: true,
	}))

	container := container.NewContainer(config.DB)
	routes.SetupRoutes(app, container)

	app.Listen(":8080")
}
