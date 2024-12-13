import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
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
      onAddMouse(response.data);
      setFormData(initialState);
    } catch (error) {
      console.error("Error adding mouse:", error);
    }
  };

  const fieldNames = Object.keys(initialState);

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle sx={{ backgroundColor: "#000", color: "white" }}>
        Add a Monitor
      </DialogTitle>{" "}
      <Grid container spacing={2} sx={{ backgroundColor: "black" }}>
        {fieldNames.map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              label={field.replace(/([A-Z])/g, " $1").toLowerCase()}
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
              }
              sx={{
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
      <Box sx={{ backgroundColor: "black" }}>
        <Button variant="contained" color="primary" type="submit">
          Add Mouse
        </Button>
      </Box>
    </form>
  );
};

export default AddMiceForm;
