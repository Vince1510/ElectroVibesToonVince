import mongoose from "mongoose";

const { Schema } = mongoose;

const keyboardSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    largeDescription: { type: [String], required: true },
    brand: { type: String, required: true },
    category: { type: String, default: "Keyboard" },
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
    oftenBoughtWith: [
      {
        id: { type: String, required: true },
        category: { type: String, required: true },
      },
    ],
    othersAlsoLookAt: [
      {
        id: { type: String, required: true },
        category: { type: String, required: true },
      },
    ],
  
    // Keyboard-specific details
    layout: { type: String, required: true },
    connectionType: { type: String, required: true },
    switchType: { type: String, required: true },
    backlighting: { type: String, required: true },
    rgbLighting: { type: String, required: true },
    keycapMaterial: { type: String },
    size: { type: String },
    macroKeys: { type: String, required: true },
    hotSwappable: { type: String, required: true },
    batteryLife: { type: String },

    // Additional features
    numPad: { type: Boolean, required: true },
    adjustableFeet: { type: Boolean, required: true },
    pollingRate: { type: String },
    onboardMemory: { type: Boolean },
    compatibility: { type: [String], required: true },
    waterproof: { type: Boolean },
    wirelessRange: { type: String },
    weight: { type: String },
    dimensions: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Keyboard", keyboardSchema);
