package repositorys

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type OrderRepository interface {
	FindAll() ([]models.Orders, error)
	UpdateStatus(orderID int, status string) error
	FindByID(id int) (*models.Orders, error)
	GetItemsByOrderID(orderID int) ([]models.OrderItems, error)
	CreateOrderWithItems(order *models.Orders, items []models.OrderItems) error
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

func (r *orderRepository) UpdateStatus(orderID int, status string) error {
	return r.db.Model(&models.Orders{}).Where("id = ?", orderID).Update("status", status).Error
}

func (r *orderRepository) FindByID(id int) (*models.Orders, error) {
	var order models.Orders

	err := r.db.First(&order, id).Error
	return &order, err
}

func (r *orderRepository) GetItemsByOrderID(orderID int) ([]models.OrderItems, error) {
	var items []models.OrderItems

	err := r.db.Where("order_id = ?", orderID).Find(&items).Error
	return items, err
}

func (r *orderRepository) CreateOrderWithItems(order *models.Orders, items []models.OrderItems) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		// บันทึก Order หลักก่อน
		if err := tx.Create(order).Error; err != nil {
			return err
		}

		// วนลูปบันทึก OrderItems โดยผูกกับ Order ID ที่เพิ่งสร้าง
		for i := range items {
			items[i].Order_id = int(order.Id) // เชื่อม FK
			if err := tx.Create(&items[i]).Error; err != nil {
				return err
			}
		}
		return nil
	})
}
