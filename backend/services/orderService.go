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
	repo repositorys.OrderRepository
}

func NewOrderService(r repositorys.OrderRepository) OrderService {
	return &orderService{repo: r}
}

func (s *orderService) GetOrders() ([]models.Orders, error) {
	return s.repo.FindAll()
}

func (s *orderService) QuickComplete(orderID int) error {
	return s.repo.UpdateStatus(orderID, "shipped")
}
