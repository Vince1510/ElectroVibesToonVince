  import mongoose from "mongoose";

  const { Schema } = mongoose;

  const laptopSchema = new Schema(
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
      description: { type: String, required: true },
      largeDescription: { type: [String], required: true },
      brand: { type: String, required: true },
      category: { type: String, default: 'Laptop' },
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
      
      // Laptop-specific details
      operatingSystem: { type: String, required: true },
      screenSize: { type: String, required: true },
      screenResolution: { type: String },
      screenTechnology: { type: String },
      processor: { type: String, required: true },
      ram: { type: String, required: true },
      storage: { type: String, required: true },
      expandableStorage: { type: String, required: true },
      
      // Graphics and Display
      gpu: { type: String },
      refreshRate: { type: Number },
      touchScreen: { type: String, required: true },
      
      // Battery
      batteryCapacity: { type: Number },
      batteryLife: { type: String },
      chargingSpeed: { type: String },
      
      // Connectivity
      connectivityPorts: { type: [String] },
      wifiSupport: { type: String, required: true },
      bluetoothVersion: { type: String },
      
      // Additional features
      weight: { type: String },
      dimensions: { type: String },
      colorOptions: { type: [String] },
      fingerprintSensor: { type: String, required: true },
      webcam: { type: String, required: true },
    },
    { timestamps: true }
  );

  export default mongoose.model("Laptop", laptopSchema);
