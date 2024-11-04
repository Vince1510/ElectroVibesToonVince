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
    imageUrl: { type: String, required: true },
    
    // Keyboard-specific details
    layout: { type: String, required: true }, // e.g., QWERTY, AZERTY
    connectionType: { type: String, required: true }, // e.g., wired, wireless
    switchType: { type: String, required: true }, // e.g., mechanical, membrane
    backlighting: { type: Boolean, default: false },
    rgbLighting: { type: Boolean, default: false },
    keycapMaterial: { type: String }, // e.g., ABS, PBT
    size: { type: String }, // e.g., full-size, tenkeyless
    macroKeys: { type: Boolean, default: false },
    hotSwappable: { type: Boolean, default: false },
    batteryLife: { type: String }, // Only if wireless
    
    // Additional features
    colorOptions: { type: [String] },
    weight: { type: String },
    dimensions: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Keyboard", keyboardSchema);
