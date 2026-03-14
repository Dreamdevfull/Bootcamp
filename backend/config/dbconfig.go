package config

import (
	"fmt"
	"os"

	"github.com/Dreamdevfull/Bootcamp/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DatabaseConnected() *gorm.DB {

	godotenv.Load()

	dsn := os.Getenv("DATABASE_URL")

	if dsn == "" {
		panic("DATABASE_URL environment variable is not set")
	}

	dbConnection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(fmt.Sprintf("failed to connect database: %v", err))
	}

	DB = dbConnection

	fmt.Println("Database connected successfully")

	return DB
}
func AutoMigrate(database *gorm.DB) {
	database.AutoMigrate(
		&models.Users{},
		&models.Shops{},
		&models.ShopProducts{},
		&models.Products{},
		&models.Orders{},
		&models.OrderItems{},
		&models.Wallet{},
		models.WalletLog{},
	)
}
