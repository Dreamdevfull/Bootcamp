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

func (s *ProductService) CreatedProduct(input dto.AddProductRequest) (*dto.ProductResponse, error) {

	product := models.Products{
		Name:       input.Name,
		Image:      input.ImageURL,
		Cost_price: input.CostPrice,
		Min_price:  input.MinPrice,
		Stock:      input.Stock,
		Create_at:  time.Now(),
	}

	if product.Min_price < product.Cost_price {
		return nil, errors.New("min price must be greater or equal to cost price")
	}

	err := s.productRepo.Create(&product)

	if err != nil {
		return nil, err
	}

	return &dto.ProductResponse{
		ID:        product.Id,
		Name:      product.Name,
		ImageURL:  product.Image,
		CostPrice: product.Cost_price,
		MinPrice:  product.Min_price,
		Stock:     product.Stock,
	}, nil
}
