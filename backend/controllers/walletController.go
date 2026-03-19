package controllers

import (
	"github.com/Dreamdevfull/Bootcamp/services"
	"github.com/gofiber/fiber/v3"
)

type WalletController struct {
	services services.WalletService
}

func NewWalletController(s services.WalletService) *WalletController {
	return &WalletController{services: s}
}

func (ctrl *WalletController) GetWallet(c fiber.Ctx) error {
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

	var receivedAmount float64 = 0
	var pendingAmount float64 = 0
	var historyData []fiber.Map

	for _, log := range wallet.WalletLogs {
		if log.Order.Status == "completed" {
			receivedAmount += log.Amount
		} else {
			pendingAmount += log.Amount
		}

		historyData = append(historyData, fiber.Map{
			"id":           log.Id,
			"order_id":     log.Order_id,
			"order_number": log.Order.Order_number,
			"amount":       log.Amount,
			"description":  "กำไรจากออเดอร์ " + log.Order.Order_number,
			"created_at":   log.Created_at,
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"status": "success",
		"data": fiber.Map{
			"total_profit":    wallet.Balance,
			"received_amount": receivedAmount,
			"pending_amount":  pendingAmount,
			"history":         historyData,
		},
	})
}
