// monitorRoutes.js

import express from "express";
import {
  getAllMonitors,
  getMonitor,
  createMonitor,
  deleteMonitor,
  updateMonitor,
} from "../controllers/MonitorController.js";

const router = express.Router();

// GET all monitors
router.get("/", getAllMonitors);

// GET a single monitor
router.get("/:id", getMonitor);

// POST a new monitor
router.post("/", createMonitor);

// DELETE a monitor
router.delete("/:id", deleteMonitor);

// PATCH a monitor
router.patch("/:id", updateMonitor);

export default router; // Ensure this is a default export
