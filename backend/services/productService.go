package services

import (
	"errors"
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

func (s *ProductService) CreateProduct(input dto.AddProductRequest) (*dto.ProductResponse, error) {

	product := models.Products{
		Name:        input.Name,
		Description: input.Description,
		Image:       input.ImageURL,
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

	// product := models.Products{
	// 	Name:        input.Name,
	// 	Description: input.Description,
	// 	Image:       input.ImageURL,
	// 	Cost_price:  input.CostPrice,
	// 	Min_price:   input.MinPrice,
	// 	Stock:       input.Stock,
	// 	Create_at:   time.Now(),
	// }

	// err := s.productRepo.Create(&product)
	// if err != nil {
	// 	return nil, err
	// }

	// return &product, nil
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

	// ตรวจว่ามี order ที่ยังไม่เสร็จหรือไม่
	hasActiveOrder, err := s.productRepo.HasActiveOrder(id)
	if err != nil {
		return err
	}

	if hasActiveOrder {
		return errors.New("cannot delete product because it has active orders")
	}

	return s.productRepo.Delete(product)
}
