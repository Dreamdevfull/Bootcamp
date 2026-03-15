package routes

import (
	"github.com/Dreamdevfull/Bootcamp/container"
	"github.com/Dreamdevfull/Bootcamp/middlewares"
	"github.com/gofiber/fiber/v3"
)

func SetupRoutes(app *fiber.App, c *container.Container) {

	app.Post("/register", c.AuthController.Register)
	app.Post("/login", c.AuthController.Login)
	app.Post("/logout", c.AuthController.Logout)
	//=========================================
	adminGroup := app.Group("/admin", middlewares.AuthMiddleware("admin"))
	adminGroup.Get("/products", c.ProductsController.GetProducts)
	adminGroup.Post("/products/add", c.ProductsController.CreatedProduct)
	adminGroup.Patch("/products/edit/:id", c.ProductsController.UpdateProduct)
	adminGroup.Delete("/products/delete/:id", c.ProductsController.DeleteProduct)
	adminGroup.Get("/resellers", c.ResellerController.GetResellers)

	//==========================================
	// adminGroup.Patch("/resellers/:id", controllers.UpdateResellerStatus(db))
	adminGroup.Get("/orders", c.OrderController.GetOrders)
	// resellerGroup := app.Group("/reseller", middlewares.AuthMiddleware("reseller"))

}
