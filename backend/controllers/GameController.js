import Game from "../models/Game.js";

// Fetch all games
export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new game
export const createGame = async (req, res) => {
  const {
    name, // Changed from 'title' to 'name'
    description,
    price,
    releaseDate,
    genre,
    imageCard,
    imageOverview, // Added imageOverview
    brand, // Added brand
    code, // Added code
    category,
  } = req.body;

  // Check if all required fields are provided
  if (
    !name ||
    !description ||
    !price ||
    !releaseDate ||
    !genre ||
    !imageCard ||
    !imageOverview ||
    !brand ||
    !code ||
    !category
  ) {
    return res.status(400).json({
      message:
        "All fields are required: name, description, price, releaseDate, genre, imageCard, imageOverview, brand, code, category",
    });
  }

  try {
    const newGame = new Game({
      name, // Changed from 'title' to 'name'
      description,
      price,
      releaseDate,
      genre,
      imageCard,
      imageOverview, // Added imageOverview
      brand, // Added brand
      code, // Added code
      category,
    });

    // Save the game to the database
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
