package repositorys

import (
	"errors"

	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type UserRepository interface {
	FindByEmail(email string) (*models.Users, error)
	Create(user *models.Users) error
	FindResellers() ([]models.Users, error)
	UpdateStatus(id string, status string) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db}
}

func (r *userRepository) FindByEmail(email string) (*models.Users, error) {

	var user models.Users

	err := r.db.Where("email = ?", email).First(&user).Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *userRepository) Create(user *models.Users) error {
	return r.db.Create(user).Error
}

func (r *userRepository) FindResellers() ([]models.Users, error) {
	var resellers []models.Users

	err := r.db.Select("id", "name", "email", "phone", "role", "status", "address", "created_at").
		Where("role = ?", "reseller").
		Find(&resellers).Error

	return resellers, err
}

func (r *userRepository) UpdateStatus(id string, status string) error {
	result := r.db.Model(&models.Users{}).
		Where("id = ? AND role = ?", id, "reseller").
		Update("status", status)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("reseller not found or no changes made")
	}

	return nil
}
