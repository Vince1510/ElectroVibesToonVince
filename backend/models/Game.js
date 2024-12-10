import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    largeDescription: { type: [String], required: true },
    brand: { type: String, required: true },
    category: { type: String, default: 'games' },
    price: { type: Number, required: true },
    dealPrice: { type: Number, required: false },
    imageCard: { type: String, required: true },
    imageOverview: { type: [String], required: true },
    commercial: { type: String, required: true },
    amount: { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    state: { type: String, required: true },
    color: { type: [String], required: true },
    model: { type: [String], required: true },
    seller: { type: String, required: true },
    sellerScore: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
    oftenBoughtWith: { type: [String], required: true },
    othersAlsoLookAt: { type: [String], required: true },
  
    // Game-specific details
    releaseDate: { type: Date, required: true },
    genre: { type: [String], required: true },
    platform: { type: [String], required: true }, 
    multiplayerSupport: { type: Boolean, required: true },
    multiplayerModes: { type: [String] },
    ageRating: { type: String, required: true },
    languages: { type: [String], required: true },
    dlcAvailable: { type: Boolean, required: true },
    specialEditions: { type: [String] },
    achievements: { type: Boolean },
    inAppPurchases: { type: Boolean, required: true }, 
  
    // Additional features
    fileSize: { type: String, required: true }, 
    systemRequirements: {
      minimum: { type: String, required: true },
      recommended: { type: String }, 
    },
    physicalEdition: { type: Boolean, required: true },
    vrSupport: { type: Boolean },
    publisher: { type: String },
    developer: { type: String },
    releaseRegion: { type: [String] }, 
    exclusiveContent: { type: [String] },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

export default Game;