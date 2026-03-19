package controllers

import (
	"strconv"

	"github.com/Dreamdevfull/Bootcamp/dto"
	"github.com/Dreamdevfull/Bootcamp/services"
	"github.com/gofiber/fiber/v3"
)

type OrderController struct {
	service     services.OrderService
	shopService services.ShopService
}

func NewOrderController(service services.OrderService, shopService services.ShopService) *OrderController {
	return &OrderController{service: service, shopService: shopService}
}

func (ctrl *OrderController) GetOrders(c fiber.Ctx) error {
	orders, err := ctrl.service.GetOrders()

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "can not get orders",
		})
	}

	return c.JSON(fiber.Map{
		"status": "success",
		"data":   orders,
	})
}

func (ctrl *OrderController) QuickComplete(c fiber.Ctx) error {
	idStr := c.Params("id")

	idInt, err := strconv.Atoi(idStr)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "ID format is invalid"})
	}

	if err := ctrl.service.QuickComplete(idInt); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "order " + idStr + " completed",
	})
}

// controllers/order_controller.go

// func (oc *OrderController) AddToCart(c fiber.Ctx) error {
// 	slug := c.Params("shop_slug")
// 	var req dto.CartItem

// 	if err := c.Bind().Body(&req); err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": "ข้อมูลไม่ถูกต้อง"})
// 	}

// 	item, err := oc.service.AddItemToCart(slug, req)
// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
// 	}

// 	// ส่งข้อมูลสินค้าที่เตรียมไว้กลับไปให้ลูกค้า (เพื่อไปแสดงในหน้าตะกร้า)
// 	return c.JSON(fiber.Map{
// 		"message": "เพิ่มสินค้าลงตะกร้าแล้ว",
// 		"item":    item,
// 	})
// }

// func (oc *OrderController) Checkout(c fiber.Ctx) error {
// 	slug := c.Params("shop_slug")
// 	var req dto.CheckoutRequest
// 	if err := c.Bind().Body(&req); err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": "ข้อมูลไม่ถูกต้อง"})
// 	}

// 	res, err := oc.service.ProcessCheckout(slug, req)
// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
// 	}

// 	return c.JSON(res)
// }

// // (แถม) สำหรับ Route: POST /shop/:slug/validate-cart (เช็คยอดก่อนจ่าย)
// func (oc *OrderController) ValidateCart(c fiber.Ctx) error {
// 	slug := c.Params("shop_slug")
// 	var req struct {
// 		Items []dto.CartItem `json:"items"`
// 	}
// 	c.Bind().Body(&req)

// 	shop, _ := oc.shopService.GetShopBySlug(slug)
// 	_, total, profit, err := oc.service.PrepareCartItems(shop.Id, req.Items)

// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
// 	}

// 	return c.JSON(fiber.Map{
// 		"total_amount":    total,
// 		"reseller_profit": profit,
// 		"status":          "available",
// 	})
// }

func (oc *OrderController) Checkout(c fiber.Ctx) error {
	slug := c.Params("shop_slug")
	var req dto.CheckoutRequest
	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "ข้อมูลไม่ถูกต้อง"})
	}

	order, err := oc.service.ProcessCheckout(slug, req)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": err.Error()})
	}

	var itemDTOs []dto.OrderItemResponse
	for _, item := range order.OrderItems {
		itemDTOs = append(itemDTOs, dto.OrderItemResponse{
			ProductID:    item.Product_id,
			ProductName:  item.Product_name,
			SellingPrice: item.Selling_price,
			Quantity:     item.Quantity,
		})
	}

	response := dto.CheckoutResponse{
		Message:     "สร้างออเดอร์สำเร็จ กรุณาชำระเงิน",
		OrderID:     order.Id,
		TotalAmount: order.Total_amount,
		Items:       itemDTOs,
	}

	return c.JSON(response)
}

// POST /shop/:slug/payment/:order_id
func (oc *OrderController) SimulatePayment(c fiber.Ctx) error {
	orderID, _ := strconv.Atoi(c.Params("order_id"))

	order, err := oc.service.ConfirmPayment(uint(orderID))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": err.Error()})
	}

	// ส่งกลับตามหน้าสำเร็จในรูปภาพ image_2de080.png
	return c.JSON(fiber.Map{
		"status":       "success",
		"message":      "สั่งซื้อสำเร็จ!",
		"order_number": order.Order_number, // เลขออเดอร์ ORD-XXXX สำหรับติดตามสถานะ
		// "customer_name": order.Customer_name,
		"detail": "ร้านจะดำเนินการจัดส่งให้เร็วที่สุด",
	})
}
func (oc *OrderController) TrackOrder(c fiber.Ctx) error {
	var req struct {
		OrderNumber string `json:"order_number"`
	}

	// 2. Parse JSON เข้าไปใน req
	if err := c.Bind().Body(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "รูปแบบข้อมูลไม่ถูกต้อง"})
	}

	if req.OrderNumber == "" {
		return c.Status(400).JSON(fiber.Map{"message": "กรุณากรอกเลขออเดอร์"})
	}

	order, err := oc.service.GetOrderTracking(req.OrderNumber)
	if err != nil {

		return c.Status(404).JSON(fiber.Map{"message": "ไม่พบออเดอร์นี้"})
	}

	return c.JSON(fiber.Map{
		"order_number":     order.Order_number,
		"status":           translateStatus(order.Status), // แปลงเป็นไทยตามโจทย์
		"customer_name":    order.Customer_name,
		"shipping_address": order.Shipping_address,
		"total_amount":     order.Total_amount,
		"items":            order.OrderItems,
	})
}

// Helper function แปลงสถานะให้ลูกค้าอ่านง่าย
func translateStatus(status string) string {
	switch status {
	case "awaiting_payment":
		return "รอชำระเงิน"
	case "pending":
		return "ชำระเงินแล้ว (รอจัดส่ง)"
	case "shipped":
		return "จัดส่งแล้ว"
	case "completed":
		return "สำเร็จ"
	default:
		return "ไม่ทราบสถานะ"
	}
}
