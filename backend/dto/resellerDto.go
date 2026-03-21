package dto

type ProductCatalogResponse struct {
	ID             uint    `json:"id"`
	Name           string  `json:"name"`
	ImageURL       string  `json:"image_url" gorm:"column:image_url"`
	MinPrice       float64 `json:"min_price" gorm:"column:min_price"`
	CostPrice      float64 `json:"cost_price" gorm:"column:cost_price"`
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
	ID           uint    `json:"id" binding:"required"`
	SellingPrice float64 `json:"selling_price" binding:"required"`
}

//	type ResellerOrderResponse struct {
//		OrderID      uint              `json:"order_id"`
//		OrderNumber  string            `json:"order_number"`  // เลขออเดอร์
//		CustomerName string            `json:"customer_name"` // ชื่อลูกค้า
//		ItemsSummary []OrderItemDetail `json:"items"`         // สินค้า / จำนวน
//		TotalAmount  float64           `json:"total_amount"`  // ยอดรวม
//		MyProfit     float64           `json:"my_profit"`     // กำไรของฉัน
//		CreatedAt    string            `json:"created_at"`    // เวลาสั่งซื้อ
//		Status       string            `json:"status"`        // สถานะ (รอจัดส่ง/ฯลฯ)
//	}

type OrderItemDetail struct {
	ProductName string  `json:"product_name"`
	Quantity    int     `json:"quantity"`
	Price       float64 `json:"price"`
	ImageURL    string  `json:"image_url"`
}

type ResellerOrderResponse struct {
	OrderID         uint              `json:"order_id"`
	OrderNumber     string            `json:"order_number"`
	CustomerName    string            `json:"customer_name"`
	CustomerPhone   string            `json:"customer_phone"`   // 🚩 เติม
	ShippingAddress string            `json:"shipping_address"` // 🚩 เติม
	ItemsSummary    []OrderItemDetail `json:"items"`
	TotalAmount     float64           `json:"total_amount"`
	MyProfit        float64           `json:"my_profit"`
	CreatedAt       string            `json:"created_at"`
	Status          string            `json:"status"`
}
