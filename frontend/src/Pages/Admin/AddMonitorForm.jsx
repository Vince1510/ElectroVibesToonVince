import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import axios from "axios";

const AddMonitorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    largeDescription: [""],
    brand: "",
    category: "Monitor",
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
    resolution: "",
    size: "",
    refreshRate: "",
    panelType: "",
    aspectRatio: "",
    brightness: "",
    contrastRatio: "",
    curved: false,
    responseTime: "",
    colorGamut: "",
    hdrSupport: false,
    hdrStandard: "",
    viewingAngle: "",
    connectivityPorts: [""],
    usbPorts: "",
    hdmiVersion: "",
    displayPortVersion: "",
    audioOutput: false,
    builtInSpeakers: false,
    heightAdjustable: false,
    swivel: false,
    tilt: false,
    pivot: false,
    vesaMount: "",
    blueLightFilter: false,
    flickerFree: false,
    energyRating: "",
    weight: "",
    dimensions: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleArrayChange = (e, name, index) => {
    const { value } = e.target;
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [name]: updatedArray,
    });
  };

  const handleAddArrayField = (name) => {
    setFormData({
      ...formData,
      [name]: [...formData[name], ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/monitors",
        formData
      );
      console.log("Monitor added successfully:", response.data);
    } catch (error) {
      console.error("Error adding monitor:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Text Inputs */}
        {[
          "name",
          "description",
          "brand",
          "category",
          "price",
          "dealPrice",
          "imageCard",
          "commercial",
          "amount",
          "maxAmount",
          "state",
          "seller",
          "sellerScore",
          "deliveryTime",
          "resolution",
          "size",
          "refreshRate",
          "panelType",
          "aspectRatio",
          "brightness",
          "contrastRatio",
          "responseTime",
          "colorGamut",
          "hdrStandard",
          "viewingAngle",
          "usbPorts",
          "hdmiVersion",
          "displayPortVersion",
          "vesaMount",
          "energyRating",
          "weight",
          "dimensions",
        ].map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              label={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              required={
                field !== "dealPrice" &&
                field !== "hdrStandard" &&
                field !== "viewingAngle" &&
                field !== "usbPorts" &&
                field !== "hdmiVersion" &&
                field !== "displayPortVersion" &&
                field !== "energyRating" &&
                field !== "weight" &&
                field !== "dimensions"
              } // Optional fields are not required
            />
          </Grid>
        ))}

        {/* Checkbox Inputs */}
        {[
          { name: "curved", label: "Curved" },
          { name: "hdrSupport", label: "HDR Support" },
          { name: "audioOutput", label: "Audio Output" },
          { name: "builtInSpeakers", label: "Built-in Speakers" },
          { name: "heightAdjustable", label: "Height Adjustable" },
          { name: "swivel", label: "Swivel" },
          { name: "tilt", label: "Tilt" },
          { name: "pivot", label: "Pivot" },
          { name: "blueLightFilter", label: "Blue Light Filter" },
          { name: "flickerFree", label: "Flicker-Free" },
        ].map((checkboxField) => (
          <Grid item xs={12} sm={6} key={checkboxField.name}>
            <FormControlLabel
              control={
                <Checkbox
                  name={checkboxField.name}
                  checked={formData[checkboxField.name]}
                  onChange={handleChange}
                />
              }
              label={checkboxField.label}
            />
          </Grid>
        ))}

        {/* Array Inputs */}
        {[
          { name: "largeDescription", label: "Large Description" },
          { name: "imageOverview", label: "Image Overview" },
          { name: "color", label: "Color" },
          { name: "model", label: "Model" },
          { name: "oftenBoughtWith", label: "Often Bought With" },
          { name: "othersAlsoLookAt", label: "Others Also Look At" },
          { name: "connectivityPorts", label: "Connectivity Ports" },
        ].map((arrayField, index) => (
          <Grid item xs={12} sm={12} key={arrayField.name}>
            <Typography>{arrayField.label}</Typography>
            {formData[arrayField.name].map((item, idx) => (
              <TextField
                key={`${arrayField.name}-${idx}`}
                label={`${arrayField.label} ${idx + 1}`}
                name={arrayField.name}
                value={item}
                onChange={(e) => handleArrayChange(e, arrayField.name, idx)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
            ))}
            <Button
              onClick={() => handleAddArrayField(arrayField.name)}
              variant="contained"
            >
              Add More {arrayField.label}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Monitor
      </Button>
    </form>
  );
};

export default AddMonitorForm;
