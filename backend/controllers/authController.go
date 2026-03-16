package controllers

import (
	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/services"

	"github.com/gofiber/fiber/v3"
)

type AuthController struct {
	service *services.AuthService
}

func NewAuthController(service *services.AuthService) *AuthController {
	return &AuthController{service}
}

func (a *AuthController) Register(c fiber.Ctx) error {

	var req dto.RegisterRequest

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "invalid request",
		})
	}

	err := a.service.Register(req)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(201).JSON(dto.RegisterResponse{
		Message: "User registered successfully",
	})
}

func (a *AuthController) Logout(c fiber.Ctx) error {

	c.ClearCookie("jwt")

	result, err := a.service.Logout()

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(result)
}

// func Login(db *gorm.DB) fiber.Handler {
// 	return func(c fiber.Ctx) error {

// 		type LoginRequest struct {
// 			Email    string `json:"email"`
// 			Password string `json:"password"`
// 		}
// 		var input LoginRequest
// 		if err := c.Bind().Body(&input); err != nil {
// 			return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
// 		}

// 		var user models.Users
// 		if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
// 			return c.Status(401).JSON(fiber.Map{"error": "Invalid email or password"})
// 		}

// 		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
// 			return c.Status(401).JSON(fiber.Map{"error": "Invalid email or password"})
// 		}

// 		if user.Role == "reseller" {
// 			if user.Status == "pending" {
// 				return c.Status(403).JSON(fiber.Map{"message": "Your account is pending approval. Please wait for an administrator."})
// 			}
// 			if user.Status == "rejected" {
// 				return c.Status(403).JSON(fiber.Map{"message": "Your registration has been rejected."})
// 			}
// 		}

// 		claims := jwt.MapClaims{
// 			"user_id": user.Id,
// 			"role":    user.Role,
// 			"status":  user.Status,
// 			"exp":     time.Now().Add(time.Hour * 24).Unix(),
// 		}

// 		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 		t, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
// 		if err != nil {
// 			return c.SendStatus(fiber.StatusInternalServerError)
// 		}

// 		return c.Status(200).JSON(fiber.Map{
// 			"message": "Login successful",
// 			"token":   t,
// 			"user": fiber.Map{
// 				"id":   user.Id,
// 				"name": user.Name,
// 				"role": user.Role,
// 			},
// 		})
// 	}
// }

func (a *AuthController) Login(c fiber.Ctx) error {

	var req dto.LoginRequest

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	result, err := a.service.Login(req)

	if err != nil {

		return c.Status(401).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    result.Token,
		HTTPOnly: true,
		Secure:   false, // true ถ้าใช้ https
		SameSite: "Lax",
		MaxAge:   86400,
	})

	return c.Status(200).JSON(result)
}
