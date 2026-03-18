package services

import (
	"errors"
	"log"
	"time"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
	"github.com/Dreamdevfull/Bootcamp/utils"
)

type ProductService struct {
	productRepo repositorys.ProductRepository
}

func NewProductService(repo repositorys.ProductRepository) *ProductService {
	return &ProductService{repo}
}

func (s *ProductService) CreateProduct(input dto.AddProductRequest, imageBytes []byte) (*dto.ProductResponse, error) {

	var imagePath string

	if len(imageBytes) > 0 {
		// เก็บไว้ในโฟลเดอร์ public/uploads/products
		path, err := utils.SaveImageAsWebP(imageBytes, "public/uploads/products")
		if err != nil {
			return nil, err
		}
		imagePath = path
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

func (s *ProductService) UpdateProduct(id uint, input dto.UpdateProductRequest) (*dto.ProductResponse, error) {

	product, err := s.productRepo.FindByID(id)
	if err != nil {
		return nil, errors.New("product not found")
	}

	if input.MinPrice < input.CostPrice {
		return nil, errors.New("min price must be greater or equal to cost price")
	}

	product.Name = input.Name
	product.Description = input.Description
	product.Image = input.ImageURL
	product.Cost_price = input.CostPrice
	product.Min_price = input.MinPrice
	product.Stock = input.Stock

	err = s.productRepo.Update(product)
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
