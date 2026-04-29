import express from "express";
import { auth, restrictTo } from "../middlewares/authMiddleware.js";


const router = express.Router();

// router.post("/login");
// router.post("/registerStaff",auth,restrictTo("admin"));
// router.post("/registerPatient",auth,restrictTo("admin","staff"));

// //update (email,phone,number)
// router.patch("/updateProfile", auth);
// //update (password)
// router.patch("/updatePassword", auth);

// //  Forgot Password Flow
// router.post("/forgotPassword");     // 1
// router.patch("/resetPassword/:token"); // 2


export default router;
