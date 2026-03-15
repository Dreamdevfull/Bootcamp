package container

import (
	"github.com/Dreamdevfull/Bootcamp/controllers"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
	"github.com/Dreamdevfull/Bootcamp/services"
	"gorm.io/gorm"
)

type Container struct {
	AuthController     *controllers.AuthController
	OrderController    *controllers.OrderController
	ResellerController *controllers.ResellerController
	ProductsController *controllers.ProductsController
}

func NewContainer(db *gorm.DB) *Container {

	userRepo := repositorys.NewUserRepository(db)

	shopRepo := repositorys.NewShopRepository(db)

	authService := services.NewAuthService(userRepo, shopRepo)

	authController := controllers.NewAuthController(authService)

	//=========================================================

	orderRepo := repositorys.NewOrderRepository(db)
	orderService := services.NewOrderService(orderRepo)
	orderController := controllers.NewOrderController(orderService)

	resellerRepo := repositorys.NewResellerRepository(db)
	resellerService := services.NewResellerService(resellerRepo)
	resellerController := controllers.NewResellerController(resellerService)

	productRepo := repositorys.NewProductRepository(db)

	productService := services.NewProductService(productRepo)

	productsController := controllers.NewProductsController(productService)

	return &Container{
		AuthController:     authController,
		OrderController:    orderController,
		ResellerController: resellerController,
		ProductsController: productsController,
	}
}
