import express from "express";
import { auth, restrictTo } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// create patient (admin + staff)
router.post("/", auth, restrictTo("admin", "staff"));

// get all patients (admin + staff)
router.get("/", auth, restrictTo("admin", "staff"));

// patient نفسه
router.get("/patientProfile", auth, restrictTo("patient"));

// update (age,weight,height)
router.patch("/patientProfile", auth, restrictTo("patient"));

// get patient by id
router.get("/:id", auth, restrictTo("admin", "staff"));

// edit patient
router.patch("/:id", auth, restrictTo("admin", "staff"));

// delete patient by id
router.delete("/:id", auth, restrictTo("admin", "staff"));



export default router;