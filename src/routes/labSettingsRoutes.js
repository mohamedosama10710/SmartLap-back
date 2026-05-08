import {
  getSchedule,
  updateSchedule,
  getLabSettings
} from "../Controllers/labSettings.js";

const router = express.Router();

// update schedule (admin)
router.patch("/", auth, restrictTo("admin"), updateSchedule);

// get raw lab settings
router.get("/settings", getLabSettings);

// get available slots
router.get("/", getSchedule);

export default router;