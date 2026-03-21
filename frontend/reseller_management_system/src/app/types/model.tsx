// admin
export interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
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

export interface ShopStats {
  data: {
    total_sales: number;
    total_profit: number;
    total_orders: number;
    pending_orders: number;
    completed_orders: number;
    updated_at: string;
  };
  status: string;
}

export interface Approval {
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
  is_added: boolean;
  is_mine: boolean; 
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
    create_at: string
  }
  selling_price: number
}

export interface OrderReseller {
  order_id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string; 
  shipping_address: string;
  items: {
    product_name: string;
    image_url: string;
    quantity: number;
    price: number;

  }[];
  total_amount: number;
  my_profit: number;
  created_at: string;
  status: string;
}

export interface Wallet {
  history: {
    id: number;
    wallet_id: number;
    order_id: number;
    amount: number;
    created_at: string;
  }[]
  pending_amount: number;
  received_amount: number;
  total_profit: number;
}

export interface AddProductToShopRequest {
  product_id: number;
  selling_price: number;
}

export interface Getshop {
  shop_name: string
  products: {
    product_id: number;
    product_name: string;
    description: string;
    image_url: string;
    selling_price: number;
    stock: number;
  }[]
}
