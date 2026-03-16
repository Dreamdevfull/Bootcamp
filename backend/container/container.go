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
}

func NewContainer(db *gorm.DB) *Container {

	userRepo := repositorys.NewUserRepository(db)

	shopRepo := repositorys.NewShopRepository(db)

	authService := services.NewAuthService(userRepo, shopRepo)

	authController := controllers.NewAuthController(authService)

	orderRepo := repositorys.NewOrderRepository(db)
	walletRepo := repositorys.NewWalletRepository(db)
	orderService := services.NewOrderService(orderRepo, walletRepo)
	orderController := controllers.NewOrderController(orderService)

	resellerRepo := repositorys.NewResellerRepository(db)
	resellerService := services.NewResellerService(resellerRepo)
	resellerController := controllers.NewResellerController(resellerService)

	return &Container{
		AuthController:     authController,
		OrderController:    orderController,
		ResellerController: resellerController,
	}
}
