import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const AddKeyboardForm = ({ onKeyboardAdded }) => {
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
    rearCamera: "",
    frontCamera: "",
    cameraFeatures: "",
    batteryCapacity: "",
    chargingSpeed: "",
    wirelessCharging: "",
    simType: "",
    network: "",
    connectivityFeatures: "",
    waterproof: true,
    fingerprintSensor: "",
    faceRecognition: "",
    colorOptions: "",
    weight: "",
    dimensions: "",
    layout: "",
    connectionType: "",
    switchType: "",
    backlighting: "",
    rgbLighting: true,
    macroKeys: true,
    hotSwappable: false,
    numPad: true,
    adjustableFeet: true,
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
        "http://localhost:4000/api/keyboards/",
        formData
      );
      onKeyboardAdded(response.data);
      setFormData(initialState); // Clear form after submission
    } catch (error) {
      console.error("Error adding keyboard:", error);
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
            />
          </Grid>
        ))}
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add Keyboard
      </Button>
    </form>
  );
};

export default AddKeyboardForm;
