import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js"

export const addToCart = async (req, res) => {
  const { productId, quantity, size } = req.body;
  const userId = req.user.uid;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart with the item
      cart = new Cart({
        userId,
        items: [{ productId, quantity, size }],
      });
    } else {
      // ✅ Only access cart.items if cart exists
      const existingItem = cart.items.find(
        (item) =>
          item.productId.toString() === productId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, size });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};



export const getCart = async (req, res) => {
  const userId = req.user.uid;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.status(200).json({ items: [], total: 0 });

    const items = cart.items.map((item) => ({
      _id: item._id,
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      size: item.size,
    }));

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.status(200).json({ items, total });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Failed to load cart" });
  }
};