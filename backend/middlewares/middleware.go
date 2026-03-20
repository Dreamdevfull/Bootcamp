package middlewares

import (
	"fmt"
	"os"
	"strings"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(requiredRole string) fiber.Handler {
	return func(c fiber.Ctx) error { // เปลี่ยนเป็น *fiber.Ctx ตามมาตรฐาน Fiber

		// 1. ตรวจสอบชื่อ Cookie ให้ตรงกับตอน Login (เช่น "jwt")
		tokenString := c.Cookies("jwt")

		// 2. สำรองข้อมูล: ถ้าใน Cookie ไม่มี ให้เช็คที่ Header (เผื่อใช้เครื่องมือทดสอบ)
		if tokenString == "" {
			authHeader := c.Get("Authorization")
			if strings.HasPrefix(authHeader, "Bearer ") {
				tokenString = strings.TrimPrefix(authHeader, "Bearer ")
			}
		}

		if tokenString == "" {
			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized: Please login first"})
		}

		// 3. Parse Token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method")
			}
			// ตรวจสอบว่า Getenv ไม่เป็นค่าว่าง
			secret := os.Getenv("JWT_SECRET")
			if secret == "" {
				return nil, fmt.Errorf("JWT_SECRET is not set in environment")
			}
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired token"})
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid token claims"})
		}

		// 4. ตรวจสอบ Role
		role, _ := claims["role"].(string)
		if requiredRole != "" && role != requiredRole {
			return c.Status(403).JSON(fiber.Map{"error": "Forbidden: You do not have permission"})
		}

		// 5. ดึง User ID (จัดการเรื่อง Type ของ JSON number)
		var userID uint
		if idVal, ok := claims["user_id"]; ok {
			switch v := idVal.(type) {
			case float64:
				userID = uint(v)
			case int:
				userID = uint(v)
			}
		}

		// เก็บค่าลง Locals เพื่อใช้ใน Handler ถัดไป
		c.Locals("user_id", userID)
		c.Locals("role", role)

		return c.Next()
	}
}

// func AuthMiddleware(requiredRole string) fiber.Handler {
// 	return func(c fiber.Ctx) error {

// 		tokenString := c.Cookies("jwt")
// 		if tokenString == "" {
// 			authHeader := c.Get("Authorization")
// 			if strings.HasPrefix(authHeader, "Bearer ") {
// 				tokenString = strings.TrimPrefix(authHeader, "Bearer ")
// 			}
// 		}

// 		if tokenString == "" {
// 			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized: Please login first"})
// 		}

// 		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
// 			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
// 				return nil, fmt.Errorf("unexpected signing method")
// 			}
// 			return []byte(os.Getenv("JWT_SECRET")), nil
// 		})

// 		if err != nil || !token.Valid {
// 			return c.Status(401).JSON(fiber.Map{"error": "Invalid token"})
// 		}

// 		claims := token.Claims.(jwt.MapClaims)

// 		role, _ := claims["role"].(string)
// 		if requiredRole != "" && role != requiredRole {
// 			return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
// 		}

// 		var userID uint
// 		if idVal, ok := claims["user_id"]; ok {

// 			if val, ok := idVal.(float64); ok {
// 				userID = uint(val)
// 			}
// 		}

// 		c.Locals("user_id", userID)
// 		c.Locals("role", role)

// 		return c.Next()
// 	}
// }
