package services

import (
	"os"

	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type ShopService struct {
	repo repositorys.ShopRepository
}

func NewShopService(repo repositorys.ShopRepository) *ShopService {
	return &ShopService{repo}
}

func (s *ShopService) GetShop(slug string) ([]models.Products, string, error) {
	return s.repo.GetShopProducts(slug)
}

func (s *ShopService) GetMyShop(userID interface{}) (string, string, error) {

	shop, err := s.repo.FindByUserID(userID)
	if err != nil {
		return "", "", err
	}

	baseURL := os.Getenv("FRONTEND_URL")

	shopURL := baseURL + "/shop/" + shop.Shop_slug

	return shop.Shop_name, shopURL, nil
}
