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

func UpdateResellerStatus(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {

		id := c.Params("id")
		if id == "" {
			return c.Status(400).JSON(fiber.Map{
				"message": "reseller ID is required",
			})
		}

		type UpdateStatusRequest struct {
			Status string `json:"status"`
		}

		var input UpdateStatusRequest
		if err := c.Bind().Body(&input); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "invalid request body",
			})
		}

		validStatuses := map[string]bool{
			"pending":  true,
			"approved": true,
			"rejected": true,
		}
		if !validStatuses[input.Status] {
			return c.Status(400).JSON(fiber.Map{
				"message": "invalid status value",
			})
		}

		result := db.Model(&models.Users{}).Where("id = ? AND role = ?", id, "reseller").
			Update("status", input.Status)

		if result.Error != nil {
			return c.Status(500).JSON(fiber.Map{
				"message": "failed to update reseller status",
			})
		}

		if result.RowsAffected == 0 {
			return c.Status(404).JSON(fiber.Map{
				"message": "reseller not found",
			})

		}

		return c.Status(200).JSON(fiber.Map{
			"status":  "success",
			"message": "Reseller ID: " + id + " has been updated to " + input.Status + " successfully",
		})
	}
}
