// routes/mouseRoutes.js

import express from "express";
import {
  getAllMice,
  getMouse,
  createMouse,
  deleteMouse,
  updateMouse,
} from "../controllers/MouseController.js";

const router = express.Router();

// GET all mice
router.get("/", getAllMice);

// GET a single mouse
router.get("/:id", getMouse);

// POST a new mouse
router.post("/", createMouse);

// DELETE a mouse
router.delete("/:id", deleteMouse);

// PATCH a mouse
router.patch("/:id", updateMouse);

export default router;
