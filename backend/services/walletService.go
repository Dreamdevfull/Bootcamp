package services

import (
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type WalletService interface {
	GetWalletByUserID(userID uint) (*models.Wallet, error)
}

type walletService struct {
	repo repositorys.WalletRepository
}

func NewWalletService(repo repositorys.WalletRepository) WalletService {
	return &walletService{repo: repo}
}

func (s *walletService) GetWalletByUserID(userID uint) (*models.Wallet, error) {

	return s.repo.GetWalletByUserID(userID)
}
