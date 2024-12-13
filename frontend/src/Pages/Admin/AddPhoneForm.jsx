import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid } from "@mui/material";

const AddPhoneForm = ({ onPhoneAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    brand: "",
    category: "Phone",
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
    simType: "Nano-SIM",
    network: "",
    waterproof: "",
    fingerprintSensor: "",
    faceRecognition: "",
    weight: "",
    dimensions: "",
    largeDescription: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [name]: e.target.checked });
    } else if (Array.isArray(formData[name])) {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/phones/", formData);
      onPhoneAdded();
    } catch (error) {
      console.error("Error adding phone:", error);
    }
  };

  const fields = [
    { label: "Name", name: "name" },
    { label: "Code", name: "code" },
    { label: "Description", name: "description", xs: 12 },
    { label: "Brand", name: "brand", xs: 12 },
    { label: "Category", name: "category", xs: 12 },
    { label: "Price", name: "price", type: "number", sm: 6 },
    { label: "Deal Price", name: "dealPrice", type: "number", sm: 6 },
    { label: "Image Card", name: "imageCard", xs: 12 },
    { label: "Commercial", name: "commercial", xs: 12 },
    { label: "Amount", name: "amount", type: "number", sm: 6 },
    { label: "Max Amount", name: "maxAmount", type: "number", sm: 6 },
    { label: "State", name: "state", xs: 12 },
    { label: "Seller", name: "seller", xs: 12 },
    { label: "Seller Score", name: "sellerScore", type: "number", sm: 6 },
    { label: "Delivery Time", name: "deliveryTime", type: "number", sm: 6 },
    { label: "Operating System", name: "operatingSystem", sm: 6 },
    { label: "Screen Size", name: "screenSize", sm: 6 },
    { label: "Screen Resolution", name: "screenResolution", xs: 12 },
    { label: "Screen Technology", name: "screenTechnology", xs: 12 },
    { label: "Refresh Rate", name: "refreshRate", type: "number", xs: 12 },
    { label: "Processor", name: "processor", xs: 12 },
    { label: "RAM", name: "ram", xs: 12 },
    { label: "Storage", name: "storage", xs: 12 },
    { label: "Expandable Storage", name: "expandableStorage", xs: 12 },
    { label: "Rear Camera", name: "rearCamera", xs: 12 },
    { label: "Front Camera", name: "frontCamera", xs: 12 },
    {
      label: "Battery Capacity",
      name: "batteryCapacity",
      type: "number",
      xs: 12,
    },
    { label: "Charging Speed", name: "chargingSpeed", type: "number", xs: 12 },
    { label: "Wireless Charging", name: "wirelessCharging", xs: 12 },
    { label: "SIM Type", name: "simType", xs: 12 },
    { label: "Network", name: "network", xs: 12 },
    { label: "Waterproof", name: "waterproof", xs: 12 },
    { label: "Fingerprint Sensor", name: "fingerprintSensor", xs: 12 },
    { label: "Face Recognition", name: "faceRecognition", xs: 12 },
    { label: "Weight", name: "weight", xs: 12 },
    { label: "Dimensions", name: "dimensions", xs: 12 },
    { label: "Large Description", name: "largeDescription", xs: 12 },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        {fields.map((field, index) => (
          <Grid item xs={field.xs || 12} sm={field.sm || 12} key={index}>
            <TextField
              sx={{
                // Root class for the input field
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  // Class for the border around the input field
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff",
                    borderWidth: "2px",
                  },
                },
                // Class for the label of the input field
                "& .MuiInputLabel-outlined": {
                  color: "#fff",
                  fontWeight: "bold",
                },
              }}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type={field.type || "text"}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Add Phone
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddPhoneForm;
