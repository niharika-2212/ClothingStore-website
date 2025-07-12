import express  from "express";
import verifyToken from "../lib/verifyToken.js";
import { placeOrder } from "../Controllers/OrdersController.js";
const router = express.Router();

router.post("/place-order",verifyToken ,placeOrder);

export const OrderRouter = router;