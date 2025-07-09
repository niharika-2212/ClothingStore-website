import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UserRouter } from "./src/Router/UserRouter.js";
import { connectDB } from "./src/lib/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/auth", UserRouter);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
})