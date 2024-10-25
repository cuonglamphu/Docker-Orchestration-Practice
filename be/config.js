const mongoose = require('mongoose');
const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = { connectMongoDB, redisClient };
