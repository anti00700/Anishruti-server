import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import { connectDB } from "./database/db.js"; // Ensure this aligns with your DB connection
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";
import Razorpay from "razorpay";

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();

// Use middlewares
app.use(express.json());

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  credentials: true, // If you need to pass cookies or other credentials
}));

// Define port
const port = process.env.PORT || 4000;

// Basic route
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/uploads", express.static("uploads"));

app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

// Start the server and connect to the database
app.listen(port, () => {    
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});