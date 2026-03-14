package controllers

import (
	"github.com/Dreamdevfull/Bootcamp/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Register(db *gorm.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		type RegisterRequest struct {
			Name     string `json:"name"`
			Email    string `json:"email"`
			Phone    string `json:"phone"`
			Password string `json:"password"`
			ShopName string `json:"shop_name"`
			Address  string `json:"address"`
		}

		var input RegisterRequest
		if err := c.BodyParser(&input); err != nil {
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

		return nil
	}
}
