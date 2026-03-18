package repositorys

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type ShopRepository interface {
	FindByName(name string) (*models.Shops, error)
	Create(shop *models.Shops) error
	GetBySlug(slug string) (*models.Shops, error)
	GetShopProducts(shopId uint) ([]models.ShopProducts, error)
	GetShopProductsByShopID(shopID uint) ([]models.ShopProducts, error)
	GetByID(id uint) (*models.Shops, error)
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

func (r *shopRepository) GetBySlug(slug string) (*models.Shops, error) {
	if slug == "" {
		return nil, gorm.ErrRecordNotFound
	}

	var shop models.Shops
	err := r.db.Where("shop_slug = ?", slug).First(&shop).Error
	return &shop, err
}

func (r *shopRepository) GetShopProducts(shopId uint) ([]models.ShopProducts, error) {
	var products []models.ShopProducts
	err := r.db.Where("shop_id = ?", shopId).Find(&products).Error
	return products, err
}
func (r *shopRepository) GetShopProductsByShopID(shopID uint) ([]models.ShopProducts, error) {
	var shopProducts []models.ShopProducts

	err := r.db.Where("shop_id = ?", shopID).Find(&shopProducts).Error
	return shopProducts, err
}

func (r *shopRepository) GetByID(id uint) (*models.Shops, error) {
	var shop models.Shops
	err := r.db.First(&shop, id).Error
	return &shop, err
}
