import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UserRouter } from "./src/Router/UserRouter.js";
import { connectDB } from "./src/lib/db.js";
import { ProductRouter } from "./src/Router/ProductRouter.js";
import { CartRouter } from "./src/Router/CartRouter.js";
import { PaymentRouter } from "./src/Router/PaymentRouter.js";
import { OrderRouter } from "./src/Router/OrdersRouter.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/auth", UserRouter);
// app.use("/payment", UserRouter);
app.use("/products", ProductRouter);
app.use("/cart", CartRouter);
app.use("/payment", PaymentRouter);
app.use("/orders",OrderRouter);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
})