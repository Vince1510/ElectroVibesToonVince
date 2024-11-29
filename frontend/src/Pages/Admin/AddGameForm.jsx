import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Modal,
  IconButton,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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

  const [open, setOpen] = useState(false);

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
      setOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <Container>
      {/* Plus Icon Button */}
      <IconButton
        color="primary"
        aria-label="add game"
        onClick={() => setOpen(true)}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </IconButton>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="add-game-modal-title"
        aria-describedby="add-game-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "black",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            overflowY: "auto",
            maxHeight: "90vh",
            scrollBehavior: "smooth",
            color: "white", // Ensure text color is white
          }}
        >
          <Typography
            variant="h6"
            id="add-game-modal-title"
            sx={{ mb: 2, color: "white" }}
          >
            Add New Game
          </Typography>

          {/* Fields */}
          {[
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
          ].map((field) => (
            <TextField
              key={field}
              label={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              required={["name", "description", "price"].includes(field)}
              sx={{
                mb: 2,
                "& .MuiInputBase-input": {
                  color: "white", // Set text color to white
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Set border color to white
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Set hover border color to white
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Set focus border color to white
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Set label color to white
                },
              }}
            />
          ))}

          {/* Checkboxes */}
          {[
            { name: "multiplayerSupport", label: "Multiplayer Support" },
            { name: "dlcAvailable", label: "DLC Available" },
            { name: "achievements", label: "Achievements" },
            { name: "inAppPurchases", label: "In-App Purchases" },
            { name: "physicalEdition", label: "Physical Edition" },
            { name: "vrSupport", label: "VR Support" },
          ].map((checkbox) => (
            <FormControlLabel
              key={checkbox.name}
              control={
                <Checkbox
                  checked={formData[checkbox.name]}
                  onChange={handleChange}
                  name={checkbox.name}
                  color="primary"
                  sx={{ color: "white" }}
                />
              }
              label={checkbox.label}
              sx={{ color: "white" }}
            />
          ))}

          {/* System Requirements */}
          {["minimum", "recommended"].map((type) => (
            <TextField
              key={type}
              label={`${type.replace(/^./, (str) =>
                str.toUpperCase()
              )} System Requirements`}
              name={`systemRequirements.${type}`}
              value={formData.systemRequirements?.[type]}
              onChange={handleChange}
              fullWidth
              sx={{
                mb: 2,
                "& .MuiInputBase-input": {
                  color: "white", // Set text color to white
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Set border color to white
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Set hover border color to white
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Set focus border color to white
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Set label color to white
                },
              }}
            />
          ))}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, backgroundColor: "white", color: "black" }}
          >
            Add Game
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AddGameForm;
