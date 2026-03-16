package services

import (
	"errors"

	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/Dreamdevfull/Bootcamp/repositorys"
)

type UserService interface {
	GetResellers() ([]models.Users, error)
	UpdateResellerStatus(id string, status string) error
}

type userService struct {
	resellerRepo repositorys.UserRepository
}

func NewUserService(r repositorys.UserRepository) UserService {
	return &userService{resellerRepo: r}
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

	return s.resellerRepo.UpdateStatus(id, status)
}
