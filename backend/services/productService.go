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
		ImageURL:    product.Image,
		CostPrice:   product.Cost_price,
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
	// 1. ค้นหาสินค้าเดิม
	product, err := s.productRepo.FindByID(id)
	if err != nil {
		return nil, errors.New("product not found")
	}
	if input.Name != "" {
		product.Name = input.Name
	}
	if input.Description != "" {
		product.Description = input.Description
	}

	// 2. จัดการเรื่องราคาและสต็อก (ถ้าค่า > 0 ถึงจะอัปเดต)
	if input.CostPrice > 0 {
		product.Cost_price = input.CostPrice
	}
	if input.MinPrice > 0 {
		product.Min_price = input.MinPrice
	}
	// สำหรับ Stock อาจจะเป็น 0 ได้ ต้องเช็คจาก Request ว่าส่งมาจริงไหม
	// หรือเช็คเบื้องต้นถ้าไม่อยากให้เป็น 0 ก็ใช้เงื่อนไข > 0
	if input.Stock != nil {
		product.Stock = *input.Stock
	}

	// 2. จัดการรูปภาพ
	if len(imageBytes) > 0 {
		// ถ้ามีการอัปโหลดไฟล์ใหม่เข้ามา
		uploadDir := "public/uploads/products"
		os.MkdirAll(uploadDir, 0755)
		fullPath := filepath.Join(uploadDir, fileName)
		if err := os.WriteFile(fullPath, imageBytes, 0644); err != nil {
			return nil, err
		}
		product.Image = "/uploads/products/" + fileName
	} else if input.ImageURL != "" {
		// ถ้าไม่มีไฟล์ใหม่ แต่มี URL รูปเดิมส่งมา (ป้องกันค่าว่าง)
		product.Image = input.ImageURL
	}

	// 3. Business Logic
	if input.MinPrice < input.CostPrice {
		return nil, errors.New("min price must be greater or equal to cost price")
	}

	// 4. Mapping ข้อมูลใหม่
	product.Name = input.Name
	product.Description = input.Description
	product.Cost_price = input.CostPrice
	product.Min_price = input.MinPrice
	product.Stock = *input.Stock

	// 5. บันทึก
	if err := s.productRepo.Update(product); err != nil {
		return nil, err
	}

	// 6. ส่ง Response กลับ (Output)
	return &dto.ProductResponse{
		ID:          product.Id,
		Name:        product.Name,
		Description: product.Description,
		ImageURL:    product.Image,
		CostPrice:   product.Cost_price,
		MinPrice:    product.Min_price,
		Stock:       product.Stock,
	}, nil
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
