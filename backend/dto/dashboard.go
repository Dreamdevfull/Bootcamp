package dto

import "time"

type DashboardStats struct {
	TotalSales      float64   `json:"total_sales"`
	TotalProfit     float64   `json:"total_profit"`
	TotalOrders     int       `json:"total_orders"`
	PendingOrders   int       `json:"pending_orders"`
	CompletedOrders int       `json:"completed_orders"`
	UpdatedAt       time.Time `json:"updated_at"`
}
