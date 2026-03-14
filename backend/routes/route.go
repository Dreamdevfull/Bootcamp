package routes

import (
	"github.com/Dreamdevfull/Bootcamp/controllers"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func SetupRoutes(app fiber.App, db *gorm.DB) {
	app.Post("/register", controllers.Register(db))
}
