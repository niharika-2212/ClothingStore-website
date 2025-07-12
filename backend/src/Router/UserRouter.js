import express  from "express";
import { getProfile, userLogin, userRegister,updateUser } from "../Controllers/UserController.js";
import verifyToken from "../lib/verifyToken.js";

const router = express.Router();

router.get("/login",verifyToken ,userLogin);
router.post("/register",verifyToken, userRegister);
router.get("/profile", verifyToken, getProfile);
router.put("/update", verifyToken, updateUser);
export const UserRouter = router;