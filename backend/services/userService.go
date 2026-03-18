package services

import (
	"errors"
	"strconv"

	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type UserService interface {
	GetResellers() ([]models.Users, error)
	UpdateResellerStatus(id string, status string) error
}

type userService struct {
	resellerRepo repositorys.UserRepository
	walletRepo   repositorys.ResellerRepository
}

func NewUserService(r repositorys.UserRepository, w repositorys.ResellerRepository) UserService {
	return &userService{
		resellerRepo: r,
		walletRepo:   w,
	}
}

func (s *userService) GetResellers() ([]models.Users, error) {
	return s.resellerRepo.FindResellers()
}

func (s *userService) UpdateResellerStatus(id string, status string) error {
	validStatuses := map[string]bool{
		"pending":  true,
		"approved": true,
		"rejected": true,
	}

	if !validStatuses[status] {
		return errors.New("invalid status: must be pending, approved, or rejected")
	}

	err := s.resellerRepo.UpdateStatus(id, status)
	if err != nil {
		return err
	}

	if status == "approved" {
		userIDInt, _ := strconv.Atoi(id)
		userID := uint(userIDInt)

		_, err := s.walletRepo.GetWalletByUserID(userID)
		if err != nil {

			newWallet := models.Wallet{
				User_id: int(userID),
				Balance: 0,
			}
			// 🚩 มึงต้องมั่นใจนะว่าใน resellerRepo มีฟังก์ชัน CreateWallet แล้ว
			return s.walletRepo.CreateWallet(&newWallet)
		}
	}

	return nil
}
