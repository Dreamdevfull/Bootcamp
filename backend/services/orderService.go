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
	GetOrderTracking(orderNumber string) (*models.Orders, error)
	GetDashboardStats(userID uint) (*dto.DashboardStats, error)
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

	if order.Status == "completed" {
		return errors.New("ออเดอร์นี้บันทึกกำไรไปเรียบร้อยแล้ว")
	}

	shop, err := s.shopRepo.GetByID(uint(order.Shop_id))
	if err != nil {
		return fmt.Errorf("ไม่พบร้านค้าที่เกี่ยวข้องกับออเดอร์นี้: %v", err)
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

	if err := s.repo.UpdateStatus(orderID, "completed"); err != nil {
		return err
	}

	if err := s.walletRepo.AddBalance(int(shop.User_id), totalProfit, uint(orderID)); err != nil {
		return err
	}

	return nil
}

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
		Status:           "pending",
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

	if order.Status != "pending" {
		return nil, errors.New("ออเดอร์นี้ได้ทำการชำระเงินเรียบร้อยแล้ว")
	}

	for _, item := range order.OrderItems {
		if err := s.productRepo.UpdateStock(uint(item.Product_id), -item.Quantity); err != nil {
			return nil, err
		}
	}

	// BR-28: อัปเดตสถานะเป็น completed (หรือตาม ENUM ที่คุณตั้ง)
	order.Status = "shipped"
	if err := s.repo.UpdateOrderStatus(orderID, order.Status); err != nil {
		return nil, err
	}

	return order, nil
}

func (s *orderService) GetOrderTracking(orderNumber string) (*models.Orders, error) {
	order, err := s.repo.FindByOrderNumber(orderNumber)
	if err != nil {
		return nil, err
	}
	return order, nil
}

func (s *orderService) GetDashboardStats(userID uint) (*dto.DashboardStats, error) {

	stats, err := s.repo.GetDashBoardStats(userID)
	if err != nil {
		return nil, fmt.Errorf("ไม่สามารถดึงข้อมูล Dashboard ได้: %v", err)
	}

	return stats, nil
}
