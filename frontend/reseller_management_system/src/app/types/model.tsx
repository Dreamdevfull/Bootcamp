export interface Catalog {
  id: number
  name: string
  description: string
  image_url: string
  cost_price: number
  min_price: number
  stock: number
  Create_at: string
}

export interface ShopProducts {
  id: number
  shop_id: number
  shop: {
    id: number
    users_id: number
    shop_name: string
    shop_slug: string
  }
  product_id: number
  product: {
    id: number
    name: string
    description: string
    image_url: string
    cost_price: number
    min_price: number
    stock: number
    Create_at: string
  }
  selling_price: number
}