import express from "express";
import { auth, restrictTo } from "../middlewares/authMiddleware.js";
import{resetPassword,forgotPassword} from "../Controllers/account.js"
import { registerStaff, registerPatient, login, updateProfile, updatePassword } from "../Controllers/account.js";


const router = express.Router();


router.post("/login", login);
router.post("/registerStaff", auth, restrictTo("admin"), registerStaff);

router.post("/registerPatient",auth,restrictTo("admin","staff"), registerPatient);

//update (email,phone,number)
router.patch("/updateProfile", auth, updateProfile);
//update (password)
router.patch("/updatePassword", auth, updatePassword);

// router.delete("/delete/:id", auth, restrictTo("admin"))

//  Forgot Password Flow
router.post("/forgotPassword", forgotPassword);     // 1
router.patch("/resetPassword/:token", resetPassword); // 2


export default router;
