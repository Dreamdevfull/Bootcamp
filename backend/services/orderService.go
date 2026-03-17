package services

import (
	"errors"
	"fmt"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type OrderService interface {
	GetOrders() ([]models.Orders, error)
	QuickComplete(orderID int) error
	AddItemToCart(slug string, req dto.CartItem) (*models.OrderItems, error)
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

	if err := s.walletRepo.AddBalance(order.Shop_id, totalProfit, uint(orderID)); err != nil {
		return err
	}

	return nil
}

func (s *orderService) AddItemToCart(slug string, req dto.CartItem) (*models.OrderItems, error) {
	// 1. ค้นหาร้านค้า
	shop, err := s.shopRepo.GetBySlug(slug)
	if err != nil {
		return nil, errors.New("ไม่พบร้านค้า")
	}

	// 2. ตรวจสอบสินค้าและราคาขายของร้านนี้ (ใช้ฟังก์ชัน Checkout ที่เราแยกไว้)
	shopProduct, err := s.productRepo.GetProductForCheckout(shop.Id, req.ProductID)
	if err != nil {
		return nil, errors.New("ไม่พบสินค้านี้ในร้านค้า")
	}

	// 3. BR-27: ตรวจสอบสต็อกเบื้องต้น
	if shopProduct.Product.Stock < req.Quantity {
		return nil, fmt.Errorf("สินค้าสต็อกไม่พอ (คงเหลือ %d)", shopProduct.Product.Stock)
	}

	// 4. เตรียมข้อมูล OrderItem (เปรียบเสมือนสินค้าในตะกร้า)
	cartItem := &models.OrderItems{
		Products_id:   int(shopProduct.Product.Id),
		Products_name: shopProduct.Product.Name,
		Cost_price:    shopProduct.Product.Cost_price,
		Selling_price: shopProduct.Selling_price,
		Quantity:      req.Quantity,
		// หมายเหตุ: Order_id จะยังเป็น 0 หรือ Null จนกว่าจะมีการ Checkout จริง
	}

	// ในขั้นตอนนี้คุณอาจจะเลือกบันทึกลง Table Cart (ถ้ามี)
	// หรือส่งกลับไปให้ Frontend เก็บไว้ใน LocalStorage/State ก่อนก็ได้
	return cartItem, nil
}
