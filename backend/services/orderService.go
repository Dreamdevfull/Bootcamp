package services

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type OrderService interface {
	GetOrders() ([]models.Orders, error)
	QuickComplete(orderID int) error
}

type orderService struct {
	repo       repositorys.OrderRepository
	walletRepo repositorys.WalletRepository
}

func NewOrderService(r repositorys.OrderRepository, w repositorys.WalletRepository) OrderService {
	return &orderService{repo: r, walletRepo: w}
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
