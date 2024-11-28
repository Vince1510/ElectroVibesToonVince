import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

const AddKeyboardForm = ({ onKeyboardAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    largeDescription: [],
    brand: "",
    category: "Keyboard",
    price: 0,
    dealPrice: 0,
    imageCard: "",
    imageOverview: [],
    commercial: "",
    amount: 0,
    maxAmount: 0,
    state: "",
    color: [],
    model: [],
    seller: "",
    sellerScore: 0,
    deliveryTime: 0,
    oftenBoughtWith: [],
    othersAlsoLookAt: [],
    layout: "",
    connectionType: "",
    switchType: "",
    backlighting: "",
    rgbLighting: "",
    keycapMaterial: "",
    size: "",
    macroKeys: "",
    hotSwappable: "",
    batteryLife: "",
    numPad: false,
    adjustableFeet: false,
    pollingRate: "",
    onboardMemory: false,
    compatibility: [],
    waterproof: false,
    wirelessRange: "",
    weight: "",
    dimensions: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (
      name.includes("Description") ||
      name === "imageOverview" ||
      name === "color" ||
      name === "model" ||
      name === "oftenBoughtWith" ||
      name === "othersAlsoLookAt" ||
      name === "compatibility"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split("\n"), // Convert multiline input to array
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle adding items to arrays
  const handleAddItem = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: [...prevData[name], ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/keyboards/",
        formData
      );
      console.log("Keyboard added successfully:", response.data);
      onKeyboardAdded(response.data); // Call the parent function to update the list
    } catch (error) {
      console.error("Error adding keyboard:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Add a New Keyboard
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(formData).map((key) => {
          if (key === "numPad" || key === "adjustableFeet") {
            // Handle boolean inputs with checkboxes
            return (
              <Grid item xs={12} sm={6} key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData[key]}
                      onChange={handleChange}
                      name={key}
                    />
                  }
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              </Grid>
            );
          }

          // Handle array inputs (e.g., color, model)
          if (Array.isArray(formData[key])) {
            return (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  value={formData[key].join("\n")} // Join array for multi-line display
                  onChange={handleChange}
                  multiline
                />
                <Button onClick={() => handleAddItem(key)}>Add {key}</Button>
              </Grid>
            );
          }

          // Handle normal inputs (strings, numbers, etc.)
          return (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required={
                  key !== "dealPrice" &&
                  key !== "keycapMaterial" &&
                  key !== "batteryLife" &&
                  key !== "pollingRate" &&
                  key !== "weight" &&
                  key !== "dimensions" &&
                  key !== "wirelessRange"
                }
                type={
                  key === "price" ||
                  key === "dealPrice" ||
                  key === "sellerScore" ||
                  key === "deliveryTime" ||
                  key === "amount" ||
                  key === "maxAmount"
                    ? "number"
                    : "text"
                }
                multiline={
                  key === "largeDescription" ||
                  key === "imageOverview" ||
                  key === "oftenBoughtWith" ||
                  key === "othersAlsoLookAt" ||
                  key === "compatibility"
                }
              />
            </Grid>
          );
        })}
      </Grid>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Keyboard
      </Button>
    </form>
  );
};

export default AddKeyboardForm;
