import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import axios from "axios";

const AddMiceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    largeDescription: [],
    brand: "",
    category: "Phone",
    price: "",
    dealPrice: "",
    imageCard: "",
    imageOverview: [],
    commercial: "",
    amount: "",
    maxAmount: "",
    state: "",
    color: [],
    model: [],
    seller: "",
    sellerScore: "",
    deliveryTime: "",
    oftenBoughtWith: [],
    othersAlsoLookAt: [],
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
    cameraFeatures: [],
    batteryCapacity: "",
    chargingSpeed: "",
    wirelessCharging: "",
    simType: "Nano-SIM",
    network: "",
    connectivityFeatures: [],
    waterproof: "",
    fingerprintSensor: "",
    faceRecognition: "",
    colorOptions: [],
    weight: "",
    dimensions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/phones/",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding phone:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Phone
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                variant="outlined"
                label={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                multiline={Array.isArray(formData[key])}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Phone
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddMiceForm;
