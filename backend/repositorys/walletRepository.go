package repositorys

import (
	"time"

	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type WalletRepository interface {
	AddBalance(userID int, amount float64, orderID uint) error
	CreateWallet(wallet *models.Wallet) error
	GetWalletByUserID(userID uint) (*models.Wallet, error)
}

type walletRepository struct {
	db *gorm.DB
}

func NewWalletRepository(db *gorm.DB) WalletRepository {
	return &walletRepository{db: db}
}

func (r *walletRepository) AddBalance(userID int, amount float64, orderID uint) error {

	return r.db.Transaction(func(tx *gorm.DB) error {

		if err := tx.Model(&models.Wallet{}).
			Where("user_id = ?", userID).
			Update("balance", gorm.Expr("balance + ?", amount)).Error; err != nil {
			return err
		}

		var wallet models.Wallet
		if err := tx.Where("user_id = ?", userID).First(&wallet).Error; err != nil {
			return err
		}

		log := models.WalletLog{
			Wallet_id:  int(wallet.Id),
			Order_id:   int(orderID),
			Amount:     amount,
			Created_at: time.Now(),
		}

		if err := tx.Create(&log).Error; err != nil {
			return err
		}

		return nil
	})
}
func (r *walletRepository) CreateWallet(wallet *models.Wallet) error {
	return r.db.Create(wallet).Error
}

func (r *walletRepository) GetWalletByUserID(userID uint) (*models.Wallet, error) {
	var wallet models.Wallet

	err := r.db.Preload("WalletLogs.Order").Where("user_id = ?", userID).First(&wallet).Error

	if err != nil {
		return nil, err
	}
	return &wallet, nil
}
