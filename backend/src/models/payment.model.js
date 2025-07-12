import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String, // Firebase UID
    required: true,
  },
  orderId: {
    type: String, // Your internal Order._id (not Razorpay's)
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  method: {
    type: String, // e.g. "Razorpay"
    default: "Razorpay",
  },
  status: {
    type: String, // e.g. "Success", "Failed"
    default: "Success",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;