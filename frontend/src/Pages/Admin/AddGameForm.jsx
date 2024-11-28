import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const AddGameForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    largeDescription: "",
    brand: "",
    category: "games",
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
    releaseDate: "",
    genre: "",
    platform: "",
    multiplayerSupport: false,
    multiplayerModes: "",
    ageRating: "",
    languages: "",
    dlcAvailable: false,
    specialEditions: "",
    achievements: false,
    inAppPurchases: false,
    fileSize: "",
    systemRequirements: {
      minimum: "",
      recommended: "",
    },
    physicalEdition: false,
    vrSupport: false,
    publisher: "",
    developer: "",
    releaseRegion: "",
    exclusiveContent: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes("systemRequirements")) {
      setFormData({
        ...formData,
        systemRequirements: {
          ...formData.systemRequirements,
          [name.split(".")[1]]: value,
        },
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/games",
        formData
      );
      console.log("Game added:", response.data);
      setFormData({
        name: "",
        description: "",
        largeDescription: "",
        brand: "",
        category: "games",
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
        releaseDate: "",
        genre: "",
        platform: "",
        multiplayerSupport: false,
        multiplayerModes: "",
        ageRating: "",
        languages: "",
        dlcAvailable: false,
        specialEditions: "",
        achievements: false,
        inAppPurchases: false,
        fileSize: "",
        systemRequirements: {
          minimum: "",
          recommended: "",
        },
        physicalEdition: false,
        vrSupport: false,
        publisher: "",
        developer: "",
        releaseRegion: "",
        exclusiveContent: "",
      });
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New Game
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Large Description"
        name="largeDescription"
        value={formData.largeDescription}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Deal Price"
        name="dealPrice"
        value={formData.dealPrice}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Image Card"
        name="imageCard"
        value={formData.imageCard}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Image Overview"
        name="imageOverview"
        value={formData.imageOverview}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Commercial"
        name="commercial"
        value={formData.commercial}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Max Amount"
        name="maxAmount"
        value={formData.maxAmount}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Color"
        name="color"
        value={formData.color}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Model"
        name="model"
        value={formData.model}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Seller"
        name="seller"
        value={formData.seller}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Seller Score"
        name="sellerScore"
        value={formData.sellerScore}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Delivery Time"
        name="deliveryTime"
        value={formData.deliveryTime}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Often Bought With"
        name="oftenBoughtWith"
        value={formData.oftenBoughtWith}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Others Also Look At"
        name="othersAlsoLookAt"
        value={formData.othersAlsoLookAt}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Release Date"
        name="releaseDate"
        value={formData.releaseDate}
        onChange={handleChange}
        fullWidth
        type="date"
        sx={{ mb: 2 }}
      />
      <TextField
        label="Genre"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Platform"
        name="platform"
        value={formData.platform}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.multiplayerSupport}
            onChange={handleChange}
            name="multiplayerSupport"
          />
        }
        label="Multiplayer Support"
      />
      <TextField
        label="Multiplayer Modes"
        name="multiplayerModes"
        value={formData.multiplayerModes}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Age Rating"
        name="ageRating"
        value={formData.ageRating}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Languages"
        name="languages"
        value={formData.languages}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.dlcAvailable}
            onChange={handleChange}
            name="dlcAvailable"
          />
        }
        label="DLC Available"
      />
      <TextField
        label="Special Editions"
        name="specialEditions"
        value={formData.specialEditions}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.achievements}
            onChange={handleChange}
            name="achievements"
          />
        }
        label="Achievements"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.inAppPurchases}
            onChange={handleChange}
            name="inAppPurchases"
          />
        }
        label="In-App Purchases"
      />
      <TextField
        label="File Size"
        name="fileSize"
        value={formData.fileSize}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Minimum System Requirements"
        name="systemRequirements.minimum"
        value={formData.systemRequirements.minimum}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Recommended System Requirements"
        name="systemRequirements.recommended"
        value={formData.systemRequirements.recommended}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.physicalEdition}
            onChange={handleChange}
            name="physicalEdition"
          />
        }
        label="Physical Edition"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.vrSupport}
            onChange={handleChange}
            name="vrSupport"
          />
        }
        label="VR Support"
      />
      <TextField
        label="Publisher"
        name="publisher"
        value={formData.publisher}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Developer"
        name="developer"
        value={formData.developer}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Release Region"
        name="releaseRegion"
        value={formData.releaseRegion}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Exclusive Content"
        name="exclusiveContent"
        value={formData.exclusiveContent}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Game
      </Button>
    </Box>
  );
};

export default AddGameForm;
