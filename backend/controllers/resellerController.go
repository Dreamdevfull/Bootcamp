package controllers

import (
	"strconv"

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

func (ctrl *ResellerController) GetMyShopProducts(c fiber.Ctx) error {
	userID, ok := c.Locals("user_id").(uint)

	if !ok {
		return c.Status(401).JSON(fiber.Map{
			"status":  "error",
			"message": "Unaunthorized: Invalid user context",
		})
	}

	shopID := userID

	data, err := ctrl.services.GetMyShopProducts(shopID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Failed to retieve shop products",
			"error":   err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"status": "success",
		"total":  len(data),
		"data":   data,
	})

}

func (ctrl *ResellerController) UpdateProductPrice(c fiber.Ctx) error {
	var req dto.UpdatePriceRequest

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid request body",
		})

	}
	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid request body",
		})
	}

	userID, _ := c.Locals("user_id").(uint)
	if err := ctrl.services.UpdateProductPrice(userID, req.ID, req.ResellingPrice); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"status":  "success",
		"message": "Price updated successfully",
	})
}

func (ctrl *ResellerController) RemoveProductFromShop(c fiber.Ctx) error {
	productIDStr := c.Params("id")
	productID, err := strconv.Atoi(productIDStr)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid Product ID",
		})
	}

	userID, ok := c.Locals("user_id").(uint)
	if !ok {
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	if err := ctrl.services.RemoveProductFromShop(userID, uint(productID)); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
		})

	}

	return c.Status(200).JSON(fiber.Map{
		"status":  "success",
		"message": "Product removed from your shop scucessfully",
	})
}

func (ctrl *ResellerController) GetWallet(c fiber.Ctx) error {
	userID, ok := c.Locals("user_id").(uint)
	if !ok {
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	wallet, err := ctrl.services.GetWalletByUserID(userID)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"status":  "error",
			"message": "ไม่พบข้อมูลกระเป๋าเงิน",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"status": "success",
		"data": fiber.Map{
			"balance": wallet.Balance,
			"history": wallet.WalletLogs,
		},
	})
}
