package controllers

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func GetProducts(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		var products []models.Products

		result := db.Order("id desc").Find(&products)

		if result.Error != nil {
			return c.Status(500).JSON(fiber.Map{
				"status":  "error",
				"message": "can not get products",
			})
		}

		return c.JSON(fiber.Map{
			"status": "success",
			"data":   products,
		})
	}
}

func UpdateProduct(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {

		id := c.Params("id")

		var product models.Products

		if err := db.First(&product, id).Error; err != nil {
			return c.Status(404).JSON(fiber.Map{
				"message": "product not found",
			})
		}

		if err := c.Bind().Body(&product); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "invalid request data",
			})
		}

		if err := db.Save(&product).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{
				"message": "failed to update product",
			})
		}

		return c.JSON(fiber.Map{
			"message": "product updated successfully",
			"data":    product,
		})
	}
}
