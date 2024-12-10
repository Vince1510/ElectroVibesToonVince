import express from "express";
import {
  getAllKeyboards,
  getKeyboard,
  createKeyboard,
  deleteKeyboard,
  updateKeyboard,
} from "../controllers/KeyboardController.js";

const router = express.Router();

// GET all keyboards
router.get("/", getAllKeyboards);

// GET a single keyboard
router.get("/:id", getKeyboard);

// POST a new keyboard
router.post("/", createKeyboard);

// DELETE a keyboard
router.delete("/:id", deleteKeyboard);

// PUT to update a keyboard
router.put("/:id", updateKeyboard); // Changed from PATCH to PUT

export default router;
