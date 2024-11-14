import mongoose from "mongoose";

const { Schema } = mongoose;

const gameSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },

    // Game-specific details
    platform: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    rating: { type: String },

    // Additional features
    multiplayer: { type: Boolean, default: false },
    inAppPurchases: { type: Boolean, default: false },
    systemRequirements: { type: String },
    downloadableContent: { type: [String] },
  },
  { timestamps: true }
);

export default mongoose.model("Game", gameSchema);
