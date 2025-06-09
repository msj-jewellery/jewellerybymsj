import mongoose from "mongoose";
import { config } from "dotenv";
import Product from "../models/Product.js";

config();
ss
const seedProducts = [
  {
    name: "Elegant Gold Necklace",
    description: "Pure 22K gold necklace for festive occasions.",
    price: 59999,
    images: ["/images/placeholder1.jpg", "/images/placeholder2.jpg"],
    category: "Necklace",
  },
  {
    name: "Diamond Stud Earrings",
    description: "18K gold base with brilliant-cut diamonds.",
    price: 28999,
    images: ["/images/placeholder3.jpg", "/images/placeholder4.jpg"],
    category: "Earrings",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    await Product.insertMany(seedProducts);

    console.log("Database seeded!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Seeding failed:", err);
  }
};

seed();
