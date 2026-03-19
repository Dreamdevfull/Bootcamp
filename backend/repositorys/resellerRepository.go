package repositorys

import (
	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type ResellerRepository interface {
	GetCatalog() ([]models.Products, error)
	GetCatalogWithStatus(shopID uint, productID uint) ([]dto.ProductCatalogResponse, error)
	UpsertShopProduct(data *models.ShopProducts) error
	GetShopByUserID(userID uint) (models.Shops, error)
	GetProductsByID(id uint) (models.Products, error)
	AddProductToShop(shopProduct *models.ShopProducts) error
	GetMyShopProducts(shopID uint) ([]models.ShopProducts, error)
	GetShopProductByID(id uint) (models.ShopProducts, error)
	UpdatePrice(shopProductID uint, resellingPrice float64) error
	DeleteFromShop(shopID uint, productID uint) error
	HasActiveOrder(productID uint, shopID uint) (bool, error)
	GetMyOrders(userID uint) ([]models.Orders, error)
	// GetWalletByUserID(userID uint) (*models.Wallet, error)
	// CreateWallet(wallet *models.Wallet) error
	GetProductOwner(productID uint) (uint, error)
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
	err := r.db.Debug().Preload("Product").Where("shop_id = ?", shopID).Find(&myProducts).Error
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

// func (r *productRepository) DeleteFromShop(shopID uint, productID uint) error {
// 	return r.db.Unscoped().
// 		Where("shop_id = ? AND product_id = ?", shopID, productID).
// 		Delete(&models.ShopProducts{}).Error
// }

func (r *resellerRepository) DeleteFromShop(shopID uint, productID uint) error {
	return r.db.Unscoped().
		Where("shop_id = ? AND product_id = ?", shopID, productID).
		Delete(&models.ShopProducts{}).Error
}

func (r *resellerRepository) HasActiveOrder(productID uint, shopID uint) (bool, error) {
	var count int64
	err := r.db.Table("order_items").
		Joins("JOIN orders ON orders.id = order_items.order_id").
		Where("order_items.product_id = ? AND orders.shop_id = ? AND orders.status != ?", productID, shopID, "completed").
		Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (r *resellerRepository) GetMyOrders(userID uint) ([]models.Orders, error) {
	var orders []models.Orders
	// Preload OrderItems เพื่อเอาไปคำนวณกำไร และ Preload Product เพื่อเอาชื่อสินค้า
	err := r.db.Model(&models.Orders{}).
		Preload("OrderItems.Product").                    // ดึงข้อมูลสินค้ามาเพื่อใช้คำนวณกำไรและแสดงชื่อ
		Joins("JOIN shops ON shops.id = orders.shop_id"). // เชื่อมกับตารางร้านค้า
		Where("shops.user_id = ?", userID).               // กรองเฉพาะร้านที่เป็นของ User คนนี้
		Order("orders.created_at DESC").
		Find(&orders).Error

	return orders, err

}

// func (r *resellerRepository) GetWalletByUserID(userID uint) (*models.Wallet, error) {
// 	var wallet models.Wallet

// 	err := r.db.Preload("WalletLogs.Order").Where("user_id = ?", userID).First(&wallet).Error

// 	if err != nil {
// 		return nil, err
// 	}
// 	return &wallet, nil
// }

// func (r *resellerRepository) CreateWallet(wallet *models.Wallet) error {
// 	return r.db.Create(wallet).Error
// }

func (r *resellerRepository) GetCatalogWithStatus(shopID uint, productID uint) ([]dto.ProductCatalogResponse, error) {
	var results []dto.ProductCatalogResponse

	query := r.db.Table("products").
		Select(`
            products.id, 
            products.name, 
            products.image_url, 
            products.min_price, 
            products.cost_price, 
            products.stock,
            (SELECT COUNT(*) FROM shop_products WHERE product_id = products.id) > 0 as is_added,
            (SELECT COUNT(*) FROM shop_products WHERE product_id = products.id AND shop_id = ?) > 0 as is_mine,
            (SELECT selling_price FROM shop_products WHERE product_id = products.id AND shop_id = ? LIMIT 1) as my_current_price
        `, shopID, shopID).
		Where("products.deleted_at IS NULL")

	if productID != 0 {
		query = query.Where("products.id = ?", productID)
	}

	err := query.Scan(&results).Error
	return results, err
}

func (r *resellerRepository) UpsertShopProduct(data *models.ShopProducts) error {
	var existing models.ShopProducts

	// 1. ลองหาดูว่ามีอยู่แล้วไหม
	err := r.db.Where("shop_id = ? AND product_id = ?", data.Shop_id, data.Products_id).First(&existing).Error

	if err == nil {
		// 2. ถ้าเจอ (err เป็น nil) ให้ Update ราคา
		return r.db.Model(&existing).Update("selling_price", data.Selling_price).Error
	}

	// 3. ถ้าไม่เจอ ให้ Create ใหม่
	return r.db.Create(data).Error
}
func (r *resellerRepository) GetShopByUserID(userID uint) (models.Shops, error) {
	var shop models.Shops
	// ค้นหาในตาราง shops โดยใช้ user_id
	err := r.db.Where("user_id = ?", userID).First(&shop).Error
	return shop, err
}
func (r *resellerRepository) GetProductOwner(productID uint) (uint, error) {
	var shopID uint
	// ค้นหา shop_id ที่ครอบครอง product_id นี้อยู่
	err := r.db.Table("shop_products").
		Select("shop_id").
		Where("product_id = ?", productID).
		Row().Scan(&shopID)

	// ถ้าไม่เจอ (เช่น สินค้ายังว่าง) GORM จะคืน error "sql: no rows in result set"
	return shopID, err
}
