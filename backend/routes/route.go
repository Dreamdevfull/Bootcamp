package routes

import (
	"github.com/Dreamdevfull/Bootcamp/container"
	"github.com/Dreamdevfull/Bootcamp/middlewares"
	"github.com/gofiber/fiber/v3"
)

func SetupRoutes(app *fiber.App, c *container.Container) {

	app.Post("/register", c.AuthController.Register)
	app.Post("/login", c.AuthController.Login)

	//=========================================
	adminGroup := app.Group("/admin", middlewares.AuthMiddleware("admin"))
	// adminGroup.Get("/products", controllers.GetProducts(db))
	// adminGroup.Post("/products", controllers.AddProduct(db))
	// adminGroup.Patch("/products/:id", controllers.UpdateProduct(db))
	adminGroup.Get("/resellers", c.ResellerController.GetResellers)
	adminGroup.Patch("/resellers/:id", c.ResellerController.UpdateStatus)
	adminGroup.Get("/orders", c.OrderController.GetOrders)
	adminGroup.Patch("/orders/:id/complete", c.OrderController.QuickComplete)

	// resellerGroup := app.Group("/reseller", middlewares.AuthMiddleware("reseller"))

}
