import express from "express";
import { auth, restrictTo } from "../Middlewares/authMiddleware.js";
import {
  createPatient,
  getAllPatients,
  getPatientProfile,
  updatePatientProfile,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../Controllers/patient.js";
const router = express.Router();

// create patient (admin + staff)
router.post("/", auth, restrictTo("admin", "staff"),createPatient);

// get all patients (admin + staff)
router.get("/", auth, restrictTo("admin", "staff"), getAllPatients);

// patient نفسه
router.get("/patientProfile", auth, restrictTo("patient"), getPatientProfile);

// update (age,weight,height)
router.patch("/patientProfile", auth, restrictTo("patient"), updatePatientProfile);

// get patient by id
router.get("/:id", auth, restrictTo("admin", "staff"), getPatientById);

// edit patient
router.patch("/:id", auth, restrictTo("admin", "staff"), updatePatient);

// delete patient by id
router.delete("/:id", auth, restrictTo("admin", "staff"), deletePatient);

// // create patient (admin + staff)
// router.post("/",createPatient);

// // get all patients (admin + staff)
// router.get("/", getAllPatients);

// // patient نفسه
// router.get("/patientProfile", getPatientProfile);

// // update (age,weight,height)
// router.patch("/patientProfile", updatePatientProfile);

// // get patient by id
// router.get("/:id", getPatientById);

// // edit patient
// router.patch("/:id", updatePatient);

// // delete patient by id
// router.delete("/:id", deletePatient);

export default router;