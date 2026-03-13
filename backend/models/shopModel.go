package models

import "time"

type Shop struct {
	Id        uint   `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	User_id   int    `json:"user_id" gorm:"ForeignKey:User_id;UniqueIndex:idx_user_id;not null"`
	Shop_name string `json:"shop_name" gorm:"type:VARCHAR(255)"`
	Shop_slug string `json:"shop_slug" gorm:"type:VARCHAR(255);uniqueIndex:idx_shop_slug;not null"`
}

type Products struct {
	Id          uint      `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Name        string    `json:"name" gorm:"type:VARCHAR(255)"`
	Description string    `json:"description" gorm:"type:TEXT"`
	Image_url   string    `json:"image_url" gorm:"type:VARCHAR(500)"`
	Cost_price  float64   `json:"cost_price" gorm:"type:decimal(10,2)"`
	Min_price   float64   `json:"min_price" gorm:"type:decimal(10,2)"`
	Stock       int       `json:"stock" gorm:"type:INT(10) ; DEFAULT:0"`
	Created_at  time.Time `json:"created_at"`
}

type ShopProducts struct {
	Id            uint    `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Shop_id       int     `json:"shop_id" gorm:"ForeignKey:Shop_id;not null"`
	Product_id    int     `json:"product_id" gorm:"ForeignKey:Product_id;not null"`
	Selling_price float64 `json:"selling_price" gorm:"type:decimal(10,2)"`
}

type Orders struct {
	Id               uint      `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Order_number     string    `json:"order_number" gorm:"type:VARCHAR(50);uniqueIndex:idx_order_number;not null"`
	Shop_id          int       `json:"shop_id" gorm:"ForeignKey:Shop_id;not null"`
	Customer_name    string    `json:"customer_name" gorm:"type:VARCHAR(255)"`
	Customer_phone   string    `json:"customer_phone" gorm:"type:VARCHAR(20)"`
	Shipping_address string    `json:"shipping_address" gorm:"type:TEXT"`
	Total_amount     float64   `json:"total_amount" gorm:"type:decimal(10,2)"`
	Status           string    `json:"status" gorm:"type:ENUM('pending','shipped', 'completed')"`
	Created_at       time.Time `json:"created_at" gorm:"autoCreateTime"`
}

type OrderItems struct {
	Id            uint    `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Order_id      int     `json:"order_id" gorm:"ForeignKey:Order_id;not null"`
	Product_id    int     `json:"product_id" gorm:"ForeignKey:Product_id;not null"`
	Product_name  string  `json:"product_name" gorm:"type:VARCHAR(255)"`
	Cost_price    float64 `json:"cost_price" gorm:"type:decimal(10,2)"`
	Selling_price float64 `json:"selling_price" gorm:"type:decimal(10,2)"`
	Quantity      int     `json:"quantity" gorm:"type:INT(10)"`
}
