import razorpay from "../lib/razorpay.js";
import crypto from "crypto";
import Payment from "../models/payment.model.js";

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // ₹ to paise
      currency: "INR",
      receipt: "order_rcptid_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    orderId, // from your own Orders collection
  } = req.body;

  const userId = req.user.uid;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  const isValid = expectedSignature === razorpay_signature;

  if (!isValid) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  const payment = new Payment({
    userId,
    orderId,
    amount,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    method: "Razorpay",
    status: "Success",
  });

  await payment.save();
  res.status(200).json({ message: "Payment verified", payment });
};