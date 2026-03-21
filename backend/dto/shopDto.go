package dto

type ShopFrontResponse struct {
	ShopName string                `json:"shop_name"`
	Products []ShopProductResponse `json:"products"`
}

type ShopProductResponse struct {
	ProductID    uint    `json:"product_id"`
	ProductName  string  `json:"product_name"`
	Description  string  `json:"description"`
	ImageUrl     string  `json:"image_url"`
	SellingPrice float64 `json:"selling_price"`
	Stock        int     `json:"stock"`
}

// สำหรับให้ Reseller ดูข้อมูลร้านตัวเองใน Dashboard
type ResellerDashboardResponse struct {
	ShopName string `json:"shop_name"`
	ShopSlug string `json:"shop_slug"`
	ShopURL  string `json:"shop_url"`
}

type UserShopInfo struct {
	Role     string `json:"role"`
	ShopName string `json:"shop_name" gorm:"column:shop_name"`
}
