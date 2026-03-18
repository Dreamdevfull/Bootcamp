// admin
export interface Product {
  id: number;
  name: string;
  description: string;
  Image: string;
  cost_price: number;
  min_price: number;
  stock: number;
  Create_at: string;
}

export interface Orders {
  id: number;
  order_number: string;
  shop: {
    id: number;
    users_id: number;
    shop_name: string;
    shop_slug: string;
  };
  customer_name: string;
  customer_phone: string;          
  shipping_address: string;
  total_amount: number;
  reseller_profit: number;
  status: string;
  created_at: string;
  order_items: {
    id: number;
    order_id: number;
    products_id: number;
    product_name: string;
    cost_price: number;
    selling_price: number;
    quantity: number;
  }[];
}

interface Approval {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  address: string;
  created_at: string;
}


// Reseller
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
