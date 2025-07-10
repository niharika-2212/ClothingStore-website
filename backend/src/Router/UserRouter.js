import express  from "express";
import { userLogin, userRegister } from "../Controllers/UserController.js";
import verifyToken from "../lib/verifyToken.js";

const router = express.Router();

router.get("/login",verifyToken ,userLogin);
router.post("/register",verifyToken, userRegister);

export const UserRouter = router;