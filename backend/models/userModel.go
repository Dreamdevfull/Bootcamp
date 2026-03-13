package models

import "time"

type User struct {
	Id        uint      `json:"id" gorm:"type:INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;primaryKey"`
	Name      string    `json:"name"`
	Email     string    `json:"email" gorm:"uniqueIndex:idx_email;not null"`
	Password  string    `json:"password"`
	Phone     string    `json:"phone"`
	Role      string    `json:"role" gorm:"type:ENUM('admin', 'reseller')"`
	Status    string    `json:"status" gorm:"type:ENUM('pending', 'approved', 'rejected')"`
	Address   string    `json:"address"`
	Create_at time.Time `json:"created_at"`
}
