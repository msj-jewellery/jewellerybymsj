import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String],
  category: String,
  createdAt: { type: Date, default: Date.now },

  featured: {
  type: Boolean,
  default: false
}

});



const Product = model("Product", productSchema);
export default Product;
