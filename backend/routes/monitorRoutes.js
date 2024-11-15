import express from "express";
import {
  getAllMonitors,
  addMonitor,
  updateMonitor,
  deleteMonitor,
} from "../controllers/MonitorController.js";

const router = express.Router();

// Get all monitors
router.get("/", getAllMonitors);

// Add a new monitor
router.post("/", addMonitor);

// Update an existing monitor
router.put("/:id", updateMonitor);

// Delete a monitor
router.delete("/:id", deleteMonitor);

export default router;
