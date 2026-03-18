package services

import (
	"errors"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type ResellerService interface {
	GetCatalog(userID uint) ([]dto.ProductCatalogResponse, error)
	// GetProductsByID(id uint) (models.Products, error)
	AddProductToShop(userID uint, req dto.AddProductToShopRequest) error
	GetMyShopProducts(shopID uint) ([]models.ShopProducts, error)
	UpdateProductPrice(userID uint, shopProductID uint, newPrice float64) error
	RemoveProductFromShop(userID uint, productID uint) error
	GetOrdersForReseller(resellerID uint) ([]dto.ResellerOrderResponse, error)
	GetWalletByUserID(userID uint) (*models.Wallet, error)
}

type resellerService struct {
	repo repositorys.ResellerRepository
}

func NewResellerService(repo repositorys.ResellerRepository) ResellerService {
	return &resellerService{repo: repo}
}

func (s *resellerService) GetCatalog(userID uint) ([]dto.ProductCatalogResponse, error) {
	shop, _ := s.repo.GetShopByUserID(userID)
	return s.repo.GetCatalogWithStatus(shop.Id, 0)
}

// func (s *resellerService) GetProductsByID(id uint) (models.Products, error) {
// 	return s.repo.GetProductsByID(id)
// }

func (s *resellerService) AddProductToShop(userID uint, req dto.AddProductToShopRequest) error {
	shop, _ := s.repo.GetShopByUserID(userID)

	product, err := s.repo.GetProductsByID(req.ProductID)

	if err != nil {
		return errors.New("product not found")
	}

	if product.Stock <= 0 {
		return errors.New("product out of stock")
	}

	if req.Selling_Price < product.Min_price {
		return errors.New("price must be at least the minimum price")
	}

	shopProduct := models.ShopProducts{
		Shop_id:       shop.Id,
		Products_id:   req.ProductID,
		Selling_price: req.Selling_Price,
	}

	ownerID, err := s.repo.GetProductOwner(req.ProductID)

	// Logic: ถ้ามีเจ้าของแล้ว (err == nil) และเจ้าของไม่ใช่เรา
	if err == nil && ownerID != shop.Id {
		return errors.New("สินค้านี้ถูกร้านค้าอื่นเลือกไปแล้ว")
	}

	return s.repo.UpsertShopProduct(&shopProduct)
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

func (s *resellerService) GetOrdersForReseller(resellerID uint) ([]dto.ResellerOrderResponse, error) {
	orders, err := s.repo.GetMyOrders(resellerID)
	if err != nil {
		return nil, err
	}

	var response []dto.ResellerOrderResponse
	for _, o := range orders {
		var totalProfit float64
		var itemSummary string

		for i, item := range o.OrderItems {
			// คำนวณกำไร: (ราคาขาย - ราคาทุน) * จำนวน
			profit := (item.Selling_price - item.Cost_price) * float64(item.Quantity)
			totalProfit += profit

			// รวมชื่อสินค้าเพื่อแสดงในคอลัมน์ "สินค้า / จำนวน"
			itemSummary += item.Product_name
			if i < len(o.OrderItems)-1 {
				itemSummary += ", "
			}
		}

		response = append(response, dto.ResellerOrderResponse{
			OrderNumber:  o.Order_number,
			CustomerName: o.Customer_name,
			ItemsSummary: itemSummary,
			TotalAmount:  o.Total_amount,
			MyProfit:     totalProfit,
			Status:       mapStatusThai(string(o.Status)),
		})
	}
	return response, nil
}

// ฟังก์ชันแปลงสถานะตามโจทย์
func mapStatusThai(status string) string {
	switch status {
	case "pending":
		return "รอจัดส่ง"
	case "shipped":
		return "จัดส่งแล้ว"
	case "completed":
		return "เสร็จสมบูรณ์"
	default:
		return status
	}

}
func (s *resellerService) GetWalletByUserID(userID uint) (*models.Wallet, error) {

	return s.repo.GetWalletByUserID(userID)
}
