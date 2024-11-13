import express from "express";
import { createGame } from "../controllers/GamesController.js";

const router = express.Router();

// POST a new game
router.post("/", createGame);

export default router;
