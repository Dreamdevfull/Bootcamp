// app/context/CartContext.tsx
"use client"
import { createContext, useContext, useState, ReactNode } from "react"

export type CartItem = {  // ✅ เพิ่ม export
  product_id: number
  product_name: string
  selling_price: number
  image_url: string
  stock: number
  description: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity">, quantity: number) => void
  removeFromCart: (product_id: number) => void
  updateQuantity: (product_id: number, quantity: number) => void
  totalItems: number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: Omit<CartItem, "quantity">, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.product_id === product.product_id)
      if (existing) {
        // ✅ ถ้ามีอยู่แล้วให้เพิ่มจำนวน
        return prev.map(i =>
          i.product_id === product.product_id
            ? { ...i, quantity: Math.min(i.stock, i.quantity + quantity) }
            : i
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (product_id: number) => {
    setItems(prev => prev.filter(i => i.product_id !== product_id))
  }

  const updateQuantity = (product_id: number, quantity: number) => {
    setItems(prev =>
      prev.map(i => i.product_id === product_id ? { ...i, quantity } : i)
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, totalItems, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}