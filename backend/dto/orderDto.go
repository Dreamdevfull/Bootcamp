package dto

type CheckoutRequest struct {
	Items           []CartItem `json:"items" validate:"required"`
	CustomerName    string     `json:"customer_name" validate:"required"`
	CustomerPhone   string     `json:"customer_phone" validate:"required"`
	ShippingAddress string     `json:"shipping_address" validate:"required"`
}

type CartItem struct {
	ProductID uint `json:"product_id"`
	Quantity  int  `json:"quantity"`
}

type OrderItemResponse struct {
	ProductID    int     `json:"product_id"`
	ProductName  string  `json:"product_name"`
	SellingPrice float64 `json:"selling_price"`
	Quantity     int     `json:"quantity"`
}

// ตัวนี้สำหรับภาพรวมของออเดอร์
type CheckoutResponse struct {
	Message     string              `json:"message"`
	OrderID     uint                `json:"order_id"`
	TotalAmount float64             `json:"total_amount"`
	Items       []OrderItemResponse `json:"items"`
}
