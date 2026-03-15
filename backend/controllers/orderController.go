package controllers

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func GetOrders(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		var orders []models.Orders

		result := db.Preload("OrderItems").Find(&orders)

		if result.Error != nil {
			return c.Status(500).JSON(fiber.Map{
				"status":  "error",
				"message": "Failed to fetch orders",
			})
		}

		return c.JSON(fiber.Map{
			"status": "success",
			"data":   orders,
		})
	}
}
