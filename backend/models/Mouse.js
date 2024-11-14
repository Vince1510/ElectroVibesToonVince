// models/Mouse.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const mouseSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },

    // Mouse-specific details
    dpi: { type: Number, required: true },
    connectionType: { type: String, required: true }, // e.g., Wired, Wireless
    batteryLife: { type: String }, // for wireless mice
    weight: { type: String },
    dimensions: { type: String },
    colorOptions: { type: [String] },
    features: { type: [String] }, // Additional features like RGB lighting, programmable buttons, etc.
  },
  { timestamps: true }
);

export default mongoose.model("Mouse", mouseSchema);
