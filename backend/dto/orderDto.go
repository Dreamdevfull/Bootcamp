package dto

type CartItem struct {
	ProductID uint `json:"product_id"`
	Quantity  int  `json:"quantity"`
}

type CheckoutRequest struct {
	Items           []CartItem `json:"items"` // รองรับสินค้าหลายชนิด
	CustomerName    string     `json:"customer_name"`
	CustomerPhone   string     `json:"customer_phone"`
	ShippingAddress string     `json:"shipping_address"`
}
type CheckoutResponse struct {
	OrderNumber string `json:"order_number"`
	Message     string `json:"message"`
}
