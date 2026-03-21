package dto

import "time"

type DashboardStats struct {
	TotalSales      float64   `json:"total_sales"`
	TotalProfit     float64   `json:"total_profit"`
	TotalOrders     int       `json:"total_orders"`
	PendingOrders   int       `json:"pending_orders"`   // กำลังดำเนินการ (รอจ่ายเงิน)
	CompletedOrders int       `json:"completed_orders"` // สำเร็จแล้ว (ส่งแล้ว/สำเร็จ)
	UpdatedAt       time.Time `json:"updated_at"`
}
