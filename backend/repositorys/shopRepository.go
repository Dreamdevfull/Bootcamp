package repositorys

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type ShopRepository interface {
	FindByName(name string) (*models.Shops, error)
	Create(shop *models.Shops) error
	GetShopProducts(slug string) ([]models.Products, string, error)
	FindByUserID(userID interface{}) (*models.Shops, error)
}

type shopRepository struct {
	db *gorm.DB
}

func NewShopRepository(db *gorm.DB) ShopRepository {
	return &shopRepository{db}
}

func (r *shopRepository) FindByName(name string) (*models.Shops, error) {

	var shop models.Shops

	err := r.db.Where("shop_name = ?", name).First(&shop).Error

	if err != nil {
		return nil, err
	}

	return &shop, nil
}

func (r *shopRepository) Create(shop *models.Shops) error {
	return r.db.Create(shop).Error
}

func (r *shopRepository) GetShopProducts(slug string) ([]models.Products, string, error) {

	var shop models.Shops

	err := r.db.Where("shop_slug = ?", slug).First(&shop).Error
	if err != nil {
		return nil, "", err
	}

	var products []models.Products

	err = r.db.
		Joins("JOIN shop_products ON shop_products.products_id = products.id").
		Where("shop_products.shop_id = ?", shop.Id).
		Find(&products).Error

	return products, shop.Shop_name, err
}

func (r *shopRepository) FindByUserID(userID interface{}) (*models.Shops, error) {

	var shop models.Shops

	err := r.db.Where("user_id = ?", userID).First(&shop).Error
	if err != nil {
		return nil, err
	}

	return &shop, nil
}
