package dto

type AddProductRequest struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	ImageURL    string  `json:"image_url"`
	CostPrice   float64 `json:"cost_price"`
	MinPrice    float64 `json:"min_price"`
	Stock       int     `json:"stock"`
}
type ProductResponse struct {
	ID          uint    `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	ImageURL    string  `json:"image_url"`
	CostPrice   float64 `json:"cost_price"`
	MinPrice    float64 `json:"min_price"`
	Stock       int     `json:"stock"`
}

type UpdateProductRequest struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	ImageURL    string  `json:"image_url"`
	CostPrice   float64 `json:"cost_price"`
	MinPrice    float64 `json:"min_price"`
	Stock       int     `json:"stock"`
}
