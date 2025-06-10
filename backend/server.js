// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";

import productRoutes from "./products.js";
import paymentRoutes from "./routes/payment.js"; // ✅

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure uploads directory exists
const uploadDir = path.resolve(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ Serve static images
app.use("/uploads", express.static(uploadDir));

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Upload route
app.post("/api/upload", upload.array("images", 5), (req, res) => {
  const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
  res.status(200).json({ paths: filePaths });
});

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
