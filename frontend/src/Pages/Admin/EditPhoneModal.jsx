import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import axios from "axios";

const EditPhoneModal = ({ open, onClose, phoneData, onPhoneUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    brand: "",
    category: "Phone", // default value
    price: "",
    dealPrice: "",
    imageCard: "",
    commercial: "",
    amount: "",
    maxAmount: "",
    state: "",
    seller: "",
    sellerScore: "",
    deliveryTime: "",
    operatingSystem: "",
    screenSize: "",
    screenResolution: "",
    screenTechnology: "",
    refreshRate: "",
    processor: "",
    ram: "",
    storage: "",
    expandableStorage: "",
    rearCamera: "",
    frontCamera: "",
    batteryCapacity: "",
    chargingSpeed: "",
    wirelessCharging: "",
    simType: "Nano-SIM", // default value
    network: "",
    waterproof: "",
    fingerprintSensor: "",
    faceRecognition: "",
    weight: "",
    dimensions: "",
    largeDescription: [""],
  });

  // List of all fields to render
  const fields = [
    { name: "name", label: "Name" },
    { name: "code", label: "Code" },
    { name: "description", label: "Description" },
    { name: "brand", label: "Brand" },
    { name: "category", label: "Category", defaultValue: "Phone" },
    { name: "price", label: "Price", type: "number" },
    { name: "dealPrice", label: "Deal Price", type: "number" },
    { name: "imageCard", label: "Image URL" },
    { name: "commercial", label: "Commercial" },
    { name: "amount", label: "Amount", type: "number" },
    { name: "maxAmount", label: "Max Amount", type: "number" },
    { name: "state", label: "State" },
    { name: "seller", label: "Seller" },
    { name: "sellerScore", label: "Seller Score", type: "number" },
    { name: "deliveryTime", label: "Delivery Time" },
    { name: "operatingSystem", label: "Operating System" },
    { name: "screenSize", label: "Screen Size" },
    { name: "screenResolution", label: "Screen Resolution" },
    { name: "screenTechnology", label: "Screen Technology" },
    { name: "refreshRate", label: "Refresh Rate" },
    { name: "processor", label: "Processor" },
    { name: "ram", label: "RAM" },
    { name: "storage", label: "Storage" },
    { name: "expandableStorage", label: "Expandable Storage" },
    { name: "rearCamera", label: "Rear Camera" },
    { name: "frontCamera", label: "Front Camera" },
    { name: "batteryCapacity", label: "Battery Capacity" },
    { name: "chargingSpeed", label: "Charging Speed" },
    { name: "wirelessCharging", label: "Wireless Charging" },
    { name: "simType", label: "SIM Type", defaultValue: "Nano-SIM" },
    { name: "network", label: "Network" },
    { name: "waterproof", label: "Waterproof" },
    { name: "fingerprintSensor", label: "Fingerprint Sensor" },
    { name: "faceRecognition", label: "Face Recognition" },
    { name: "weight", label: "Weight" },
    { name: "dimensions", label: "Dimensions" },
    { name: "largeDescription", label: "Large Description" },
  ];

  // Fill form data with existing phone data when the modal opens
  useEffect(() => {
    if (phoneData) {
      setFormData({ ...phoneData });
    }
  }, [phoneData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit the form
  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/phones/${phoneData._id}`,
        formData
      );
      onPhoneUpdated(); // Refresh the list after updating
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating phone:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ backgroundColor: "#000", color: "#fff" }}>
        Edit Phone
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#000", color: "#fff" }}>
        <form>
          {fields.map(({ name, label, type = "text", defaultValue }) => (
            <TextField
              key={name}
              label={label}
              name={name}
              type={type}
              value={formData[name] || defaultValue || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={{
                // Custom styling for the input fields
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#000",
                  color: "#fff",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: "#fff",
                  fontWeight: "bold",
                },
              }}
            />
          ))}
        </form>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#000", color: "#fff" }}>
        <Button
          onClick={handleSubmit}
          sx={{
            color: "#fff",
          }}
        >
          Save
        </Button>
        <Button
          onClick={onClose}
          sx={{
            color: "#fff",
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPhoneModal;
