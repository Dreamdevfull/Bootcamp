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
	// GetWalletByUserID(userID uint) (*models.Wallet, error)
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

func (s *resellerService) UpdateProductPrice(userID uint, shopProductID uint, SellingPrice float64) error {
	shopProduct, err := s.repo.GetShopProductByID(shopProductID)

	if err != nil {
		return errors.New("shop product not found")
	}

	if SellingPrice < shopProduct.Product.Min_price {
		return errors.New("price must be at least the minimum price")
	}

	return s.repo.UpdatePrice(shopProductID, SellingPrice)
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
		var itemSummaryParts []dto.OrderItemDetail

		// 2. Logic การคำนวณกำไรและการรวมชื่อสินค้า
		for _, item := range o.OrderItems {
			// กำไร = (ราคาขายปลีก - ราคาทุน) * จำนวน
			profit := (item.Selling_price - item.Cost_price) * float64(item.Quantity)
			totalProfit += profit

			// เก็บชื่อสินค้าและจำนวนไว้ใน Slice เพื่อรอ Join เป็น String
			itemSummaryParts = append(itemSummaryParts, dto.OrderItemDetail{
				ProductName: item.Product_name,
				Quantity:    item.Quantity,
			})
		}

		// 3. Map ข้อมูลลง DTO
		response = append(response, dto.ResellerOrderResponse{
			OrderID:      o.Id,
			OrderNumber:  o.Order_number,
			CustomerName: o.Customer_name,
			ItemsSummary: itemSummaryParts, // "เสื้อ (2), กางเกง (1)"
			TotalAmount:  o.Total_amount,
			MyProfit:     totalProfit,
			CreatedAt:    o.Created_at.Format("02/01/2006 15:04"),
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
		return "กำลังจัดส่ง"
	case "completed":
		return "จัดส่งเสร็จสมบูรณ์"
	default:
		return status
	}

}

// func (s *resellerService) GetWalletByUserID(userID uint) (*models.Wallet, error) {

// 	return s.repo.GetWalletByUserID(userID)
// }
