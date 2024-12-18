import mongoose from "mongoose";

const { Schema } = mongoose;

const phoneSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    largeDescription: { type: [String], required: true },
    brand: { type: String, required: true },
    category: { type: String, default: "Phone" },
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
    
    // Phone-specific details
    operatingSystem: { type: String, required: true },
    screenSize: { type: String, required: true },
    screenResolution: { type: String },
    screenTechnology: { type: String },
    refreshRate: { type: Number },
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    expandableStorage: { type: String, required: true },
    
    // Camera
    rearCamera: { type: String, required: true },
    frontCamera: { type: String, required: true },
    cameraFeatures: { type: [String] },

    // Battery
    batteryCapacity: { type: Number, required: true },
    chargingSpeed: { type: String },
    wirelessCharging: { type: String, required: true },
    
    // Connectivity
    simType: { type: String, default: "Nano-SIM" },
    network: { type: String, required: true },
    connectivityFeatures: { type: [String] },

    // Additional features
    waterproof: { type: String, required: true },
    fingerprintSensor: { type: String, required: true },
    faceRecognition: { type: String, required: true },
    colorOptions: { type: [String] },
    weight: { type: String },
    dimensions: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Phone", phoneSchema);
