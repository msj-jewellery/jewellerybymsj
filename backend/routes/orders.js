import { Router } from "express";
const router = Router();
import Order from "../models/orders.js"; // Mongoose model

router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (err) {
    console.error("Order save failed:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

export default router;
