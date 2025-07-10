import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay";
import { UserRouter } from "./src/Router/UserRouter.js";
import { connectDB } from "./src/lib/db.js";
import { ProductRouter } from "./src/Router/ProductRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id:process.env.KEY_ID,
  key_secret: process.env.SECRET_KEY
});

app.use("/auth", UserRouter);
app.use("/payment", UserRouter);
app.use("/products", ProductRouter);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
})