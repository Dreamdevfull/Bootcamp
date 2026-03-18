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

	// 3. ดึงไฟล์รูปภาพ (Key ต้องตรงกับใน Postman เช่น "image")
	file, err := c.FormFile("image")
	if err != nil {
		// แทนที่ req.ImageURL == "" ด้วยการเช็คไฟล์
		return c.Status(400).JSON(fiber.Map{
			"message": "product image is required",
		})
	}

	// 4. อ่านไฟล์เป็น []byte เพื่อส่งให้ Service
	f, _ := file.Open()
	defer f.Close()
	imageBytes := make([]byte, file.Size)
	f.Read(imageBytes)

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

	result, err := p.service.CreateProduct(req, imageBytes)
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
func (p *ProductsController) Restore(ctx fiber.Ctx) error {
	id, _ := strconv.Atoi(ctx.Params("id"))

	if err := p.service.RestoreProduct(uint(id)); err != nil {
		return ctx.Status(400).JSON(fiber.Map{"error": "cant restore product"})
	}

	return ctx.JSON(fiber.Map{"message": "restore product successfully"})
}
func (p *ProductsController) EmptyGarbage(c fiber.Ctx) error {
	if err := p.service.EmptyGarbage(); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "cant empty garbage"})
	}
	return c.JSON(fiber.Map{"message": "empty garbage successfully"})
}
