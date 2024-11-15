import mongoose from "mongoose";

const { Schema } = mongoose;

const phoneSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, default: "Phone" },
    price: { type: Number, required: true },
    imageCard: { type: String, required: true },
    imageOverview: { type: [String], required: true },

    // Phone-specific details
    operatingSystem: { type: String, required: true },
    screenSize: { type: String, required: true },
    screenResolution: { type: String },
    screenTechnology: { type: String },
    refreshRate: { type: Number },
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    expandableStorage: { type: Boolean, default: false },

    // Camera
    rearCamera: { type: String, required: true },
    frontCamera: { type: String, required: true },
    cameraFeatures: { type: [String] },

    // Battery
    batteryCapacity: { type: Number, required: true },
    chargingSpeed: { type: String },
    wirelessCharging: { type: Boolean, default: false },

    // Connectivity
    simType: { type: String, default: "Nano-SIM" },
    network: { type: String, required: true },
    connectivityFeatures: { type: [String] },

    // Additional features
    waterproof: { type: Boolean, default: false },
    fingerprintSensor: { type: Boolean, default: true },
    faceRecognition: { type: Boolean, default: false },
    colorOptions: { type: [String] },
    weight: { type: String },
    dimensions: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Phone", phoneSchema);
