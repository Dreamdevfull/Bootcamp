package middlewares

import (
	"fmt"
	"os"
	"strings"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

// func AuthMiddleware(requiredRoles string) fiber.Handler {
// 	return func(c fiber.Ctx) error {
// 		authHeader := c.Get("Authorization")
// 		if authHeader == "" {
// 			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized: Please login first"})
// 		}

// 		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

// 		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
// 			return []byte(os.Getenv("JWT_SECRET")), nil
// 		})

// 		if err != nil || !token.Valid {
// 			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized: Invalid token"})
// 		}
// 		claims, ok := token.Claims.(jwt.MapClaims)
// 		if !ok {
// 			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized: Invalid token claims"})
// 		}

// 		userRole := claims["role"].(string)
// 		if requiredRoles != "" && userRole != requiredRoles {
// 			return c.Status(403).JSON(fiber.Map{"error": "Forbidden: You don't have permission to access this resource"})
// 		}

// 		c.Locals("user_id", claims["user_id"])
// 		c.Locals("role", userRole)

// 		return c.Next()
// 	}

// }

// func AuthMiddleware(requiredRoles string) fiber.Handler {
// 	return func(c fiber.Ctx) error {

// 		tokenString := c.Cookies("jwt")
// 		fmt.Println("COOKIE:", c.Cookies("jwt"))
// 		fmt.Println("HEADER:", c.Get("Authorization"))
// 		fmt.Println("ALL:", c.Get("Cookie"))
// 		fmt.Println("SECRET:", os.Getenv("JWT_SECRET"))

// 		if tokenString == "" {
// 			return c.Status(401).JSON(fiber.Map{
// 				"error": "Unauthorized: Please login first",
// 			})
// 		}

// 		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
// 			return []byte(os.Getenv("JWT_SECRET")), nil
// 		})

// 		if err != nil || !token.Valid {
// 			return c.Status(401).JSON(fiber.Map{
// 				"error": "Unauthorized: Invalid token",
// 			})
// 		}

// 		claims, ok := token.Claims.(jwt.MapClaims)
// 		if !ok {
// 			return c.Status(401).JSON(fiber.Map{
// 				"error": "Unauthorized: Invalid token claims",
// 			})
// 		}

// 		userRole := claims["role"].(string)

// 		if requiredRoles != "" && userRole != requiredRoles {
// 			return c.Status(403).JSON(fiber.Map{
// 				"error": "Forbidden: You don't have permission",
// 			})
// 		}

// 		c.Locals("user_id", claims["user_id"])
// 		c.Locals("role", userRole)

// 		return c.Next()
// 	}
// }

// func AuthMiddleware(requiredRole string) fiber.Handler {
// 	return func(c fiber.Ctx) error {

// 		tokenString := c.Cookies("jwt")
// 		// fmt.Println("COOKIE:", c.Cookies("jwt"))
// 		// fmt.Println("HEADER:", c.Get("Authorization"))
// 		// fmt.Println("ALL:", c.Get("Cookie"))
// 		// fmt.Println("SECRET:", os.Getenv("JWT_SECRET"))

// 		if tokenString == "" {

// 			authHeader := c.Get("Authorization")

// 			if strings.HasPrefix(authHeader, "Bearer ") {
// 				tokenString = strings.TrimPrefix(authHeader, "Bearer ")
// 			}
// 		}

// 		if tokenString == "" {
// 			return c.Status(401).JSON(fiber.Map{
// 				"error": "Unauthorized: Please login first",
// 			})
// 		}

// 		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

// 			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
// 				return nil, fmt.Errorf("unexpected signing method")
// 			}

// 			return []byte(os.Getenv("JWT_SECRET")), nil
// 		})

// 		if err != nil || !token.Valid {
// 			return c.Status(401).JSON(fiber.Map{
// 				"error": "Invalid token",
// 			})
// 		}

// 		claims := token.Claims.(jwt.MapClaims)

// 		role := claims["role"].(string)

// 		if requiredRole != "" && role != requiredRole {
// 			return c.Status(403).JSON(fiber.Map{
// 				"error": "Forbidden",
// 			})
// 		}

// 		c.Locals("user_id", claims["user_id"])
// 		c.Locals("role", role)

// 		return c.Next()
// 	}
// }

func AuthMiddleware(requiredRole string) fiber.Handler {
	return func(c fiber.Ctx) error {

		tokenString := c.Cookies("jwt")
		if tokenString == "" {
			authHeader := c.Get("Authorization")
			if strings.HasPrefix(authHeader, "Bearer ") {
				tokenString = strings.TrimPrefix(authHeader, "Bearer ")
			}
		}

		if tokenString == "" {
			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized: Please login first"})
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method")
			}
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid token"})
		}

		claims := token.Claims.(jwt.MapClaims)

		role, _ := claims["role"].(string)
		if requiredRole != "" && role != requiredRole {
			return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
		}

		var userID uint
		if idVal, ok := claims["user_id"]; ok {

			if val, ok := idVal.(float64); ok {
				userID = uint(val)
			}
		}

		c.Locals("user_id", userID)
		c.Locals("role", role)

		return c.Next()
	}
}
