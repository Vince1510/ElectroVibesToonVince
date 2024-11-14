import express from "express";
import {
  getAllGames,
  getGame,
  createGame,
  deleteGame,
  updateGame,
} from "../controllers/GameController.js";

const router = express.Router();

// GET all games
router.get("/", getAllGames);

// GET a single game
router.get("/:id", getGame);

// POST a new game
router.post("/", createGame);

// DELETE a game
router.delete("/:id", deleteGame);

// PATCH a game
router.patch("/:id", updateGame);

export default router;
