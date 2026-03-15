package repositorys

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type OrderRepository interface {
	FindAll() ([]models.Orders, error)
}

type orderRepository struct {
	db *gorm.DB
}

func NewOrderRepository(db *gorm.DB) OrderRepository {
	return &orderRepository{db: db}
}

func (r *orderRepository) FindAll() ([]models.Orders, error) {
	var orders []models.Orders

	err := r.db.Preload("OrderItems").Find(&orders).Error
	return orders, err
}
