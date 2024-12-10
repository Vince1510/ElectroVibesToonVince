import mongoose from "mongoose";

const mouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    largeDescription: { type: [String], required: true },
    brand: { type: String, required: true },
    category: { type: String, default: 'Mouse' },
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
  
    // Mouse-specific details
    dpi: { type: String, required: true }, 
    wireless: { type: Boolean, required: true },
    rgb: { type: Boolean, required: true },
    ergonomicDesign: { type: String, required: true }, 
    programmableButtons: { type: Number, required: true }, 
    weightAdjustment: { type: Boolean, required: true },
    sensorType: { type: String, required: true },
    pollingRate: { type: String, required: true }, 
    batteryLife: { type: String }, 
    wirelessRange: { type: String }, 
    dragCoefficient: { type: String }, 
  
    // Additional features
    compatibility: { type: [String], required: true }, 
    dimensions: { type: String }, 
    weight: { type: String }, 
    waterproof: { type: Boolean }, 
  },  
  { timestamps: true }
);

const Mouse = mongoose.model("Mouse", mouseSchema);

export default Mouse;
