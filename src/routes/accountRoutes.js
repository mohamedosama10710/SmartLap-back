import express from "express";
import { auth, restrictTo } from "../middlewares/middleware.js";
import { resetPassword, forgotPassword } from "../Controllers/account.js";
import {
  registerStaff,
  registerPatient,
  login,
  updateProfile,
  updatePassword,
} from "../Controllers/account.js";
import { deletedStaff } from "../Controllers/staff.js";

const router = express.Router();

router.post("/login", login);
router.post("/registerStaff", auth, restrictTo("admin"), registerStaff);

router.post("/registerPatient", registerPatient);

//update (email,phone,number)
router.patch("/updateProfile", auth, updateProfile);
//update (password)
router.patch("/updatePassword", auth, updatePassword);

//  Forgot Password Flow
router.post("/forgotPassword", forgotPassword); // 1
router.patch("/resetPassword/:token", resetPassword); // 2

router.delete("/deleteStaff/:id", auth, restrictTo("admin"), deletedStaff);
export default router;
