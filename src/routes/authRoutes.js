import express from "express";
import { auth, restrictTo } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/login");
router.post("/register",auth,restrictTo("admin"));


router.get("/profile", auth);
router.patch("/updateProfile", auth);
router.patch("/updatePassword", auth);

// 🔥 Forgot Password Flow
router.post("/forgotPassword");     // 1
router.patch("/resetPassword/:token"); // 2


export default router;
