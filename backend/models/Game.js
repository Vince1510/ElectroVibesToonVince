import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Rename 'title' to 'name'
  description: { type: String, required: true },
  price: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  imageCard: { type: String, required: true },
  imageOverview: { type: String, required: true }, // Add imageOverview
  brand: { type: String, required: true }, // Add brand
  code: { type: String, required: true }, // Add code
  category: { type: String, required: true },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
