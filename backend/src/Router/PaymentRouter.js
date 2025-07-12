import express from "express";
import { createOrder, verifyPayment } from "../Controllers/PaymentController.js";
import verifyToken from "../lib/verifyToken.js";


const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.post("/verify-payment", verifyToken, verifyPayment);

export const PaymentRouter = router;
