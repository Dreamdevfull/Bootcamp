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
	CreateOrder(order *models.Orders) error
	FindOrderByID(id uint) (*models.Orders, error)
	UpdateOrderStatus(id uint, status string) error
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

func (r *orderRepository) CreateOrder(order *models.Orders) error {

	return r.db.Create(order).Error
}
func (r *orderRepository) FindOrderByID(id uint) (*models.Orders, error) {
	var order models.Orders
	// ใช้ Preload เพื่อดึงรายการสินค้าในออเดอร์ออกมาด้วย
	err := r.db.Preload("OrderItems").First(&order, id).Error
	return &order, err
}
func (r *orderRepository) UpdateOrderStatus(id uint, status string) error {
	return r.db.Model(&models.Orders{}).Where("id = ?", id).Update("status", status).Error
}
