import mongoose from "mongoose";

const mouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: "Mouse" },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    imageCard: { type: String, required: true }, // Add imageCard
    imageOverview: { type: String, required: true }, // Add imageOverview
    description: { type: String, required: true },
    specs: {
      dpi: { type: String },
      wireless: { type: Boolean },
      rgb: { type: Boolean },
    },
  },
  { timestamps: true }
);

const Mouse = mongoose.model("Mouse", mouseSchema);

export default Mouse;
