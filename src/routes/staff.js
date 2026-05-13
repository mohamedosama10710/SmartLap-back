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

//edit staff
router.patch("/:id", auth, restrictTo("admin"), editStaff);

//delete staff
router.delete("/:id", auth, restrictTo("admin"), deletedStaff);

router.get("/staffProfile", auth, restrictTo("admin,staff"),getStaffProfile );

export default router;
