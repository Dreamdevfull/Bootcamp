package controllers

import (
	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/services"
	"github.com/gofiber/fiber/v3"
)

type ShopController struct {
	service *services.ShopService
}

func NewShopController(service *services.ShopService) *ShopController {
	return &ShopController{service}
}

func (c *ShopController) GetShop(ctx fiber.Ctx) error {

	slug := ctx.Params("shop_slug")

	products, shopName, err := c.service.GetShop(slug)

	if err != nil {
		return ctx.Status(404).JSON(fiber.Map{
			"error": "shop not found",
		})
	}

	var result []dto.ShopProductResponse

	for _, p := range products {

		result = append(result, dto.ShopProductResponse{
			ProductID:   p.Id,
			Name:        p.Name,
			Description: p.Description,
			Image:       p.Image,
			Price:       p.Min_price,
			Stock:       p.Stock,
		})
	}

	return ctx.JSON(dto.ShopResponse{
		ShopName: shopName,
		Products: result,
	})
}

func (c *ShopController) MyShop(ctx fiber.Ctx) error {

	userID := ctx.Locals("user_id")

	shopName, shopURL, err := c.service.GetMyShop(userID)

	if err != nil {
		return ctx.Status(404).JSON(fiber.Map{
			"error": "shop not found",
		})
	}

	return ctx.JSON(fiber.Map{
		"shop_name": shopName,
		"shop_url":  shopURL,
	})
}
