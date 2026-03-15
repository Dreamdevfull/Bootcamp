package controllers

import (
	"strconv"

	"github.com/Dreamdevfull/Bootcamp/services"
	"github.com/gofiber/fiber/v3"
)

type OrderController struct {
	service services.OrderService
}

func NewOrderController(service services.OrderService) *OrderController {
	return &OrderController{service: service}
}

func (ctrl *OrderController) GetOrders(c fiber.Ctx) error {
	orders, err := ctrl.service.GetOrders()

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "can not get orders",
		})
	}

	return c.JSON(fiber.Map{
		"status": "success",
		"data":   orders,
	})
}

func (ctrl *OrderController) QuickComplete(c fiber.Ctx) error {
	idStr := c.Params("id")

	idInt, err := strconv.Atoi(idStr)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "ID format is invalid"})
	}

	if err := ctrl.service.QuickComplete(idInt); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "can not complete order",
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "order " + idStr + " completed",
	})
}
