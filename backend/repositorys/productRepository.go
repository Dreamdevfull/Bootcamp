package repositorys

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type ProductRepository interface {
	Create(product *models.Products) error
	GetProducts() ([]models.Products, error)
	FindByID(id uint) (*models.Products, error)
	Update(product *models.Products) error
	HasActiveOrder(productID uint) (bool, error)
	Delete(product *models.Products) error
}

type productRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepository{db}
}

func (r *productRepository) Create(product *models.Products) error {
	return r.db.Create(product).Error
}

func (r *productRepository) GetProducts() ([]models.Products, error) {

	var products []models.Products

	result := r.db.Order("id desc").Find(&products)

	if result.Error != nil {
		return nil, result.Error
	}

	return products, nil
}

func (r *productRepository) FindByID(id uint) (*models.Products, error) {

	var product models.Products

	result := r.db.First(&product, id)

	if result.Error != nil {
		return nil, result.Error
	}

	return &product, nil
}
func (r *productRepository) Update(product *models.Products) error {

	return r.db.Save(product).Error
}

func (r *productRepository) HasActiveOrder(productID uint) (bool, error) {

	var count int64

	err := r.db.
		Table("order_items").
		Joins("JOIN orders ON orders.id = order_items.order_id").
		Where("order_items.product_id = ? AND orders.status != ?", productID, "completed").
		Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (r *productRepository) Delete(product *models.Products) error {

	return r.db.Delete(product).Error
}
