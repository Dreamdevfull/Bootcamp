package dto

type CheckoutRequest struct {
	ProductID       uint   `json:"product_id" validate:"required"`
	Quantity        int    `json:"quantity" validate:"required,min=1"`
	CustomerName    string `json:"customer_name" validate:"required"`
	CustomerPhone   string `json:"customer_phone" validate:"required,len=10"`
	ShippingAddress string `json:"shipping_address" validate:"required"`
}

type CheckoutResponse struct {
	OrderNumber string `json:"order_number"`
	Message     string `json:"message"`
}
