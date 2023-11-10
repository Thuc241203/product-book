import express from "express";
import { Login, Register, sendResetLinkEmail } from "../controllers/auth";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/forgotPassword", sendResetLinkEmail);

export default router;
