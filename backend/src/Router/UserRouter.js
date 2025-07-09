import { Router } from "express";
import { userLogin, userRegister } from "../Controllers/UserController.js";
import verifyToken from "../lib/verifyToken.js";

const router = Router();

router.get("/login", userLogin);
router.get("/register", userRegister);

export const UserRouter = router;