package models

import "time"

type Shop struct {
	Id        uint   `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	User_id   int    `json:"user_id"`
	Shop_name string `json:"shop_name"`
	Shop_slug string `json:"shop_slug" gorm:"uniqueIndex:idx_shop_slug;not null"`
}

type Products struct {
	Id          uint      `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Image       string    `json:"image"`
	Cost_price  float64   `json:"cost_price" gorm:"type:decimal(10,2)"`
	Min_price   float64   `json:"min_price" gorm:"type:decimal(10,2)"`
	Stock       int       `json:"stock"`
	Create_at   time.Time `json:"created_at"`
}

type ShopProducts struct {
	Id            uint    `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Shop_id       int     `json:"shop_id" gorm:"ForeignKey:Shop_id"`
	Products_id   int     `json:"products_id" gorm:"ForeignKey:Products_id"`
	Selling_price float64 `json:"selling_price" gorm:"type:decimal(10,2)"`
}

type Orders struct {
	Id               uint      `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Order_number     string    `json:"order_number" gorm:"uniqueIndex:idx_order_number;not null"`
	Shop_id          int       `json:"shop_id" gorm:"ForeignKey:Shop_id"`
	Customer_name    string    `json:"customer_name"`
	Customer_phone   string    `json:"customer_phone"`
	Shipping_address string    `json:"shipping_address"`
	Total_amount     float64   `json:"total_amount" gorm:"type:decimal(10,2)"`
	Reseller_profit  float64   `json:"reseller_profit" gorm:"type:decimal(10,2)"`
	Staus            string    `json:"status" gorm:"type:ENUM('pending', 'shipped', 'completed')"`
	Create_at        time.Time `json:"created_at"`
}

type OrderItems struct {
	Id            uint    `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Order_id      int     `json:"order_id" gorm:"ForeignKey:Order_id"`
	Products_id   int     `json:"products_id" gorm:"ForeignKey:Products_id"`
	Products_name string  `json:"products_name"`
	Cost_price    float64 `json:"cost_price" gorm:"type:decimal(10,2)"`
	Selling_price float64 `json:"selling_price" gorm:"type:decimal(10,2)"`
	Quantity      int     `json:"quantity"`
}
