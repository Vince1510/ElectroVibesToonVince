import Game from "../models/Games.js";

// Create a new game
export const createGame = async (req, res) => {
  console.log(req.body); // Log the request body
  const { img, title, description, price } = req.body;

  try {
    const newGame = await Game.create({ img, title, description, price });
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
