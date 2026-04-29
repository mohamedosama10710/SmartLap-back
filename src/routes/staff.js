import express from "express";
import { auth, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();


// // create staff (admin)
// router.post("/", auth, restrictTo("admin"));

// // get all staff (admin)
// router.get("/", auth, restrictTo("admin"));

// //edit staff
// router.patch("/:id", auth, restrictTo("admin"));

// //edit staff
// router.delete("/:id", auth,restrictTo("admin"));



export default router;
