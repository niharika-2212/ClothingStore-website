import express from "express";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id:process.env.KEY_ID,
  key_secret: process.env.SECRET_KEY
});

app.post("/create-order", async(req, res)=>{
  const {amount,currency} = req.body;
  const options = {
    amount: amount*100, // in paise
    currency,
    receipt: "receipt_order_" + new Date().getTime()
  }
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json("order creation failed");
  }
})