// server/routes/payment.js

import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const router = express.Router();

// Uncomment this once you have your Razorpay keys in .env
/*
import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
*/

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  // If Razorpay instance not initialized, respond with dummy data (for dev)
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
    console.warn("⚠️ Razorpay keys missing, returning dummy order");
    return res.status(200).json({
      id: "dummy_order_id_1234",
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_dummy`,
      status: "created",
    });
  }

  try {
    // Uncomment below when ready to use Razorpay
    /*
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Math.random().toString().slice(2, 10)}`,
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);
    return res.status(200).json(order);
    */
  } catch (err) {
    console.error("❌ Razorpay Error:", err);
    return res.status(500).send("Error creating Razorpay order");
  }
});

export default router;
