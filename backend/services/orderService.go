package services

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type OrderService interface {
	GetOrders() ([]models.Orders, error)
}

type orderService struct {
	repo repositorys.OrderRepository
}

func NewOrderService(r repositorys.OrderRepository) *orderService {
	return &orderService{repo: r}
}

func (s *orderService) GetOrders() ([]models.Orders, error) {
	return s.repo.FindAll()
}
