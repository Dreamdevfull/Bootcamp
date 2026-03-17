package models

import "time"

type Shops struct {
	Id        uint   `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	User_id   int    `json:"users_id" gorm:"ForeignKey:users_id"`
	Shop_name string `json:"shop_name"`
	Shop_slug string `json:"shop_slug" gorm:"uniqueIndex:idx_shop_slug;not null"`
}

type Products struct {
	Id          uint      `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Image       string    `gorm:"column:image_url"`
	Cost_price  float64   `json:"cost_price" gorm:"type:decimal(10,2)"`
	Min_price   float64   `json:"min_price" gorm:"type:decimal(10,2)"`
	Stock       int       `json:"stock" gorm:"type:int;default:0"`
	Create_at   time.Time `gorm:"column:created_at"`
}

type ShopProducts struct {
	Id            uint     `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Shop_id       uint     `json:"shop_id" gorm:"not null;column:shop_id"`
	Shop          Shops    `json:"-" gorm:"foreignKey:Shop_id;references:Id"`
	Products_id   uint     `json:"product_id" gorm:"not null;column:product_id"`
	Product       Products `json:"-" gorm:"foreignKey:Products_id;references:Id"`
	Selling_price float64  `json:"selling_price" gorm:"type:decimal(10,2);column:selling_price"`
}
