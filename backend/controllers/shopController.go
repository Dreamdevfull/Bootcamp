package controllers

import (
	"github.com/Dreamdevfull/Bootcamp/services"
	"github.com/gofiber/fiber/v3"
)

type ShopController struct {
	svc services.ShopService
}

func NewShopController(svc services.ShopService) *ShopController {
	return &ShopController{svc}
}

func (c *ShopController) GetShopFront(ctx fiber.Ctx) error {
	slug := ctx.Params("shop_slug")

	// ตรวจสอบว่า slug ว่างหรือไม่
	if slug == "" {
		return ctx.Status(400).JSON(fiber.Map{"error": "Shop name is required"})
	}

	data, err := c.svc.GetShopFrontData(slug)
	if err != nil {

		if err.Error() == "record not found" {
			return ctx.Status(404).JSON(fiber.Map{"error": "Shop not found"})
		}
		return ctx.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return ctx.JSON(data)
}
