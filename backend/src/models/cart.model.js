import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // ✅ change from ObjectId to String
    required: true,
    unique: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      size: { type: String },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;