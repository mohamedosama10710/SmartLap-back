import express from "express";
import { auth, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();


// create ref (admin)
// router.post("/", auth, restrictTo("admin"));

// // get all ref (admin)
// router.get("/", auth, restrictTo("admin"));

// //edit ref
// router.patch("/:id", auth, restrictTo("admin"));

// //delete ref
// router.delete("/:id", auth,restrictTo("admin"));



export default router;
