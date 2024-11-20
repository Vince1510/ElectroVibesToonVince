import express from "express";
import {
  getMonitor,
  getAllMonitors,
  addMonitor,
  updateMonitor,
  deleteMonitor,
} from "../controllers/MonitorController.js";

const router = express.Router();

// Get all monitors
router.get("/", getAllMonitors);

// GET single monitor
router.get("/:id", getMonitor);

// Add a new monitor
router.post("/", addMonitor);

// Update an existing monitor
router.put("/:id", updateMonitor);

// Delete a monitor
router.delete("/:id", deleteMonitor);

export default router;
