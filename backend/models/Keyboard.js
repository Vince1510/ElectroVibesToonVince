import mongoose from "mongoose";

const { Schema } = mongoose;

const keyboardSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, default: 'Keyboard' },
    price: { type: Number, required: true },
    imageCard: { type: String, required: true },
    imageOverview: { type: [String], required: true },
    commercial: { type: String, required: true },
    
    // Keyboard-specific details
    layout: { type: String, required: true }, // e.g., QWERTY, AZERTY
    connectionType: { type: String, required: true }, // e.g., wired, wireless
    switchType: { type: String, required: true }, // e.g., mechanical, membrane
    backlighting: { type: String, required: true },
    rgbLighting: { type: String, required: true },
    keycapMaterial: { type: String }, // e.g., ABS, PBT
    size: { type: String }, // e.g., full-size, tenkeyless
    macroKeys: { type: String, required: true },
    hotSwappable: { type: String, required: true },
    batteryLife: { type: String }, // Only if wireless
    
    // Additional features
    colorOptions: { type: [String] },
    weight: { type: String },
    dimensions: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Keyboard", keyboardSchema);
