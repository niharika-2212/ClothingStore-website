import express  from "express";
import verifyToken from "../lib/verifyToken.js";
import { addToCart, getCart } from "../Controllers/CartController.js";
const router = express.Router();

router.post("/add",verifyToken ,addToCart);
router.get("/", verifyToken, getCart);

export const CartRouter = router;