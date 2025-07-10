import express from "express";
const router = express.Router();
import Product from "../models/product.model.js";

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
})

router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
});

router.get('/price', async (req, res) => {
  const min = parseInt(req.query.min) || 0;
  const max = parseInt(req.query.max) || Number.MAX_SAFE_INTEGER;

  try {
    const products = await Product.find({
      price: { $gte: min, $lte: max }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products by price' });
  }
});

router.get('/get/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/top', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(6);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top products' });
  }
});

export const ProductRouter = router;
