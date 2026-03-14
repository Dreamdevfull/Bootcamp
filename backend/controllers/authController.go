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
			Name     string `json:"name"`
			Email    string `json:"email"`
			Phone    string `json:"phone"`
			Password string `json:"password"`
			ShopName string `json:"shop_name"`
			Address  string `json:"address"`
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
		if err := db.Where("shop_name = ?", input.ShopName).First(&existingShop).Error; err == nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Shop name already exists",
			})
		}

		shopSlug := strings.ToLower(strings.ReplaceAll(input.ShopName, " ", "-"))

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
				Shop_name: input.ShopName,
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

func Logout(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		c.ClearCookie("jwt")
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Logged out successfully",
		})

	}
}
