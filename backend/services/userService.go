package services

import (
	"errors"
	"strconv"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type UserService interface {
	GetResellers() ([]models.Users, error)
	UpdateResellerStatus(id string, status string) error
	GetUserRoleAndShop(userID uint) (*dto.UserShopInfo, error)
	GetAllActiveResellers() ([]models.Users, error)
}

type userService struct {
	userRepo   repositorys.UserRepository
	walletRepo repositorys.WalletRepository
}

func NewUserService(r repositorys.UserRepository, w repositorys.WalletRepository) UserService {
	return &userService{
		userRepo:   r,
		walletRepo: w,
	}
}

func (s *userService) GetResellers() ([]models.Users, error) {
	return s.userRepo.FindResellers()
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

	err := s.userRepo.UpdateStatus(id, status)
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

			return s.walletRepo.CreateWallet(&newWallet)
		}
	}

	return nil
}

func (s *userService) GetUserRoleAndShop(userID uint) (*dto.UserShopInfo, error) {

	return s.userRepo.GetUserRoleAndShop(userID)
}

func (s *userService) GetAllActiveResellers() ([]models.Users, error) {
	resellers, err := s.userRepo.GetResellers()
	if err != nil {
		return nil, err
	}
	return resellers, nil
}
