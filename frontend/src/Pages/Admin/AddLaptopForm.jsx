import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

const AddLaptopForm = ({ onLaptopAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    largeDescription: [""],
    brand: "",
    category: "",
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
    processor: "",
    ram: "",
    storage: "",
    expandableStorage: "",
    gpu: "",
    refreshRate: "",
    touchScreen: "",
    batteryCapacity: "",
    batteryLife: "",
    chargingSpeed: "",
    connectivityPorts: [""],
    wifiSupport: "",
    bluetoothVersion: "",
    weight: "",
    dimensions: "",
    colorOptions: [""],
    fingerprintSensor: "",
    webcam: "",
  });

  const [loading, setLoading] = useState(false);

  const formFields = [
    { label: "Laptop Name", name: "name", type: "text", required: true },
    { label: "Laptop Code", name: "code", type: "text", required: true },
    { label: "Description", name: "description", type: "text", required: true },
    {
      label: "Large Description",
      name: "largeDescription",
      type: "text",
      array: true,
    },
    { label: "Brand", name: "brand", type: "text", required: true },
    { label: "Category", name: "category", type: "text", required: true },
    {
      label: "Price",
      name: "price",
      type: "number",
      required: true,
    },
    { label: "Deal Price", name: "dealPrice", type: "number" },
    { label: "Image Card URL", name: "imageCard", type: "text" },
    {
      label: "Image Overview",
      name: "imageOverview",
      type: "text",
      array: true,
    },
    { label: "Commercial", name: "commercial", type: "text" },
    { label: "Amount", name: "amount", type: "number" },
    { label: "Max Amount", name: "maxAmount", type: "number" },
    { label: "State", name: "state", type: "text" },
    { label: "Color Options", name: "color", type: "text", array: true },
    { label: "Model", name: "model", type: "text", array: true },
    { label: "Seller", name: "seller", type: "text" },
    { label: "Seller Score", name: "sellerScore", type: "text" },
    { label: "Delivery Time", name: "deliveryTime", type: "text" },
    {
      label: "Often Bought With",
      name: "oftenBoughtWith",
      type: "text",
      array: true,
    },
    {
      label: "Others Also Look At",
      name: "othersAlsoLookAt",
      type: "text",
      array: true,
    },
    { label: "Operating System", name: "operatingSystem", type: "text" },
    { label: "Screen Size", name: "screenSize", type: "text" },
    { label: "Screen Resolution", name: "screenResolution", type: "text" },
    { label: "Screen Technology", name: "screenTechnology", type: "text" },
    { label: "Processor", name: "processor", type: "text" },
    { label: "RAM", name: "ram", type: "text" },
    { label: "Storage", name: "storage", type: "text" },
    { label: "Expandable Storage", name: "expandableStorage", type: "text" },
    { label: "GPU", name: "gpu", type: "text" },
    { label: "Refresh Rate", name: "refreshRate", type: "text" },
    { label: "Touch Screen", name: "touchScreen", type: "text" },
    { label: "Battery Capacity", name: "batteryCapacity", type: "text" },
    { label: "Battery Life", name: "batteryLife", type: "text" },
    { label: "Charging Speed", name: "chargingSpeed", type: "text" },
    {
      label: "Connectivity Ports",
      name: "connectivityPorts",
      type: "text",
      array: true,
    },
    { label: "WiFi Support", name: "wifiSupport", type: "text" },
    { label: "Bluetooth Version", name: "bluetoothVersion", type: "text" },
    { label: "Weight", name: "weight", type: "text" },
    { label: "Dimensions", name: "dimensions", type: "text" },
    { label: "Color Options", name: "colorOptions", type: "text", array: true },
    { label: "Fingerprint Sensor", name: "fingerprintSensor", type: "text" },
    { label: "Webcam", name: "webcam", type: "text" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (Array.isArray(formData[name])) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/api/laptops", formData);
      setLoading(false);
      onLaptopAdded(); // Refresh the laptop list after adding
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Grid container spacing={3}>
        {formFields.map((field, index) => (
          <Grid item xs={12} sm={field.array ? 12 : 6} key={index}>
            <TextField
              label={field.label}
              variant="outlined"
              fullWidth
              required={field.required}
              name={field.name}
              value={
                field.array
                  ? formData[field.name].join(", ")
                  : formData[field.name]
              }
              onChange={handleChange}
              type={field.type}
              InputProps={
                field.adornment
                  ? {
                      startAdornment: (
                        <InputAdornment position="start">
                          {field.adornment}
                        </InputAdornment>
                      ),
                    }
                  : {}
              }
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Laptop"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddLaptopForm;
