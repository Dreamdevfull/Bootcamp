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
	adminGroup.Get("/status", c.UserController.GetMyStatus)
	adminGroup.Get("/products", c.ProductsController.GetProducts)
	adminGroup.Post("/products/add", c.ProductsController.CreatedProduct)
	adminGroup.Patch("/products/edit/:id", c.ProductsController.UpdateProduct)
	//=================
	adminGroup.Delete("/products/delete/:id", c.ProductsController.DeleteProduct)
	adminGroup.Post("/products/:id/restore", c.ProductsController.Restore)
	adminGroup.Post("/products/empty-garbage", c.ProductsController.EmptyGarbage)
	adminGroup.Get("/resellers", c.UserController.GetResellers)

	//==========================================
	// adminGroup.Patch("/resellers/:id", controllers.UpdateResellerStatus(db))
	adminGroup.Patch("/resellers/:id", c.UserController.UpdateStatus)
	adminGroup.Get("/orders", c.OrderController.GetOrders)
	adminGroup.Patch("/orders/:id/complete", c.OrderController.QuickComplete)

	// --------------------------------------------------
	resellerGroup := app.Group("/reseller", middlewares.AuthMiddleware("reseller"))
	resellerGroup.Get("/catalog", c.ResellerController.GetCatalog)
	resellerGroup.Get("/status", c.UserController.GetMyStatus)
	resellerGroup.Post("/catalog/add", c.ResellerController.AddProductToShop)
	resellerGroup.Get("/my-products", c.ResellerController.GetMyShopProducts)
	resellerGroup.Patch("/my-products/update-price", c.ResellerController.UpdateProductPrice)
	resellerGroup.Delete("/my-shop/products/:id", c.ResellerController.RemoveProductFromShop)
	resellerGroup.Get("/orders", c.ResellerController.GetOrdersForReseller)
	resellerGroup.Get("/wallet", c.WalletController.GetWallet)
	resellerGroup.Get("/orders/:id", c.ResellerController.GetOrderDetail)
	resellerGroup.Get("/dashboard", c.OrderController.GetDashboardStats)
	// resellerGroup.Get("/shop", c.ShopController.MyShop)

	app.Get("/shop/:shop_slug", c.ShopController.GetShopFront)
	app.Post("/shop/:shop_slug/checkout", c.OrderController.Checkout)
	app.Post("/shop/:shop_slug/payment/:order_id", c.OrderController.SimulatePayment)
	app.Get("/track-order", c.OrderController.TrackOrder)
	app.Get("/shops", c.ShopController.GetShopsList)
	// app.Post("/shop/:sh")

	app.Get("/test/:name", func(c fiber.Ctx) error {
		return c.SendString("Value is: " + c.Params("name"))
	})
}
