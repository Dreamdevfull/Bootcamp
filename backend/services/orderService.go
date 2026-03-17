package services

import (
	"fmt"
	"time"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type OrderService interface {
	GetOrders() ([]models.Orders, error)
	QuickComplete(orderID int) error
	ProcessCheckout(slug string, req dto.CheckoutRequest) (*dto.CheckoutResponse, error)
}

type orderService struct {
	repo        repositorys.OrderRepository
	walletRepo  repositorys.WalletRepository
	productRepo repositorys.ProductRepository
	shopRepo    repositorys.ShopRepository
}

func NewOrderService(
	r repositorys.OrderRepository,
	w repositorys.WalletRepository,
	p repositorys.ProductRepository,
	sh repositorys.ShopRepository,
) OrderService {
	return &orderService{repo: r, walletRepo: w, productRepo: p, shopRepo: sh}
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

func (s *orderService) ProcessCheckout(slug string, req dto.CheckoutRequest) (*dto.CheckoutResponse, error) {
	// 1. ตรวจสอบร้านค้าและสินค้า
	shop, _ := s.shopRepo.GetBySlug(slug)
	shopProduct, _ := s.productRepo.GetProductForCheckout(shop.Id, req.ProductID)
	product, _ := s.productRepo.FindByID(req.ProductID)

	// 2. BR-27: ตรวจสอบสต็อก
	if product.Stock < req.Quantity {
		return nil, fmt.Errorf("สินค้าไม่เพียงพอ")
	}

	// 3. คำนวณยอดและกำไร [cite: 7, 8]
	totalAmount := shopProduct.Selling_price * float64(req.Quantity)
	resellerProfit := (shopProduct.Selling_price - product.Min_price) * float64(req.Quantity)

	// 4. เตรียมข้อมูล Order
	order := models.Orders{
		Order_number:     fmt.Sprintf("ORD-%d", time.Now().Unix()),
		Shop_id:          int(shop.Id),
		Customer_name:    req.CustomerName,
		Customer_phone:   req.CustomerPhone,
		Shipping_address: req.ShippingAddress,
		Total_amount:     totalAmount,
		Reseller_profit:  resellerProfit,
		Staus:            "pending", // เริ่มต้นเป็นรอดำเนินการ
	}

	item := models.OrderItems{
		Products_id:   int(product.Id),
		Products_name: product.Name,
		Cost_price:    product.Cost_price, // ราคาทุนจากระบบ
		Selling_price: shopProduct.Selling_price,
		Quantity:      req.Quantity,
	}

	// 5. บันทึกและตัดสต็อก
	if err := s.repo.CreateOrder(&order, []models.OrderItems{item}); err != nil {
		return nil, err
	}

	// ตัดสต็อกสินค้า
	product.Stock -= req.Quantity
	s.productRepo.Update(product)

	return &dto.CheckoutResponse{
		OrderNumber: order.Order_number,
		Message:     "สั่งซื้อสำเร็จ!",
	}, nil
}
