import mongoose from "mongoose";

const monitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    largeDescription: { type: [String], required: true },
    brand: { type: String, required: true },
    category: { type: String, default: 'Monitor' },
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
    oftenBoughtWith: { type: [String], required: true },
    othersAlsoLookAt: { type: [String], required: true },
  
    // Monitor-specific details
    resolution: { type: String, required: true }, 
    size: { type: String, required: true }, 
    refreshRate: { type: String, required: true }, 
    panelType: { type: String, required: true }, 
    aspectRatio: { type: String, required: true }, 
    brightness: { type: String, required: true }, 
    contrastRatio: { type: String, required: true },
    curved: { type: Boolean, required: true }, 
    responseTime: { type: String, required: true }, 
    colorGamut: { type: String, required: true }, 
    hdrSupport: { type: Boolean, required: true },
    hdrStandard: { type: String }, 
    viewingAngle: { type: String },
  
    // Connectivity
    connectivityPorts: { type: [String], required: true },
    usbPorts: { type: String }, 
    hdmiVersion: { type: String },
    displayPortVersion: { type: String }, 
    audioOutput: { type: Boolean, required: true }, 
    builtInSpeakers: { type: Boolean, required: true }, 
  
    // Additional Features
    heightAdjustable: { type: Boolean, required: true },
    swivel: { type: Boolean, required: true }, 
    tilt: { type: Boolean, required: true }, 
    pivot: { type: Boolean, required: true }, 
    vesaMount: { type: String, required: true },
    blueLightFilter: { type: Boolean, required: true },
    flickerFree: { type: Boolean, required: true }, 
    energyRating: { type: String },
    weight: { type: String },
    dimensions: { type: String },
  },  
  { timestamps: true }
);

const Monitor = mongoose.model("Monitor", monitorSchema);

export default Monitor;