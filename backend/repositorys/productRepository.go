package repositorys

import (
	"time"

	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type ProductRepository interface {
	Create(product *models.Products) error
	GetProducts() ([]models.Products, error)
	FindByID(id uint) (*models.Products, error)
	Update(product *models.Products) error
	UpdateStock(productID uint, quantity int) error
	HasActiveOrder(productID uint) (bool, error)
	Delete(product *models.Products) error
	GetProductForCheckout(shopID uint, productID uint) (*models.ShopProducts, error)
	Restore(id uint) error
	HardDeleteOldRecords(days int) error
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

func (r *productRepository) UpdateStock(productID uint, quantity int) error {

	return r.db.Model(&models.Products{}).
		Where("id = ?", productID).
		Update("stock", gorm.Expr("stock + ?", quantity)).Error
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
func (r *productRepository) GetDeletedProducts() ([]models.Products, error) {
	var products []models.Products
	err := r.db.Unscoped().Where("deleted_at IS NOT NULL").Find(&products).Error
	return products, err
}
func (r *productRepository) Restore(id uint) error {
	// ต้อง Unscoped() เพื่อให้ GORM หาข้อมูลที่ถูกลบเจอ แล้วเซต deleted_at เป็น null
	return r.db.Unscoped().Model(&models.Products{}).Where("id = ?", id).Update("deleted_at", nil).Error
}

func (r *productRepository) HardDeleteOldRecords(days int) error {
	limitDate := time.Now().AddDate(0, 0, -days)
	// ต้อง Unscoped() เพื่อสั่ง DELETE จริงๆ ออกจากฐานข้อมูล
	return r.db.Unscoped().Where("deleted_at <= ?", limitDate).Delete(&models.Products{}).Error
}

func (r *productRepository) GetProductForCheckout(shopID uint, productID uint) (*models.ShopProducts, error) {
	var shopProduct models.ShopProducts

	err := r.db.Preload("Product").
		Where("shop_id = ? AND product_id = ?", shopID, productID).
		First(&shopProduct).Error

	return &shopProduct, err
}
