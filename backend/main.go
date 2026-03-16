package main

import (
	"github.com/Dreamdevfull/Bootcamp/config"
	"github.com/Dreamdevfull/Bootcamp/container"
	"github.com/Dreamdevfull/Bootcamp/routes"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {
	app := fiber.New()
	config.DatabaseConnected()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:2000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	container := container.NewContainer(config.DB)
	routes.SetupRoutes(app, container)

	app.Listen(":8080")
}
