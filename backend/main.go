package main

import (
	"github.com/Dreamdevfull/Bootcamp/config"
	"github.com/Dreamdevfull/Bootcamp/container"
	"github.com/Dreamdevfull/Bootcamp/routes"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/static"
)

func main() {
	app := fiber.New()
	config.DatabaseConnected()
	// config.AutoMigrate(config.DB)
	app.Get("/uploads/*", static.New("./public/uploads"))
	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://cpebc1.duckdns.org"},
		AllowMethods:     []string{"GET,POST,PUT,DELETE,PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Origin,Content-Type,Accept,Authorization,X-Requested-With"},
		AllowCredentials: true,
	}))

	container := container.NewContainer(config.DB)
	routes.SetupRoutes(app, container)

	app.Listen(":8080")
}
