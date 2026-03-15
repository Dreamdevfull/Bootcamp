package repositorys

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type ShopRepository interface {
	FindByName(name string) (*models.Shops, error)
	Create(shop *models.Shops) error
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
