import express from "express";
import {
  getMouse,
  getAllMice,
  addMouse,
  updateMouse,
  deleteMouse,
} from "../controllers/MouseController.js";

const router = express.Router();

// Get all mice
router.get("/", getAllMice);

// GET single mouse
router.get("/:id", getMouse);

// Add a new mouse
router.post("/", addMouse);

// Update an existing mouse by ID
router.put("/:id", updateMouse);

// Delete a mouse by ID
router.delete("/:id", deleteMouse);

export default router;
