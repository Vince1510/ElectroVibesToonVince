import express from "express";
import {
  getGames,
  createGame,
  deleteGame,
  updateGame, // Import the updateGame function
} from "../controllers/GameController.js";

const router = express.Router();

// GET all games
router.get("/", getGames);

// POST a new game
router.post("/", createGame);

// DELETE a game
router.delete("/:id", deleteGame);

// PUT (update) a game by ID
router.put("/:id", updateGame); // Added PUT route

export default router;
