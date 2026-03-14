package controllers

import (
	"time"

	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/gofiber/fiber/v3"
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

func AddProduct(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		product := new(models.Products)

		// Parse ข้อมูลจาก JSON Body
		if err := c.Bind().Body(&product); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "failed to parse request body",
			})
		}

		// กำหนดเวลาสร้างสินค้า
		product.Create_at = time.Now()

		// บันทึกลง Database
		if err := db.Create(&product).Error; err != nil {
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
}

func UpdateProduct(db *gorm.DB) fiber.Handler {
	return func(c fiber.Ctx) error {
		// รับ ID จาก Parameter เช่น /products/:id
		id := c.Params("id")

		var product models.Products
		// ตรวจสอบก่อนว่ามีสินค้านี้จริงไหม
		if err := db.First(&product, id).Error; err != nil {
			return c.Status(404).JSON(fiber.Map{
				"message": "ไม่พบสินค้าที่ต้องการแก้ไข",
			})
		}

		// Parse ข้อมูลใหม่ที่ส่งมา (จะอัปเดตเฉพาะฟิลด์ที่ส่งมา)
		if err := c.Bind().Body(&product); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "ข้อมูลที่ส่งมาไม่ถูกต้อง",
			})
		}

		// บันทึกการเปลี่ยนแปลง
		if err := db.Save(&product).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{
				"message": "ไม่สามารถอัปเดตข้อมูลได้",
			})
		}

		return c.JSON(fiber.Map{
			"message": "แก้ไขข้อมูลสินค้าสำเร็จ",
			"data":    product,
		})
	}
}
