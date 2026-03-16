package services

// type ResellerService interface {
// 	GetResellers() ([]models.Users, error)
// 	UpdateResellerStatus(id string, status string) error
// }

// type resellerService struct {
// 	resellerRepo repositorys.ResellerRepository
// }

// func NewResellerService(r repositorys.ResellerRepository) ResellerService {
// 	return &resellerService{resellerRepo: r}
// }

// func (s *resellerService) GetResellers() ([]models.Users, error) {
// 	return s.resellerRepo.FindResellers()
// }

// func (s *resellerService) UpdateResellerStatus(id string, status string) error {
// 	validStatuses := map[string]bool{
// 		"pending":  true,
// 		"approved": true,
// 		"rejected": true,
// 	}

// 	if !validStatuses[status] {
// 		return errors.New("invalid status: must be pending, approved, or rejected")
// 	}

// 	return s.resellerRepo.UpdateStatus(id, status)
// }
