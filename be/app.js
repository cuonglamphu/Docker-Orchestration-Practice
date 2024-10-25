const cors = require('cors');
const express = require('express');
const { connectMongoDB, redisClient } = require('./config');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const { seedUsers, seedProducts } = require('./seed');

const app = express();

// Cấu hình CORS
app.use(cors({
  origin: process.env.FRONTEND_URL, // Frontend URL
  methods: 'GET,POST,PUT,DELETE',
}));

app.use(express.json()); // Để xử lý JSON request body

// Kết nối MongoDB và Redis
connectMongoDB();
redisClient.connect();

// Thêm dữ liệu mẫu cho User và Product
const seedData = async () => {
  await seedUsers();
  await seedProducts();
};

seedData();  // Gọi hàm thêm dữ liệu mẫu


app.get('/', (req, res) => {
  res.send('Hello World');
});
// API routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
// Test route
app.get("/test", (req, res) => {
  res.send(`response from container: ${process.env.HOSTNAME}`);
});
// Khởi chạy server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
