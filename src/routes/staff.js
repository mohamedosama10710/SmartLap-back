import express from "express";
import { auth, restrictTo } from "../middlewares/authMiddleware.js";
import {createStaff,getAllstaff,editStaff,deletedStaff} from "../Controllers/staff.js";
const router = express.Router();


// create staff (admin)

router.post("/", auth, restrictTo("admin"),createStaff);

// get all staff (admin)
router.get("/", auth, restrictTo("admin"),getAllstaff);

//edit staff
router.patch("/:id", auth, restrictTo("admin"),editStaff);

//delete staff
router.delete("/:id", auth,restrictTo("admin"),deletedStaff);



export default router;
