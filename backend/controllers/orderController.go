package controllers

import (
	"strconv"

	"github.com/Dreamdevfull/Bootcamp/dto"
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

// controllers/order_controller.go

func (oc *OrderController) AddToCart(c fiber.Ctx) error {
	slug := c.Params("slug")
	var req dto.CartItem

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "ข้อมูลไม่ถูกต้อง"})
	}

	item, err := oc.service.AddItemToCart(slug, req)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	// ส่งข้อมูลสินค้าที่เตรียมไว้กลับไปให้ลูกค้า (เพื่อไปแสดงในหน้าตะกร้า)
	return c.JSON(fiber.Map{
		"message": "เพิ่มสินค้าลงตะกร้าแล้ว",
		"item":    item,
	})
}
