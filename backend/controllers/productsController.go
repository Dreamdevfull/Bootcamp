package controllers

import (
	"strconv"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/services"
	"github.com/gofiber/fiber/v3"
)

type ProductsController struct {
	service *services.ProductService
}

func NewProductsController(service *services.ProductService) *ProductsController {
	return &ProductsController{service}
}

func (p *ProductsController) CreatedProduct(c fiber.Ctx) error {

	var req dto.AddProductRequest

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "invalid request",
		})
	}

	if req.Name == "" {
		return c.Status(400).JSON(fiber.Map{
			"message": "product name is required",
		})
	}

	if req.CostPrice <= 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "cost price must be greater than 0",
		})
	}

	if req.MinPrice < req.CostPrice {
		return c.Status(400).JSON(fiber.Map{
			"message": "min price must be >= cost price",
		})
	}

	if req.Stock < 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "stock must be >= 0",
		})
	}

	result, err := p.service.CreateProduct(req)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "can not create product",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"message": "create product successfully",
		"data":    result,
	})
}

func (p *ProductsController) GetProducts(c fiber.Ctx) error {

	products, err := p.service.GetProducts()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "can not get products",
		})
	}

	return c.JSON(fiber.Map{
		"status": "success",
		"data":   products,
	})
}

func (p *ProductsController) UpdateProduct(c fiber.Ctx) error {

	idParam := c.Params("id")

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "invalid product id",
		})
	}

	var req dto.UpdateProductRequest

	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	result, err := p.service.UpdateProduct(uint(id), req)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "product updated successfully",
		"data":    result,
	})
}

func (p *ProductsController) DeleteProduct(c fiber.Ctx) error {

	idParam := c.Params("id")

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "invalid product id",
		})
	}

	err = p.service.DeleteProduct(uint(id))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "product deleted successfully",
	})
}
