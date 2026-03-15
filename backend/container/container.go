package container

import (
	"github.com/Dreamdevfull/Bootcamp/controllers"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
	"github.com/Dreamdevfull/Bootcamp/services"
	"gorm.io/gorm"
)

type Container struct {
	AuthController *controllers.AuthController
}

func NewContainer(db *gorm.DB) *Container {

	userRepo := repositorys.NewUserRepository(db)

	shopRepo := repositorys.NewShopRepository(db)

	authService := services.NewAuthService(userRepo, shopRepo)

	authController := controllers.NewAuthController(authService)

	return &Container{
		AuthController: authController,
	}
}
