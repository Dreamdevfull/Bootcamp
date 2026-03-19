package services

import (
	"errors"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
	"gorm.io/gorm"
)

type ShopService interface {
	GetShopFrontData(slug string) (*dto.ShopFrontResponse, error)
	GetShopBySlug(slug string) (*models.Shops, error)
}

type shopService struct {
	repo        repositorys.ShopRepository
	productRepo repositorys.ProductRepository
}

func NewShopService(repo repositorys.ShopRepository, productRepo repositorys.ProductRepository) ShopService {
	return &shopService{repo, productRepo}
}

func (s *shopService) GetShopFrontData(slug string) (*dto.ShopFrontResponse, error) {

	shop, err := s.repo.GetBySlug(slug)
	if err != nil {
		return nil, err
	}

	shopItems, err := s.repo.GetShopProductsByShopID(shop.Id)
	if err != nil {
		return nil, err
	}

	var productList []dto.ShopProductResponse
	for _, item := range shopItems {

		p, _ := s.productRepo.FindByID(item.Products_id)
		productList = append(productList, dto.ShopProductResponse{
			ProductID:    item.Products_id,
			ProductName:  p.Name,
			Description:  p.Description,
			ImageUrl:     p.Image,
			SellingPrice: item.Selling_price,
			Stock:        p.Stock,
		})
	}

	return &dto.ShopFrontResponse{
		ShopName: shop.Shop_name,
		Products: productList,
	}, nil
}
func (s *shopService) GetShopBySlug(slug string) (*models.Shops, error) {
	// เรียกใช้ Repository ที่คุณมีอยู่แล้ว
	shop, err := s.repo.GetBySlug(slug)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("ไม่พบร้านค้าที่ระบุ")
		}
		return nil, err
	}
	return shop, nil
}
