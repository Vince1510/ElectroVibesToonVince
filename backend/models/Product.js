import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    brand: { type: String, required: true },
    platform: { type: String },
    screenSize: { type: String },
    screenResolution: { type: String },
    screenTechnology: { type: String },
    touchScreen: { type: Boolean },
    refreshRate: { type: Number },
    adaptiveSync: { type: String },
    speakers: { type: Boolean },
    connectors: { type: String },
    processor: { type: String },
    memory: { type: String },
    storage: { type: String },
    graphicsCard: { type: String },
    dpi: { type: String },
    connection: { type: String },
    handType: { type: String },
    keyboardLayout: { type: String },
    keyboardLights: { type: String },
    ergonomicDesign: { type: String },
    switches: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
