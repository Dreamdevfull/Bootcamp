package repositorys

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

// type ResellerRepository interface {
// 	FindResellers() ([]models.Users, error)
// 	UpdateStatus(id string, status string) error
// }

// func (r *resellerRepository) Create(user *models.Users) error {
// 	panic("unimplemented")
// }

// func (r *resellerRepository) FindByEmail(email string) (*models.Users, error) {
// 	panic("unimplemented")
// }

// type resellerRepository struct {
// 	db *gorm.DB
// }

// func NewResellerRepository(db *gorm.DB) ResellerRepository {
// 	return &resellerRepository{db}
// }

// func (r *resellerRepository) FindResellers() ([]models.Users, error) {
// 	var resellers []models.Users

// 	err := r.db.Select("id", "name", "email", "phone", "role", "status", "address", "created_at").
// 		Where("role = ?", "reseller").
// 		Find(&resellers).Error

// 	return resellers, err
// }

// func (r *resellerRepository) UpdateStatus(id string, status string) error {
// 	result := r.db.Model(&models.Users{}).
// 		Where("id = ? AND role = ?", id, "reseller").
// 		Update("status", status)

// 	if result.Error != nil {
// 		return result.Error
// 	}

// 	if result.RowsAffected == 0 {
// 		return errors.New("reseller not found or no changes made")
// 	}

// 	return nil
// }

type ResellerRepository interface {
	GetCatalog() ([]models.Products, error)
	GetProductsByID(id uint) (models.Products, error)
	AddProductToShop(shopProduct *models.ShopProducts) error
	GetMyShopProducts(shopID uint) ([]models.ShopProducts, error)
	GetShopProductByID(id uint) (models.ShopProducts, error)
	UpdatePrice(shopProductID uint, resellingPrice float64) error
}

type resellerRepository struct {
	db *gorm.DB
}

func NewResellerRepository(db *gorm.DB) ResellerRepository {
	return &resellerRepository{db}
}

func (r *resellerRepository) GetCatalog() ([]models.Products, error) {
	var products []models.Products
	err := r.db.Find(&products).Error

	return products, err
}

func (r *resellerRepository) GetProductsByID(id uint) (models.Products, error) {
	var product models.Products

	err := r.db.First(&product, id).Error

	return product, err

}

func (r *resellerRepository) AddProductToShop(shopProduct *models.ShopProducts) error {
	return r.db.Create(shopProduct).Error
}

func (r *resellerRepository) GetMyShopProducts(shopID uint) ([]models.ShopProducts, error) {
	var myProducts []models.ShopProducts
	err := r.db.Preload("Product").
		Where("shop_id = ?", shopID).
		Find(&myProducts).Error
	return myProducts, err
}

func (r *resellerRepository) GetShopProductByID(id uint) (models.ShopProducts, error) {
	var data models.ShopProducts
	err := r.db.Preload("Product").First(&data, id).Error
	return data, err
}

func (r *resellerRepository) UpdatePrice(shopProductID uint, newPrice float64) error {
	return r.db.Model(&models.ShopProducts{}).
		Where("id = ?", shopProductID).
		Update("selling_price", newPrice).Error
}
