package dto

type AddProductToShopRequest struct {
	ShopID    uint    `json:"shop_id" binding:"required"`
	ProductID uint    `json:"product_id" binding:"required"`
	Price     float64 `json:"price" binding:"required"`
}

type UpdatePriceRequest struct {
	ID             uint    `json:"id" binding:"required"`
	ResellingPrice float64 `json:"reselling_price" binding:"required"`
}
type ResellerOrderResponse struct {
	OrderNumber  string  `json:"order_number"`  // เลขออเดอร์
	CustomerName string  `json:"customer_name"` // ชื่อลูกค้า
	ItemsSummary string  `json:"items"`         // สินค้า / จำนวน
	TotalAmount  float64 `json:"total_amount"`  // ยอดรวม
	MyProfit     float64 `json:"my_profit"`     // กำไรของฉัน
	Status       string  `json:"status"`        // สถานะ (รอจัดส่ง/ฯลฯ)
}
