import express from "express";
import { auth, restrictTo } from "../middlewares/authMiddleware.js";
import {
  createRef,
  getAllRefs,
  editRef,
  deleteRef,
} from "../Controllers/ref.js";
const router = express.Router();

// create ref (admin)
router.post("/", auth, restrictTo("admin"), createRef);

// get all ref (admin)
router.get("/", auth, restrictTo("admin"), getAllRefs);

//edit ref
router.patch("/:id", auth, restrictTo("admin"), editRef);

//delete ref
router.delete("/:id", auth, restrictTo("admin"), deleteRef);

export default router;
