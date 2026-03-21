package dto

type RegisterRequest struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Password  string `json:"password"`
	Shop_name string `json:"shop_name"`
	Address   string `json:"address"`
}

type RegisterResponse struct {
	Message string `json:"message"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Message string      `json:"message"`
	Token   string      `json:"token"`
	User    UserSummary `json:"user"`
}

type UserSummary struct {
	ID     uint   `json:"id"`
	Name   string `json:"name"`
	Role   string `json:"role"`
	Status string `json:"status"`
}

type LogoutResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}
