package services

import (
	"errors"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

// type ResellerService interface {
// 	GetResellers() ([]models.Users, error)
// 	UpdateResellerStatus(id string, status string) error
// }

// type resellerService struct {
// 	resellerRepo repositorys.ResellerRepository
// }

// func NewResellerService(r repositorys.ResellerRepository) ResellerService {
// 	return &resellerService{resellerRepo: r}
// }

// func (s *resellerService) GetResellers() ([]models.Users, error) {
// 	return s.resellerRepo.FindResellers()
// }

// func (s *resellerService) UpdateResellerStatus(id string, status string) error {
// 	validStatuses := map[string]bool{
// 		"pending":  true,
// 		"approved": true,
// 		"rejected": true,
// 	}

// 	if !validStatuses[status] {
// 		return errors.New("invalid status: must be pending, approved, or rejected")
// 	}

// 	return s.resellerRepo.UpdateStatus(id, status)
// }

type ResellerService interface {
	GetCatalog() ([]models.Products, error)
	GetProductsByID(id uint) (models.Products, error)
	AddProductToShop(req dto.AddProductToShopRequest) error
	GetMyShopProducts(shopID uint) ([]models.ShopProducts, error)
	UpdateProductPrice(userID uint, shopProductID uint, newPrice float64) error
	RemoveProductFromShop(userID uint, productID uint) error
	GetWalletByUserID(userID uint) (*models.Wallet, error)
}

type resellerService struct {
	repo repositorys.ResellerRepository
}

func NewResellerService(repo repositorys.ResellerRepository) ResellerService {
	return &resellerService{repo: repo}
}

func (s *resellerService) GetCatalog() ([]models.Products, error) {
	return s.repo.GetCatalog()
}

func (s *resellerService) GetProductsByID(id uint) (models.Products, error) {
	return s.repo.GetProductsByID(id)
}

func (s *resellerService) AddProductToShop(req dto.AddProductToShopRequest) error {

	product, err := s.repo.GetProductsByID(req.ProductID)

	if err != nil {
		return errors.New("product not found")
	}

	if product.Stock <= 0 {
		return errors.New("product out of stock")
	}

	if req.Price < product.Min_price {
		return errors.New("price must be at least the minimum price")
	}

	shopProduct := models.ShopProducts{
		Shop_id:       uint(req.ShopID),
		Products_id:   uint(req.ProductID),
		Selling_price: req.Price,
	}
	return s.repo.AddProductToShop(&shopProduct)
}

func (s *resellerService) GetMyShopProducts(shopID uint) ([]models.ShopProducts, error) {
	return s.repo.GetMyShopProducts(shopID)
}

func (s *resellerService) UpdateProductPrice(userID uint, shopProductID uint, resellingPrice float64) error {
	shopProduct, err := s.repo.GetShopProductByID(shopProductID)

	if err != nil {
		return errors.New("shop product not found")
	}

	if resellingPrice < shopProduct.Product.Min_price {
		return errors.New("price must be at least the minimum price")
	}

	return s.repo.UpdatePrice(shopProductID, resellingPrice)
}

func (s *resellerService) RemoveProductFromShop(userID uint, productID uint) error {
	hasOrder, err := s.repo.HasActiveOrder(productID, userID)
	if err != nil {
		return err
	}
	if hasOrder {
		return errors.New("ไม่สามารถนำสินค้าออกได้ เนื่องจากยังมีออเดอร์ค้างส่งอยู่")
	}

	return s.repo.DeleteFromShop(userID, productID)

}

func (s *resellerService) GetWalletByUserID(userID uint) (*models.Wallet, error) {

	return s.repo.GetWalletByUserID(userID)
}
