// backend/models/Order.js
import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    cartItems: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalPrice: { type: Number, required: true },
    upiPaidAt: Date, // UPI timestamp field
  },
  { timestamps: true }
);

export default model("Order", orderSchema);
