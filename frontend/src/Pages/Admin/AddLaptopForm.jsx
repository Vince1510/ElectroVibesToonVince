import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";

const AddLaptopForm = ({ onLaptopAdded }) => {
  const initialState = {
    name: "",
    code: "",
    description: "",
    largeDescription: "",
    brand: "",
    category: "",
    price: "",
    dealPrice: "",
    imageCard: "",
    imageOverview: "",
    commercial: "",
    amount: "",
    maxAmount: "",
    state: "",
    color: "",
    model: "",
    seller: "",
    sellerScore: "",
    deliveryTime: "",
    oftenBoughtWith: "",
    othersAlsoLookAt: "",
    operatingSystem: "",
    screenSize: "",
    screenResolution: "",
    screenTechnology: "",
    refreshRate: "",
    processor: "",
    ram: "",
    storage: "",
    expandableStorage: "",
    gpu: "",
    batteryCapacity: "",
    batteryLife: "",
    chargingSpeed: "",
    connectivityPorts: "",
    wifiSupport: "",
    bluetoothVersion: "",
    weight: "",
    dimensions: "",
    fingerprintSensor: "",
    webcam: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/laptops",
        formData
      );
      onLaptopAdded(response.data);
      setFormData(initialState); // Clear form after submission
    } catch (error) {
      console.error("Error adding laptop:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {Object.keys(formData).map((field, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              fullWidth
              label={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              required
              sx={{
                // Custom styling for the input fields
                "& .MuiOutlinedInput-root": {
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
          </Grid>
        ))}
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add Laptop
      </Button>
    </form>
  );
};

export default AddLaptopForm;
