import express from "express";
const router = express.Router();
import { auth, restrictTo } from "../Middlewares/authMiddleware.js";
import{createAppointment,getLabDailyAppointments,cancelAppointment,getappointmentsPatient}from "../Controllers/Appointments.js"
//createAppointment to patient
router.post("/",auth,restrictTo("patient"),createAppointment);
//get LabDailyAppointments for staff and admin 
router.get("/dailySchedule",auth,restrictTo("staff","admin"),getLabDailyAppointments);
//cancelAppointment foor patient 
router.patch("/cancel/:appointmentId",auth,restrictTo("patient"),cancelAppointment);
//get appointmenta for PPATIENT
router.get("/myappointments",auth,restrictTo("patient"),getappointmentsPatient)





export default router;