// server/products.js
import express from "express";
import Product from "./models/product.js";
import mongoose from "mongoose";

const router = express.Router();

// ✅ Get all products (optionally featured)
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

// ✅ Search products by name
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ message: "Query required" });

    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    }).limit(10);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get single product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

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

// ✅ Add new product
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
