import express from "express";
import Product from "./models/product.js"; // Adjust path if needed
import mongoose from "mongoose";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.featured === "true") {
      query.featured = true;
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get a single product by ID ✅
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Optional: validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Failed to add product" });
  }
});

export default router;
