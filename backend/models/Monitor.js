import mongoose from "mongoose";

const monitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true }, // new field
    description: { type: String, required: true }, // new field
    category: { type: String, default: "Monitor" },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    imageCard: { type: String, required: true },
    imageOverview: { type: String, required: true }, // new field
    specs: {
      resolution: { type: String },
      size: { type: Number },
      refreshRate: { type: String },
    },
  },
  { timestamps: true }
);

const Monitor = mongoose.model("Monitor", monitorSchema);

export default Monitor;
