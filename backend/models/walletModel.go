package models

import "time"

type Wallet struct {
	Id      uint    `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	User_id int     `json:"user_id" gorm:"ForeignKey:User_id;UniqueIndex:idx_user_id;not null"`
	Balance float64 `json:"balance" gorm:"type:decimal(10,2)"`
}

type WalletLog struct {
	Id        uint      `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Wallet_id int       `json:"wallet_id" gorm:"ForeignKey:Wallet_id"`
	Order_id  int       `json:"order_id" gorm:"ForeignKey:Order_id"`
	Amount    float64   `json:"amount" gorm:"type:decimal(10,2)"`
	Create_at time.Time `json:"created_at"`
}
