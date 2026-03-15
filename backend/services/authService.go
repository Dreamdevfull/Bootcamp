package services

import (
	"errors"
	"os"
	"strings"
	"time"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepo repositorys.UserRepository
	shopRepo repositorys.ShopRepository
}

func NewAuthService(userRepo repositorys.UserRepository, shopRepo repositorys.ShopRepository) *AuthService {
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

func (s *AuthService) Login(input dto.LoginRequest) (*dto.LoginResponse, error) {

	user, err := s.userRepo.FindByEmail(input.Email)

	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(input.Password),
	)

	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	if user.Role == "reseller" {

		if user.Status == "pending" {
			return nil, errors.New("your account is pending approval")
		}

		if user.Status == "rejected" {
			return nil, errors.New("your registration has been rejected")
		}
	}

	claims := jwt.MapClaims{
		"user_id": user.Id,
		"role":    user.Role,
		"status":  user.Status,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		return nil, err
	}

	return &dto.LoginResponse{
		Message: "Login successful",
		Token:   t,
		User: dto.UserSummary{
			ID:   user.Id,
			Name: user.Name,
			Role: user.Role,
		},
	}, nil
}

func (s *AuthService) Logout() (*dto.LogoutResponse, error) {

	return &dto.LogoutResponse{
		Status:  "success",
		Message: "Logged out successfully",
	}, nil
}
