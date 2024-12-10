import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Container,
  Grid,
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
        specialEditions: "",
        fileSize: "",
        publisher: "",
        developer: "",
        releaseRegion: "",
        exclusiveContent: "",
      });
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  const textFields = [
    "name",
    "description",
    "largeDescription",
    "brand",
    "price",
    "dealPrice",
    "imageCard",
    "imageOverview",
    "commercial",
    "amount",
    "maxAmount",
    "state",
    "color",
    "model",
    "seller",
    "sellerScore",
    "deliveryTime",
    "oftenBoughtWith",
    "othersAlsoLookAt",
    "releaseDate",
    "genre",
    "platform",
    "multiplayerModes",
    "ageRating",
    "languages",
    "specialEditions",
    "fileSize",
    "publisher",
    "developer",
    "releaseRegion",
    "exclusiveContent",
  ];

  const checkboxes = [
    { name: "multiplayerSupport", label: "Multiplayer Support" },
    { name: "dlcAvailable", label: "DLC Available" },
    { name: "achievements", label: "Achievements" },
    { name: "inAppPurchases", label: "In-App Purchases" },
    { name: "physicalEdition", label: "Physical Edition" },
    { name: "vrSupport", label: "VR Support" },
  ];

  const systemReqFields = ["minimum", "recommended"];

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* First Column */}
          <Grid item xs={12} sm={6}>
            {textFields.map((field) => (
              <Grid key={field} item xs={12}>
                <TextField
                  label={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  fullWidth
                  required={["name", "description", "price"].includes(field)}
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

          {/* Second Column (Checkboxes and System Requirements) */}
          <Grid item xs={12} sm={6}>
            {checkboxes.map(({ name, label }) => (
              <Grid key={name} item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData[name]}
                      onChange={handleChange}
                      name={name}
                      color="primary"
                    />
                  }
                  label={label}
                />
              </Grid>
            ))}

            {/* System Requirements */}
            {systemReqFields.map((type) => (
              <Grid key={type} item xs={12}>
                <TextField
                  label={`${type.replace(/^./, (str) =>
                    str.toUpperCase()
                  )} System Requirements`}
                  name={`systemRequirements.${type}`}
                  value={formData.systemRequirements?.[type]}
                  onChange={handleChange}
                  fullWidth
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
        </Grid>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Game
        </Button>
      </Box>
    </Container>
  );
};

export default AddGameForm;
