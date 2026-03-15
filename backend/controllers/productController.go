package controllers

import (
	"path/filepath"
	"strconv"
	"time"

	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func GetProducts(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		var products []models.Products

		result := db.Order("id desc").Find(&products)

		if result.Error != nil {
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
}

func (p *ProductController) CreatedProduct(c fiber.Ctx) error {

	name := c.FormValue("name")
	description := c.FormValue("description")
	costPriceStr := c.FormValue("cost_price")
	minPriceStr := c.FormValue("min_price")
	stockStr := c.FormValue("stock")

	if name == "" {
		return c.Status(400).JSON(fiber.Map{
			"message": "product name is required",
		})
	}

	costPrice, err := strconv.ParseFloat(costPriceStr, 64)
	if err != nil || costPrice <= 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "cost price must be greater than 0",
		})
	}

	minPrice, err := strconv.ParseFloat(minPriceStr, 64)
	if err != nil || minPrice < costPrice {
		return c.Status(400).JSON(fiber.Map{
			"message": "min price must be greater or equal to cost price",
		})
	}

	stock, err := strconv.Atoi(stockStr)
	if err != nil || stock < 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "stock must be >= 0",
		})
	}

	// upload image
	file, err := c.FormFile("image")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "product image is required",
		})
	}

	ext := filepath.Ext(file.Filename)

	if ext != ".jpg" && ext != ".png" && ext != ".jpeg" {
		return c.Status(400).JSON(fiber.Map{
			"message": "only jpg/png files allowed",
		})
	}

	if file.Size > 5*1024*1024 {
		return c.Status(400).JSON(fiber.Map{
			"message": "image size must be less than 5MB",
		})
	}

	imagePath := "uploads/" + uuid.New().String() + ext

	if err := c.SaveFile(file, imagePath); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "failed to upload image",
		})
	}

	product := models.Products{
		Name:        name,
		Description: description,
		Image_url:   imagePath,
		Cost_price:  costPrice,
		Min_price:   minPrice,
		Stock:       stock,
		Create_at:   time.Now(),
	}

	if err := p.service.CreatedProduct(&product); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "can not create product",
			"error":   err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"message": "create product successfully",
		"data":    product,
	})
}

func UpdateProduct(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {

		id := c.Params("id")

		var product models.Products

		if err := db.First(&product, id).Error; err != nil {
			return c.Status(404).JSON(fiber.Map{
				"message": "product not found",
			})
		}

		if err := c.Bind().Body(&product); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "invalid request data",
			})
		}

		if err := db.Save(&product).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{
				"message": "failed to update product",
			})
		}

		return c.JSON(fiber.Map{
			"message": "product updated successfully",
			"data":    product,
		})
	}
}
