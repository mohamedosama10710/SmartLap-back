import express from "express";
import { auth, restrictTo } from "../Middlewares/authMiddleware.js";
import {getDangerousReports,getPatientReport,editReport,deleteReport,sendPatientEmail} from "../Controllers/report.js"
const router = express.Router();

// create report (admin + staff)
router.post("/", auth, restrictTo("admin", "staff"));

// get all reports (admin+staff)
router.get("/", auth, restrictTo("admin","staff"));

// dangerous reports (admin)
router.get("/dangerous", auth, restrictTo("admin"),getDangerousReports);

// patient يشوف تقاريره
router.get("/patient", auth, restrictTo("patient"),getPatientReport);

// edit report (staff + admin)
router.patch("/:id", auth, restrictTo("admin", "staff"),editReport);

// delete report (staff + admin)
router.delete("/:id", auth, restrictTo("admin", "staff"),deleteReport);

// send email
router.post("/:id/send", auth, restrictTo("admin", "staff"),sendPatientEmail);

export default router;