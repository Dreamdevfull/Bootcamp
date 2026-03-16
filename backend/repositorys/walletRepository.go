package repositorys

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type WalletRepository interface {
	AddBalance(userID int, amount float64) error
}

type walletRepository struct {
	db *gorm.DB
}

func NewWalletRepository(db *gorm.DB) WalletRepository {
	return &walletRepository{db: db}
}

func (r *walletRepository) AddBalance(userID int, amount float64) error {

	return r.db.Model(&models.Wallet{}).Where("user_id = ? ", userID).Update("balance", gorm.Expr("balance + ?", amount)).Error
}
