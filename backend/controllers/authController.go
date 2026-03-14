package controllers

import (
	"strings"
	"time"

	"github.com/Dreamdevfull/Bootcamp/models"

	"github.com/gofiber/fiber/v3"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Register(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		type RegisterRequest struct {
			Name      string `json:"name"`
			Email     string `json:"email"`
			Phone     string `json:"phone"`
			Password  string `json:"password"`
			Shop_name string `json:"shop_name"`
			Address   string `json:"address"`
		}

		var input RegisterRequest
		if err := c.Bind().Body(&input); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid request body",
			})
		}

		var existingUser models.Users
		if err := db.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Email already exists",
			})
		}

		var existingShop models.Shops
		if err := db.Where("shop_name = ?", input.Shop_name).First(&existingShop).Error; err == nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Shop name already exists",
			})
		}

		shopSlug := strings.ToLower(strings.ReplaceAll(input.Shop_name, " ", "-"))

		err := db.Transaction(func(tx *gorm.DB) error {
			hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 10)

			newUser := models.Users{
				Name:      input.Name,
				Email:     input.Email,
				Phone:     input.Phone,
				Password:  string(hashedPassword),
				Role:      "reseller",
				Status:    "pending",
				Address:   input.Address,
				Create_at: time.Now(),
			}

			if err := tx.Create(&newUser).Error; err != nil {
				return err
			}

			newShop := models.Shops{
				User_id:   int(newUser.Id),
				Shop_name: input.Shop_name,
				Shop_slug: shopSlug,
			}
			if err := tx.Create(&newShop).Error; err != nil {
				return err
			}

			return nil
		})

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to register user",
			})
		}

		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"message": "User registered successfully, pending approval",
		})
	}
}

func Login(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		type LoginRequest struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		var input LoginRequest
		if err := c.Bind().Body(&input); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
		}
		var user models.Users
		if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid email or password"})
		}

		if user.Status != "pending" {
			return c.Status(403).JSON(fiber.Map{"message": "Your account is pending approval. Please wait for an administrator to review your registration."})
		}

		if user.Status == "rejected" {
			return c.Status(403).JSON(fiber.Map{"message": "Your registration has been rejected. Please contact support for more information."})
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid email or password"})
		}

		message := ""
		if user.Role == "admin" {
			message = "Welcome, admin!"
		} else {
			message = "Welcome, reseller!"
		}

		return c.Status(200).JSON(fiber.Map{
			"message": message,
			"user": fiber.Map{
				"id":    user.Id,
				"name":  user.Name,
				"email": user.Email,
				"role":  user.Role,
			},
		})
	}
}
