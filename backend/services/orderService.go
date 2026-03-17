package services

import (
	"errors"
	"fmt"
	"time"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type OrderService interface {
	GetOrders() ([]models.Orders, error)
	QuickComplete(orderID int) error
	ProcessCheckout(slug string, req dto.CheckoutRequest) (*models.Orders, error)
	ConfirmPayment(orderID uint) (*models.Orders, error)
}

type orderService struct {
	repo        repositorys.OrderRepository
	walletRepo  repositorys.WalletRepository
	productRepo repositorys.ProductRepository
	shopRepo    repositorys.ShopRepository
}

func NewOrderService(
	orderRepo repositorys.OrderRepository,
	walletRepo repositorys.WalletRepository,
	productRepo repositorys.ProductRepository,
	shopRepo repositorys.ShopRepository,
) OrderService {
	return &orderService{repo: orderRepo, walletRepo: walletRepo, productRepo: productRepo, shopRepo: shopRepo}
}

func (s *orderService) GetOrders() ([]models.Orders, error) {
	return s.repo.FindAll()
}

func (s *orderService) QuickComplete(orderID int) error {
	order, err := s.repo.FindByID(orderID)
	if err != nil {
		return err
	}

	items, err := s.repo.GetItemsByOrderID(orderID)
	if err != nil {
		return err
	}

	var totalProfit float64
	for _, item := range items {
		profitPerItem := item.Selling_price - item.Cost_price
		totalProfit += profitPerItem * float64(item.Quantity)

	}

	if err := s.repo.UpdateStatus(orderID, "shipped"); err != nil {
		return err
	}

	if err := s.walletRepo.AddBalance(order.Shop_id, totalProfit); err != nil {
		return err
	}

	return nil
}

// func (s *orderService) AddItemToCart(slug string, req dto.CartItem) (*models.OrderItems, error) {
// 	// 1. ค้นหาร้านค้า
// 	shop, err := s.shopRepo.GetBySlug(slug)
// 	if err != nil {
// 		return nil, errors.New("ไม่พบร้านค้า")
// 	}

// 	// 2. ตรวจสอบสินค้าและราคาขายของร้านนี้ (ใช้ฟังก์ชัน Checkout ที่เราแยกไว้)
// 	shopProduct, err := s.productRepo.GetProductForCheckout(shop.Id, req.ProductID)
// 	if err != nil {
// 		return nil, errors.New("ไม่พบสินค้านี้ในร้านค้า")
// 	}

// 	// 3. BR-27: ตรวจสอบสต็อกเบื้องต้น
// 	if shopProduct.Product.Stock < req.Quantity {
// 		return nil, fmt.Errorf("สินค้าสต็อกไม่พอ (คงเหลือ %d)", shopProduct.Product.Stock)
// 	}

// 	// 4. เตรียมข้อมูล OrderItem (เปรียบเสมือนสินค้าในตะกร้า)
// 	cartItem := &models.OrderItems{
// 		Product_id:   int(shopProduct.Product.Id),
// 		Products_name: shopProduct.Product.Name,
// 		Cost_price:    shopProduct.Product.Cost_price,
// 		Selling_price: shopProduct.Selling_price,
// 		Quantity:      req.Quantity,
// 		// หมายเหตุ: Order_id จะยังเป็น 0 หรือ Null จนกว่าจะมีการ Checkout จริง
// 	}

// 	// ในขั้นตอนนี้คุณอาจจะเลือกบันทึกลง Table Cart (ถ้ามี)
// 	// หรือส่งกลับไปให้ Frontend เก็บไว้ใน LocalStorage/State ก่อนก็ได้
// 	return cartItem, nil
// }

func (s *orderService) ProcessCheckout(slug string, req dto.CheckoutRequest) (*models.Orders, error) {
	shop, err := s.shopRepo.GetBySlug(slug)
	if err != nil {
		return nil, errors.New("ไม่พบร้านค้า")
	}

	var totalAmount float64
	var totalProfit float64
	var items []models.OrderItems

	for _, itemReq := range req.Items {
		shopProduct, err := s.productRepo.GetProductForCheckout(shop.Id, itemReq.ProductID)
		if err != nil {
			return nil, fmt.Errorf("ไม่พบสินค้า ID %d", itemReq.ProductID)
		}

		// BR-27: ตรวจสอบสต็อก
		if shopProduct.Product.Stock < itemReq.Quantity {
			return nil, fmt.Errorf("สินค้า %s ไม่เพียงพอ", shopProduct.Product.Name)
		}

		totalAmount += shopProduct.Selling_price * float64(itemReq.Quantity)
		totalProfit += (shopProduct.Selling_price - shopProduct.Product.Min_price) * float64(itemReq.Quantity)

		items = append(items, models.OrderItems{
			Product_id:    int(shopProduct.Product.Id),
			Product_name:  shopProduct.Product.Name,
			Cost_price:    shopProduct.Product.Cost_price,
			Selling_price: shopProduct.Selling_price,
			Quantity:      itemReq.Quantity,
		})
	}

	order := models.Orders{
		Order_number:     fmt.Sprintf("ORD-%d", time.Now().Unix()),
		Shop_id:          int(shop.Id),
		Customer_name:    req.CustomerName,
		Customer_phone:   req.CustomerPhone,
		Shipping_address: req.ShippingAddress,
		Total_amount:     totalAmount,
		Reseller_profit:  totalProfit,
		Status:           "awaiting_payment",
		OrderItems:       items,
	}

	if err := s.repo.CreateOrder(&order); err != nil {
		return nil, err
	}
	return &order, nil
}

func (s *orderService) ConfirmPayment(orderID uint) (*models.Orders, error) {
	order, err := s.repo.FindOrderByID(orderID)
	if err != nil {
		return nil, errors.New("ไม่พบออเดอร์")
	}

	if order.Status != "awaiting_payment" {
		return nil, errors.New("ออเดอร์นี้ได้ทำการชำระเงินเรียบร้อยแล้ว")
	}

	// BR-29: ตัดสต็อกสินค้า
	for _, item := range order.OrderItems {
		if err := s.productRepo.UpdateStock(uint(item.Product_id), -item.Quantity); err != nil {
			return nil, err
		}
	}

	// BR-28: อัปเดตสถานะเป็น completed (หรือตาม ENUM ที่คุณตั้ง)
	order.Status = "pending"
	if err := s.repo.UpdateOrderStatus(orderID, order.Status); err != nil {
		return nil, err
	}

	return order, nil
}
