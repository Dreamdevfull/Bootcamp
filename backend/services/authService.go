package services

import (
	"errors"
	"strings"
	"time"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepo repositorys.UserRepository
	shopRepo repositorys.ShopRepository
}

func NewAuthService(
	userRepo repositorys.UserRepository,
	shopRepo repositorys.ShopRepository,
) *AuthService {
	return &AuthService{userRepo, shopRepo}
}

func (s *AuthService) Register(input dto.RegisterRequest) error {

	existingUser, _ := s.userRepo.FindByEmail(input.Email)

	if existingUser != nil && existingUser.Id != 0 {
		return errors.New("email already exists")
	}

	existingShop, _ := s.shopRepo.FindByName(input.Shop_name)

	if existingShop != nil && existingShop.Id != 0 {
		return errors.New("shop name already exists")
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 10)

	user := models.Users{
		Name:      input.Name,
		Email:     input.Email,
		Phone:     input.Phone,
		Password:  string(hashedPassword),
		Role:      "reseller",
		Status:    "pending",
		Address:   input.Address,
		Create_at: time.Now(),
	}

	if err := s.userRepo.Create(&user); err != nil {
		return err
	}

	slug := strings.ToLower(strings.ReplaceAll(input.Shop_name, " ", "-"))

	shop := models.Shops{
		User_id:   int(user.Id),
		Shop_name: input.Shop_name,
		Shop_slug: slug,
	}

	if err := s.shopRepo.Create(&shop); err != nil {
		return err
	}

	return nil
}
