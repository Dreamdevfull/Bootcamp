package utils

import (
	"bytes"
	"fmt"
	"image"
	_ "image/jpeg"
	_ "image/png"
	"os"
	"path/filepath"
	"time"

	"github.com/nickalie/go-webpbin"
)

func SaveImageAsWebP(imageData []byte, uploadDir string) (string, error) {
	// 1. Decode รูปต้นฉบับ (JPG/PNG) เพื่อเช็คความถูกต้อง
	img, _, err := image.Decode(bytes.NewReader(imageData))
	if err != nil {
		return "", fmt.Errorf("decode error: %v", err)
	}

	// 2. สร้างโฟลเดอร์เก็บรูป
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return "", err
	}

	// 3. ตั้งชื่อไฟล์
	fileName := fmt.Sprintf("%d.webp", time.Now().UnixNano())
	path := filepath.Join(uploadDir, fileName)

	// 4. ใช้ WebPBin ในการแปลงและบันทึกไฟล์
	// ตัวนี้จะไปเรียก cwebp (Google Binary) มาทำงานให้
	err = webpbin.NewCWebP().
		Quality(75).
		InputImage(img).
		OutputFile(path).
		Run()

	if err != nil {
		return "", fmt.Errorf("webp conversion error: %v", err)
	}

	return path, nil
}
