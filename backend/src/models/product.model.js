import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  size: [{ type: String }], // e.g., ["S", "M", "L"]
  category: { type: String },
  price: { type: Number, required: true },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;