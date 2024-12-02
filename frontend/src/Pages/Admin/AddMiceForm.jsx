import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import axios from "axios";

const AddMiceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    largeDescription: [""],
    brand: "",
    category: "Phone",
    price: "",
    dealPrice: "",
    imageCard: "",
    imageOverview: [""],
    commercial: "",
    amount: "",
    maxAmount: "",
    state: "",
    color: [""],
    model: [""],
    seller: "",
    sellerScore: "",
    deliveryTime: "",
    oftenBoughtWith: [""],
    othersAlsoLookAt: [""],
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
    cameraFeatures: [""],
    batteryCapacity: "",
    chargingSpeed: "",
    wirelessCharging: "",
    simType: "Nano-SIM",
    network: "",
    connectivityFeatures: [""],
    waterproof: "",
    fingerprintSensor: "",
    faceRecognition: "",
    colorOptions: [""],
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

  const handleArrayChange = (e, index, key) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedArray = [...prev[key]];
      updatedArray[index] = value;
      return { ...prev, [key]: updatedArray };
    });
  };

  const addArrayField = (key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], ""],
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => {
            if (Array.isArray(formData[key])) {
              return (
                <Grid item xs={12} key={key}>
                  <Typography>{key}</Typography>
                  {formData[key].map((item, index) => (
                    <Grid item xs={12} key={`${key}-${index}`}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={`${key} ${index + 1}`}
                        name={key}
                        value={item}
                        onChange={(e) => handleArrayChange(e, index, key)}
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
                  <Button variant="outlined" onClick={() => addArrayField(key)}>
                    Add another {key}
                  </Button>
                </Grid>
              );
            } else {
              return (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
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
              );
            }
          })}
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
