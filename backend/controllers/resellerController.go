package controllers

import (
	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/services"
	"github.com/gofiber/fiber/v3"
)

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

type ResellerController struct {
	services services.ResellerService
}

func NewResellerController(s services.ResellerService) *ResellerController {
	return &ResellerController{services: s}
}

func (ctrl *ResellerController) GetCatalog(c fiber.Ctx) error {
	products, err := ctrl.services.GetCatalog()
	if err != nil {

		return c.Status(500).JSON(fiber.Map{
			"error": "Could not fetch catalog data",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"total": len(products),
		"data":  products,
	})
}

func (ctrl *ResellerController) AddProductToShop(c fiber.Ctx) error {
	var req dto.AddProductToShopRequest

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "invalid request",
		})
	}

	if err := ctrl.services.AddProductToShop(req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"status":  "success",
		"message": "Product added to shop successfully",
	})
}
