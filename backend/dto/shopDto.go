package dto

type ShopProductResponse struct {
	ProductID   uint    `json:"product_id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Image       string  `json:"image"`
	Price       float64 `json:"price"`
	Stock       int     `json:"stock"`
}

type ShopResponse struct {
	ShopName string                `json:"shop_name"`
	Products []ShopProductResponse `json:"products"`
}
