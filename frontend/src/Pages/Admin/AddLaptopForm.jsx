import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (Array.isArray(formData[name])) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item.trim()), // Handle multiple inputs like arrays
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
      alert("Error adding laptop.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Typography variant="h6">Add a New Laptop</Typography>
      <Grid container spacing={3}>
        {/* Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Laptop Name"
            variant="outlined"
            fullWidth
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>

        {/* Code */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Laptop Code"
            variant="outlined"
            fullWidth
            required
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        {/* Large Description (Array of Strings) */}
        <Grid item xs={12}>
          <TextField
            label="Large Description (comma separated)"
            variant="outlined"
            fullWidth
            name="largeDescription"
            value={formData.largeDescription.join(", ")}
            onChange={handleChange}
          />
        </Grid>

        {/* Brand */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Brand"
            variant="outlined"
            fullWidth
            required
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Grid>

        {/* Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            required
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Deal Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Deal Price"
            variant="outlined"
            fullWidth
            name="dealPrice"
            value={formData.dealPrice}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Image Card */}
        <Grid item xs={12}>
          <TextField
            label="Image Card URL"
            variant="outlined"
            fullWidth
            name="imageCard"
            value={formData.imageCard}
            onChange={handleChange}
          />
        </Grid>

        {/* Image Overview (Array of Strings) */}
        <Grid item xs={12}>
          <TextField
            label="Image Overview URLs (comma separated)"
            variant="outlined"
            fullWidth
            name="imageOverview"
            value={formData.imageOverview.join(", ")}
            onChange={handleChange}
          />
        </Grid>

        {/* Commercial */}
        <Grid item xs={12}>
          <TextField
            label="Commercial"
            variant="outlined"
            fullWidth
            name="commercial"
            value={formData.commercial}
            onChange={handleChange}
          />
        </Grid>

        {/* Amount */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />
        </Grid>

        {/* Max Amount */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Max Amount"
            variant="outlined"
            fullWidth
            name="maxAmount"
            type="number"
            value={formData.maxAmount}
            onChange={handleChange}
          />
        </Grid>

        {/* State */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </Grid>

        {/* Color (Array of Strings) */}
        <Grid item xs={12}>
          <TextField
            label="Color Options (comma separated)"
            variant="outlined"
            fullWidth
            name="color"
            value={formData.color.join(", ")}
            onChange={handleChange}
          />
        </Grid>

        {/* Model (Array of Strings) */}
        <Grid item xs={12}>
          <TextField
            label="Model (comma separated)"
            variant="outlined"
            fullWidth
            name="model"
            value={formData.model.join(", ")}
            onChange={handleChange}
          />
        </Grid>

        {/* Seller */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Seller"
            variant="outlined"
            fullWidth
            name="seller"
            value={formData.seller}
            onChange={handleChange}
          />
        </Grid>

        {/* Seller Score */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Seller Score"
            variant="outlined"
            fullWidth
            name="sellerScore"
            value={formData.sellerScore}
            onChange={handleChange}
          />
        </Grid>

        {/* Delivery Time */}
        <Grid item xs={12}>
          <TextField
            label="Delivery Time"
            variant="outlined"
            fullWidth
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
          />
        </Grid>

        {/* Often Bought With (Array of Strings) */}
        <Grid item xs={12}>
          <TextField
            label="Often Bought With (comma separated)"
            variant="outlined"
            fullWidth
            name="oftenBoughtWith"
            value={formData.oftenBoughtWith.join(", ")}
            onChange={handleChange}
          />
        </Grid>

        {/* Others Also Look At (Array of Strings) */}
        <Grid item xs={12}>
          <TextField
            label="Others Also Look At (comma separated)"
            variant="outlined"
            fullWidth
            name="othersAlsoLookAt"
            value={formData.othersAlsoLookAt.join(", ")}
            onChange={handleChange}
          />
        </Grid>

        {/* Operating System */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Operating System"
            variant="outlined"
            fullWidth
            name="operatingSystem"
            value={formData.operatingSystem}
            onChange={handleChange}
          />
        </Grid>

        {/* Screen Size */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Screen Size"
            variant="outlined"
            fullWidth
            name="screenSize"
            value={formData.screenSize}
            onChange={handleChange}
          />
        </Grid>

        {/* Screen Resolution */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Screen Resolution"
            variant="outlined"
            fullWidth
            name="screenResolution"
            value={formData.screenResolution}
            onChange={handleChange}
          />
        </Grid>

        {/* Screen Technology */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Screen Technology"
            variant="outlined"
            fullWidth
            name="screenTechnology"
            value={formData.screenTechnology}
            onChange={handleChange}
          />
        </Grid>

        {/* Processor */}
        <Grid item xs={12}>
          <TextField
            label="Processor"
            variant="outlined"
            fullWidth
            name="processor"
            value={formData.processor}
            onChange={handleChange}
          />
        </Grid>

        {/* RAM */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="RAM"
            variant="outlined"
            fullWidth
            name="ram"
            value={formData.ram}
            onChange={handleChange}
          />
        </Grid>

        {/* Storage */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Storage"
            variant="outlined"
            fullWidth
            name="storage"
            value={formData.storage}
            onChange={handleChange}
          />
        </Grid>

        {/* Expandable Storage */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Expandable Storage"
            variant="outlined"
            fullWidth
            name="expandableStorage"
            value={formData.expandableStorage}
            onChange={handleChange}
          />
        </Grid>

        {/* GPU */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="GPU"
            variant="outlined"
            fullWidth
            name="gpu"
            value={formData.gpu}
            onChange={handleChange}
          />
        </Grid>

        {/* Refresh Rate */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Refresh Rate"
            variant="outlined"
            fullWidth
            name="refreshRate"
            value={formData.refreshRate}
            onChange={handleChange}
          />
        </Grid>

        {/* Touchscreen */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Touch Screen"
            variant="outlined"
            fullWidth
            name="touchScreen"
            value={formData.touchScreen}
            onChange={handleChange}
          />
        </Grid>

        {/* Battery Capacity */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Battery Capacity"
            variant="outlined"
            fullWidth
            name="batteryCapacity"
            value={formData.batteryCapacity}
            onChange={handleChange}
          />
        </Grid>

        {/* Battery Life */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Battery Life"
            variant="outlined"
            fullWidth
            name="batteryLife"
            value={formData.batteryLife}
            onChange={handleChange}
          />
        </Grid>

        {/* Charging Speed */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Charging Speed"
            variant="outlined"
            fullWidth
            name="chargingSpeed"
            value={formData.chargingSpeed}
            onChange={handleChange}
          />
        </Grid>

        {/* Connectivity Ports */}
        <Grid item xs={12}>
          <TextField
            label="Connectivity Ports (comma separated)"
            variant="outlined"
            fullWidth
            name="connectivityPorts"
            value={formData.connectivityPorts.join(", ")}
            onChange={handleChange}
          />
        </Grid>

        {/* WiFi Support */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="WiFi Support"
            variant="outlined"
            fullWidth
            name="wifiSupport"
            value={formData.wifiSupport}
            onChange={handleChange}
          />
        </Grid>

        {/* Bluetooth Version */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Bluetooth Version"
            variant="outlined"
            fullWidth
            name="bluetoothVersion"
            value={formData.bluetoothVersion}
            onChange={handleChange}
          />
        </Grid>

        {/* Weight */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Weight"
            variant="outlined"
            fullWidth
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </Grid>

        {/* Dimensions */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Dimensions"
            variant="outlined"
            fullWidth
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
          />
        </Grid>

        {/* Fingerprint Sensor */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fingerprint Sensor"
            variant="outlined"
            fullWidth
            name="fingerprintSensor"
            value={formData.fingerprintSensor}
            onChange={handleChange}
          />
        </Grid>

        {/* Webcam */}
        <Grid item xs={12}>
          <TextField
            label="Webcam"
            variant="outlined"
            fullWidth
            name="webcam"
            value={formData.webcam}
            onChange={handleChange}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {loading ? <CircularProgress size={24} /> : "Add Laptop"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddLaptopForm;
