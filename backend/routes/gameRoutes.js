import express from "express";
import {
  getGame,
  getAllGames,
  createGame,
  deleteGame,
  updateGame,
} from "../controllers/GameController.js";

const router = express.Router();

// GET all games
router.get("/", getAllGames);

// GET single game
router.get("/:id", getGame);

// POST a new game
router.post("/", createGame);

// DELETE a game
router.delete("/:id", deleteGame);

// PUT (update) a game by ID
router.put("/:id", updateGame); // Added PUT route

export default router;
