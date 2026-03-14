package main

import (
	"github.com/Dreamdevfull/Bootcamp/config"
	"github.com/gofiber/fiber/v3"
)

func main() {
	app := fiber.New()

	config.DatabaseConnected()

	app.Get("/", func(c fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{
			"message": "Hello, World!",
			"status":  "success",
			"data":    nil,
		})
	})

	app.Listen(":8080")
}
