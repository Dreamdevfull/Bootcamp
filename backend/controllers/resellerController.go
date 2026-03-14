package controllers

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func GetResellers(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {

		var resellers []models.Users

		result := db.Select("id", "name", "email", "phone", "status", "address", "created_at").
			Where("role = ?", "reseller").
			Find(&resellers)

		if result.Error != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Could not fetch resellers data",
			})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"total": len(resellers),
			"data":  resellers,
		})
	}
}
