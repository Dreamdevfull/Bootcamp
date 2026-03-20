// app/shop/[shop_slug]/layout.tsx
import { CartProvider } from "@/app/components/cradcustomer/cartcontext"

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}