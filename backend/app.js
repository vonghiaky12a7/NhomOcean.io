const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

// Tạo ứng dụng Express
const app = express();

// 🔹 Cấu hình CORS (phải đặt trước `express.json()`)
app.use(
  cors({
    origin: "http://localhost:3000", // Chỉ cho phép frontend này truy cập
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // ✅ Bật gửi cookie từ FE -> BE
  })
);

// 🔹 Middleware đọc request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 🔹 Định nghĩa routes
app.use("/products", productRoutes);


const PORT = process.env.PORT || 8092; // Mặc định PORT = 5000 nếu chưa đặt biến môi trường

// Kết nối database và khởi động server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Thoát chương trình nếu kết nối DB thất bại
  });
