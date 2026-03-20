package services

import (
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type ProductService struct {
	productRepo repositorys.ProductRepository
}

func NewProductService(repo repositorys.ProductRepository) *ProductService {
	return &ProductService{repo}
}

func (s *ProductService) CreateProduct(input dto.AddProductRequest, imageBytes []byte, fileName string) (*dto.ProductResponse, error) {

	var imagePath string

	if len(imageBytes) > 0 {

		uploadDir := "public/uploads/products"

		if err := os.MkdirAll(uploadDir, 0755); err != nil {
			return nil, fmt.Errorf("could not create upload directory: %v", err)
		}

		fullPath := filepath.Join(uploadDir, fileName)

		if err := os.WriteFile(fullPath, imageBytes, 0644); err != nil {
			return nil, fmt.Errorf("could not save image: %v", err)
		}

		imagePath = "/uploads/products/" + fileName
	}

	product := models.Products{
		Name:        input.Name,
		Description: input.Description,
		Image:       imagePath,
		Cost_price:  input.CostPrice,
		Min_price:   input.MinPrice,
		Stock:       input.Stock,
		Create_at:   time.Now(),
	}

	if product.Min_price < product.Cost_price {
		return nil, errors.New("min price must be greater or equal to cost price")
	}

	err := s.productRepo.Create(&product)
	if err != nil {
		return nil, err
	}

	return &dto.ProductResponse{
		ID:          product.Id,
		Name:        product.Name,
		Description: product.Description,
		Image:       product.Image,
		Cost_price:  product.Cost_price,
		MinPrice:    product.Min_price,
		Stock:       product.Stock,
	}, nil
}
func (s *ProductService) GetProducts() ([]models.Products, error) {
	return s.productRepo.GetProducts()
}

// func (s *ProductService) UpdateProduct(id uint, input dto.UpdateProductRequest) (*dto.ProductResponse, error) {

// 	product, err := s.productRepo.FindByID(id)
// 	if err != nil {
// 		return nil, errors.New("product not found")
// 	}

// 	if input.MinPrice < input.CostPrice {
// 		return nil, errors.New("min price must be greater or equal to cost price")
// 	}

// 	product.Name = input.Name
// 	product.Description = input.Description
// 	product.Image = input.ImageURL
// 	product.Cost_price = input.CostPrice
// 	product.Min_price = input.MinPrice
// 	product.Stock = input.Stock

// 	err = s.productRepo.Update(product)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return &dto.ProductResponse{
// 		ID:          product.Id,
// 		Name:        product.Name,
// 		Description: product.Description,
// 		ImageURL:    product.Image,
// 		CostPrice:   product.Cost_price,
// 		MinPrice:    product.Min_price,
// 		Stock:       product.Stock,
// 	}, nil
// }

func (s *ProductService) DeleteProduct(id uint) error {

	product, err := s.productRepo.FindByID(id)
	if err != nil {
		return errors.New("product not found")
	}

	hasActiveOrder, err := s.productRepo.HasActiveOrder(id)
	if err != nil {
		return err
	}

	if hasActiveOrder {
		return errors.New("cannot delete product because it has active orders")
	}

	return s.productRepo.Delete(product)
}

func (s *ProductService) UpdateProduct(id uint, input dto.UpdateProductRequest, imageBytes []byte, fileName string) (*dto.ProductResponse, error) {
	// 1. สร้าง Map เพื่อเก็บฟิลด์ที่จะอัปเดต
	updateData := make(map[string]interface{})

	// 2. เช็คทีละฟิลด์ ถ้าส่งมา (ไม่ว่าง/ไม่ nil) ให้ใส่ลงใน Map
	if input.Name != "" {
		updateData["name"] = input.Name
	}
	if input.Description != "" {
		updateData["description"] = input.Description
	}
	if input.CostPrice > 0 {
		updateData["cost_price"] = input.CostPrice
	}
	if input.MinPrice > 0 {
		updateData["min_price"] = input.MinPrice
	}

	// สำหรับ Stock (ที่เป็น Pointer)
	if input.Stock != nil {
		updateData["stock"] = *input.Stock
	}

	// 3. จัดการรูปภาพ
	if len(imageBytes) > 0 {
		uploadDir := "public/uploads/products"
		os.MkdirAll(uploadDir, 0755)
		fullPath := filepath.Join(uploadDir, fileName)
		os.WriteFile(fullPath, imageBytes, 0644)
		updateData["image_url"] = "/uploads/products/" + fileName
	}

	// 4. ถ้าไม่มีอะไรต้องแก้เลย ให้รีเทิร์นข้อมูลเดิม
	if len(updateData) == 0 {
		p, _ := s.productRepo.FindByID(id)
		return s.mapToResponse(p), nil
	}

	// 5. สั่งอัปเดตผ่าน Repository (ส่ง Map ไป)
	if err := s.productRepo.UpdateFields(id, updateData); err != nil {
		return nil, err
	}

	// 6. ดึงข้อมูลใหม่ล่าสุดมาโชว์
	updatedProduct, _ := s.productRepo.FindByID(id)
	return s.mapToResponse(updatedProduct), nil
}

// Helper function สำหรับสร้าง Response (เพื่อความสะอาดของโค้ด)
func (s *ProductService) mapToResponse(p *models.Products) *dto.ProductResponse {
	return &dto.ProductResponse{
		ID:          p.Id,
		Name:        p.Name,
		Description: p.Description,
		Image:       p.Image,
		Cost_price:  p.Cost_price,
		MinPrice:    p.Min_price,
		Stock:       p.Stock,
	}
}

// 1. ฟังก์ชันสั่งลบจริง (ล้างถังขยะ)
func (s *ProductService) EmptyGarbage() error {
	const daysToKeep = 30 // กำหนดตรงนี้เลยว่ากี่วันลบ
	log.Printf("Service: กำลังล้างสินค้าที่ถูก Soft Delete เกิน %d วัน", daysToKeep)
	return s.productRepo.HardDeleteOldRecords(daysToKeep)
}

// 2. ฟังก์ชันตั้งเวลาที่จะให้ระบบรันเอง (Background Task)
func (s *ProductService) StartCleanupScheduler() {
	go func() {
		// รันทุกๆ 24 ชั่วโมง
		ticker := time.NewTicker(24 * time.Hour)
		for range ticker.C {
			err := s.EmptyGarbage()
			if err != nil {
				log.Println("Scheduler Error:", err)
			}
		}
	}()
}

// ฟังก์ชันกู้คืนสินค้า
func (s *ProductService) RestoreProduct(id uint) error {
	return s.productRepo.Restore(id)
}
