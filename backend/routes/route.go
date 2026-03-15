package routes

import (
	"github.com/Dreamdevfull/Bootcamp/container"
	"github.com/gofiber/fiber/v3"
)

func SetupRoutes(app *fiber.App, c *container.Container) {
	app.Post("/register", c.AuthController.Register)
	// app.Post("/login", controllers.Login(db))

	//=========================================
	// adminGroup := app.Group("/admin", middlewares.AuthMiddleware("admin"))
	// adminGroup.Get("/products", controllers.GetProducts(db))
	// adminGroup.Post("/products", controllers.AddProduct(db))
	// adminGroup.Patch("/products/:id", controllers.UpdateProduct(db))
	// adminGroup.Get("/resellers", controllers.GetResellers(db))
	// adminGroup.Patch("/resellers/:id", controllers.UpdateResellerStatus(db))
	// resellerGroup := app.Group("/reseller", middlewares.AuthMiddleware("reseller"))

}
