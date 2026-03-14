package middlewares

import (
	"os"
	"strings"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(requiredRoles string) fiber.Handler {
	return func(c fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized: Please login first"})
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized: Invalid token"})
		}
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized: Invalid token claims"})
		}

		userRole := claims["role"].(string)
		if requiredRoles != "" && userRole != requiredRoles {
			return c.Status(403).JSON(fiber.Map{"error": "Forbidden: You don't have permission to access this resource"})
		}

		c.Locals("user_id", claims["user_id"])
		c.Locals("role", userRole)

		return c.Next()
	}

}
