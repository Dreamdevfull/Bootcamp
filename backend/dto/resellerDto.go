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
