// Monitor.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const monitorSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },

    // Monitor-specific details
    screenSize: { type: String, required: true },
    screenResolution: { type: String, required: true },
    screenTechnology: { type: String },
    refreshRate: { type: Number },
    responseTime: { type: String },
    panelType: { type: String },
    aspectRatio: { type: String },
    brightness: { type: String },
    contrastRatio: { type: String },
    colorSupport: { type: String },

    // Connectivity
    ports: { type: [String] },
    wireless: { type: Boolean, default: false },

    // Additional features
    adjustableStand: { type: Boolean, default: false },
    vesaMount: { type: Boolean, default: false },
    speakers: { type: Boolean, default: false },
    weight: { type: String },
    dimensions: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Monitor", monitorSchema);
