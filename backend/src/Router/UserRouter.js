import express  from "express";
import { getProfile, userLogin, userRegister } from "../Controllers/UserController.js";
import verifyToken from "../lib/verifyToken.js";

const router = express.Router();

router.get("/login",verifyToken ,userLogin);
router.post("/register",verifyToken, userRegister);
router.get("/profile", verifyToken, getProfile);
export const UserRouter = router;