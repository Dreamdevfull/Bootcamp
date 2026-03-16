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
	app.Get("/api/auth/me", middlewares.AuthMiddleware(""), c.AuthController.Me)

	adminGroup := app.Group("/admin", middlewares.AuthMiddleware("admin"))
	adminGroup.Get("/products", c.ProductsController.GetProducts)
	adminGroup.Post("/products/add", c.ProductsController.CreatedProduct)
	adminGroup.Patch("/products/edit/:id", c.ProductsController.UpdateProduct)
	adminGroup.Delete("/products/delete/:id", c.ProductsController.DeleteProduct)
	adminGroup.Get("/resellers", c.UserController.GetResellers)

	//==========================================
	// adminGroup.Patch("/resellers/:id", controllers.UpdateResellerStatus(db))
	adminGroup.Patch("/resellers/:id", c.UserController.UpdateStatus)
	adminGroup.Get("/orders", c.OrderController.GetOrders)
	adminGroup.Patch("/orders/:id/complete", c.OrderController.QuickComplete)

	// --------------------------------------------------
	resellerGroup := app.Group("/reseller", middlewares.AuthMiddleware("reseller"))
	resellerGroup.Get("/catalog", c.ResellerController.GetCatalog)
	resellerGroup.Post("/catalog/add", c.ResellerController.AddProductToShop)

	resellerGroup.Get("/shop", c.ShopController.MyShop)

	app.Get("/shop/:shop_slug", c.ShopController.GetShop)
}
