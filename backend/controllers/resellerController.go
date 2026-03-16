package controllers

// import (
// 	"github.com/Dreamdevfull/Bootcamp/services"
// 	"github.com/gofiber/fiber/v3"
// )

// type ResellerController struct {
// 	service services.ResellerService
// }

// func NewResellerController(s services.ResellerService) *ResellerController {
// 	return &ResellerController{service: s}
// }

// func (ctrl *ResellerController) GetResellers(c fiber.Ctx) error {
// 	resellers, err := ctrl.service.GetResellers()

// 	if err != nil {
// 		return c.Status(500).JSON(fiber.Map{
// 			"error": "Could not fetch resellers data",
// 		})
// 	}

// 	return c.Status(200).JSON(fiber.Map{
// 		"total": len(resellers),
// 		"data":  resellers,
// 	})
// }

// func (ctrl *ResellerController) UpdateStatus(c fiber.Ctx) error {
// 	id := c.Params("id")

// 	type UpdateStatusRequest struct {
// 		Status string `json:"status"`
// 	}

// 	var input UpdateStatusRequest
// 	if err := c.Bind().Body(&input); err != nil {
// 		return c.Status(400).JSON(fiber.Map{"message": "invalid request body"})
// 	}

// 	err := ctrl.service.UpdateResellerStatus(id, input.Status)
// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{"message": err.Error()})
// 	}

// 	return c.Status(200).JSON(fiber.Map{
// 		"status":  "success",
// 		"message": "Reseller ID: " + id + " has been updated to " + input.Status,
// 	})
// }
