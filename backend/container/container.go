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
	UserController     *controllers.UserController
	ShopController     *controllers.ShopController
}

func NewContainer(db *gorm.DB) *Container {

	userRepo := repositorys.NewUserRepository(db)

	productRepo := repositorys.NewProductRepository(db)
	productService := services.NewProductService(productRepo)
	productsController := controllers.NewProductsController(productService)

	shopRepo := repositorys.NewShopRepository(db)
	shopService := services.NewShopService(shopRepo, productRepo)
	shopsController := controllers.NewShopController(shopService)

	authService := services.NewAuthService(userRepo, shopRepo)
	authController := controllers.NewAuthController(authService)
	//=========================================================

	orderRepo := repositorys.NewOrderRepository(db)
	walletRepo := repositorys.NewWalletRepository(db)
	orderService := services.NewOrderService(orderRepo, walletRepo)
	orderController := controllers.NewOrderController(orderService)

	resellerRepo := repositorys.NewResellerRepository(db)
	resellerService := services.NewResellerService(resellerRepo)
	resellerController := controllers.NewResellerController(resellerService)

	userService := services.NewUserService(userRepo)
	userController := controllers.NewUserController(userService)

	return &Container{
		AuthController:     authController,
		OrderController:    orderController,
		ResellerController: resellerController,
		ProductsController: productsController,
		UserController:     userController,
		ShopController:     shopsController,
	}
}
