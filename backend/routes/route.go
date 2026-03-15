package routes

import (
	"github.com/Dreamdevfull/Bootcamp/controllers"
	"github.com/Dreamdevfull/Bootcamp/middlewares"
	"github.com/gofiber/fiber/v3"

	"gorm.io/gorm"
)

func SetupRoutes(app *fiber.App, db *gorm.DB) {
	app.Post("/register", controllers.Register(db))
	app.Post("/login", controllers.Login(db))

	//=========================================
	adminGroup := app.Group("/admin", middlewares.AuthMiddleware("admin"))
	adminGroup.Get("/products", controllers.GetProducts(db))
	adminGroup.Post("/products", controllers.AddProduct(db))
	adminGroup.Patch("/products/:id", controllers.UpdateProduct(db))
	adminGroup.Get("/resellers", controllers.GetResellers(db))
	adminGroup.Patch("/resellers/:id", controllers.UpdateResellerStatus(db))
	// resellerGroup := app.Group("/reseller", middlewares.AuthMiddleware("reseller"))

}
