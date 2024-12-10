import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const AddMiceForm = ({ onAddMouse }) => {
  const initialState = {
    name: "",
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
    dpi: "",
    wireless: false,
    rgb: false,
    ergonomicDesign: "",
    programmableButtons: "",
    weightAdjustment: false,
    sensorType: "",
    pollingRate: "",
    batteryLife: "",
    wirelessRange: "",
    dragCoefficient: "",
    compatibility: "",
    dimensions: "",
    weight: "",
    waterproof: false,
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/mice/",
        formData
      );
      onAddMouse(response.data); // Add the new mouse to the list
      setFormData(initialState); // Reset the form
    } catch (error) {
      console.error("Error adding mouse:", error);
    }
  };

  const fieldNames = Object.keys(initialState); // Get all field names

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {fieldNames.map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              label={field.replace(/([A-Z])/g, " $1").toUpperCase()} // Format the label
              variant="outlined"
              fullWidth
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              type={
                field === "price" || field === "dealPrice" ? "number" : "text"
              }
              multiline={
                field === "largeDescription" || field === "description"
              }
              rows={field === "largeDescription" ? 4 : 1}
              disabled={
                field === "createdAt" ||
                field === "updatedAt" ||
                field === "__v"
              } // Disable system fields
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Add Mouse
        </Button>
      </Box>
    </form>
  );
};

export default AddMiceForm;
