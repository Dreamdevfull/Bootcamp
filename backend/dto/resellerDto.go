package dto

type ProductCatalogResponse struct {
	ID             uint    `json:"id"`
	Name           string  `json:"name"`
	ImageURL       string  `json:"image_url"`
	MinPrice       float64 `json:"min_price"`
	CostPrice      float64 `json:"cost_price"`
	Stock          int     `json:"stock"`
	IsAdded        bool    `json:"is_added"`         // ใช้เช็คเพื่อเปลี่ยนปุ่ม เพิ่ม/แก้ไข
	IsMine         bool    `json:"is_mine"`          // เราเป็นเจ้าของใช่ไหม (True/False)
	MyCurrentPrice float64 `json:"my_current_price"` // ราคาที่ร้านเราตั้งขายอยู่
}

type AddProductToShopRequest struct {
	ProductID     uint    `json:"product_id" binding:"required"`
	Selling_Price float64 `json:"selling_price" binding:"required"`
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
