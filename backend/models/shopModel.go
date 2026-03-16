package models

import "time"

type Shops struct {
	Id        uint   `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	User_id   int    `json:"user_id"`
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
	Stock       int       `json:"stock"`
	Create_at   time.Time `gorm:"column:created_at"`
}

type ShopProducts struct {
	Id            uint    `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Shop_id       int     `json:"shop_id" gorm:"ForeignKey:Shop_id"`
	Products_id   int     `json:"products_id" gorm:"ForeignKey:Products_id"`
	Selling_price float64 `json:"selling_price" gorm:"type:decimal(10,2);column:selling_price"`
}
