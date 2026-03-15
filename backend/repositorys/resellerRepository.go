package repositorys

import (
	"errors"

	"github.com/Dreamdevfull/Bootcamp/models"
	"gorm.io/gorm"
)

type ResellerRepository interface {
	FindResellers() ([]models.Users, error)
	UpdateStatus(id string, status string) error
}

func (r *resellerRepository) Create(user *models.Users) error {
	panic("unimplemented")
}

func (r *resellerRepository) FindByEmail(email string) (*models.Users, error) {
	panic("unimplemented")
}

type resellerRepository struct {
	db *gorm.DB
}

func NewResellerRepository(db *gorm.DB) ResellerRepository {
	return &resellerRepository{db}
}

func (r *resellerRepository) FindResellers() ([]models.Users, error) {
	var resellers []models.Users

	err := r.db.Select("id", "name", "email", "phone", "status", "address", "created_at").
		Where("role = ?", "reseller").
		Find(&resellers).Error

	return resellers, err
}

func (r *resellerRepository) UpdateStatus(id string, status string) error {
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
