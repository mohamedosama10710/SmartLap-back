import express from "express";
import { auth, restrictTo } from "../Middlewares/authMiddleware.js";
import{getSchedule,updateSchedule} from "../Controllers/labSettings.js"

const router = express.Router();
//to update the schedule for admin
router.patch('/',auth,restrictTo("admin"),updateSchedule);
//get appointmentsavailable (bublic)
router.get('/',getSchedule)







export default router;

