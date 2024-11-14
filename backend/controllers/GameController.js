import Game from "../models/Game.js";
import mongoose from "mongoose";

// Get all games
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find({}).sort({ createdAt: -1 });
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single game
export const getGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such game" });
  }

  const game = await Game.findById(id);

  if (!game) {
    return res.status(404).json({ error: "No such game" });
  }

  res.status(200).json(game);
};

// Create a new game
export const createGame = async (req, res) => {
  const {
    name,
    code,
    description,
    genre,
    price,
    imageUrl,
    platform,
    releaseDate,
    developer,
    publisher,
    rating,
    multiplayer,
    inAppPurchases,
    systemRequirements,
    downloadableContent,
  } = req.body;

  try {
    const game = await Game.create({
      name,
      code,
      description,
      genre,
      price,
      imageUrl,
      platform,
      releaseDate,
      developer,
      publisher,
      rating,
      multiplayer,
      inAppPurchases,
      systemRequirements,
      downloadableContent,
    });
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a game
export const deleteGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such game" });
  }

  const game = await Game.findOneAndDelete({ _id: id });

  if (!game) {
    return res.status(400).json({ error: "No such game" });
  }

  res.status(200).json(game);
};

// Update a game
export const updateGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such game" });
  }

  const game = await Game.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!game) {
    return res.status(400).json({ error: "No such game" });
  }

  res.status(200).json(game);
};
