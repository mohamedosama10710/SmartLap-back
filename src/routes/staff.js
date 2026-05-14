import express from "express";
import { auth, restrictTo } from "../middlewares/middleware.js";
import {
  createStaff,
  getAllstaff,
  editStaff,
  deletedStaff,
  getStaffProfile,
} from "../Controllers/staff.js";
const router = express.Router();

// create staff (admin)

router.post("/", auth, restrictTo("admin"), createStaff);

// get all staff (admin)
router.get("/", auth, restrictTo("admin"), getAllstaff);

router.get("/staffProfile", auth, restrictTo("staff"),getStaffProfile );

//edit staff
router.patch("/:id", auth, restrictTo("admin"), editStaff);

//delete staff
router.delete("/:id", auth, restrictTo("admin"), deletedStaff);


export default router;
