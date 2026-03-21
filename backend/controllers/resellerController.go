package controllers

import (
	"fmt"
	"strconv"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/services"
	"github.com/gofiber/fiber/v3"
)

type ResellerController struct {
	services services.ResellerService
}

func NewResellerController(s services.ResellerService) *ResellerController {
	return &ResellerController{services: s}
}

func (ctrl *ResellerController) GetCatalog(c fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)
	products, err := ctrl.services.GetCatalog(userID)
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
	userID := c.Locals("user_id").(uint)
	var req dto.AddProductToShopRequest

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "invalid request",
		})
	}

	if err := ctrl.services.AddProductToShop(userID, req); err != nil {
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
	fmt.Println("UserID:", userID)
	data, err := ctrl.services.GetMyShopProducts(userID)
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
	if err := ctrl.services.UpdateProductPrice(userID, req.ID, req.SellingPrice); err != nil {
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

func (p *ResellerController) GetOrdersForReseller(c fiber.Ctx) error {

	resellerID := c.Locals("user_id").(uint)

	result, err := p.services.GetOrdersForReseller(resellerID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "ไม่สามารถดึงข้อมูลออเดอร์ได้"})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    result,
	})
}

// func (ctrl *ResellerController) GetWallet(c fiber.Ctx) error {
// 	userID, ok := c.Locals("user_id").(uint)
// 	if !ok {
// 		return c.Status(401).JSON(fiber.Map{
// 			"message": "Unauthorized",
// 		})
// 	}

// 	wallet, err := ctrl.services.GetWalletByUserID(userID)
// 	if err != nil {
// 		return c.Status(404).JSON(fiber.Map{
// 			"status":  "error",
// 			"message": "ไม่พบข้อมูลกระเป๋าเงิน",
// 		})
// 	}

// 	var receivedAmount float64 = 0
// 	var pendingAmount float64 = 0
// 	var historyData []fiber.Map

// 	for _, log := range wallet.WalletLogs {
// 		if log.Order.Status == "completed" {
// 			receivedAmount += log.Amount
// 		} else {
// 			pendingAmount += log.Amount
// 		}

// 		historyData = append(historyData, fiber.Map{
// 			"id":           log.Id,
// 			"order_id":     log.Order_id,
// 			"order_number": log.Order.Order_number,
// 			"amount":       log.Amount,
// 			"description":  "กำไรจากออเดอร์ " + log.Order.Order_number,
// 			"created_at":   log.Created_at,
// 		})
// 	}

// 	return c.Status(200).JSON(fiber.Map{
// 		"status": "success",
// 		"data": fiber.Map{
// 			"total_profit":    wallet.Balance,
// 			"received_amount": receivedAmount,
// 			"pending_amount":  pendingAmount,
// 			"history":         historyData,
// 		},
// 	})
// }
