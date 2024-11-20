import Game from "../models/Game.js";
import mongoose from "mongoose";

// Get all games
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single keyboard
export const getGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Game" });
  }

  try {
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ error: "No such Game" });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new game
export const createGame = async (req, res) => {
  const { name, description, largeDescription, brand, category, price, dealPrice, imageCard, imageOverview, commercial, amount, maxAmount, state, color, model, seller, sellerScore, deliveryTime, oftenBoughtWith, othersAlsoLookAt, releaseDate, genre, platform, multiplayerSupport, multiplayerModes, ageRating, languages, dlcAvailable, specialEditions, achievements, inAppPurchases, fileSize, systemRequirements, physicalEdition, vrSupport, publisher, developer, releaseRegion, exclusiveContent } = req.body;

  if (!name || !description || !price || !releaseDate || !genre || !imageCard || !imageOverview || !brand || !category) {
    return res.status(400).json({
      message: "All fields are required: name, description, price, releaseDate, genre, imageCard, imageOverview, brand, category",
    });
  }

  try {
    const newGame = new Game({
      name, description, largeDescription, brand, category, price, dealPrice, imageCard, imageOverview, commercial, amount, maxAmount, state, color, model, seller, sellerScore, deliveryTime, oftenBoughtWith, othersAlsoLookAt, releaseDate, genre, platform, multiplayerSupport, multiplayerModes, ageRating, languages, dlcAvailable, specialEditions, achievements, inAppPurchases, fileSize, systemRequirements, physicalEdition, vrSupport, publisher, developer, releaseRegion, exclusiveContent
    });

    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a game
export const deleteGame = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await Game.findByIdAndDelete(id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a game by ID
export const updateGame = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    releaseDate,
    genre,
    imageCard,
    imageOverview,
    brand,
    code,
    category,
  } = req.body;

  try {
    // Log the ID to make sure it's being passed correctly
    console.log("Updating game with ID:", id);

    const updatedGame = await Game.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        releaseDate,
        genre,
        imageCard,
        imageOverview,
        brand,
        code,
        category,
      },
      { new: true } // Return the updated document
    );

    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
