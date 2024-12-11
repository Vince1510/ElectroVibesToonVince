import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import axios from "axios";

const EditGameModal = ({ open, onClose, gameData, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    largeDescription: "",
    brand: "",
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

  useEffect(() => {
    if (gameData) {
      setFormData({
        name: gameData.name || "",
        description: gameData.description || "",
        largeDescription: gameData.largeDescription || "",
        brand: gameData.brand || "",
        price: gameData.price || "",
        dealPrice: gameData.dealPrice || "",
        imageCard: gameData.imageCard || "",
        imageOverview: gameData.imageOverview || "",
        commercial: gameData.commercial || "",
        amount: gameData.amount || "",
        maxAmount: gameData.maxAmount || "",
        state: gameData.state || "",
        color: gameData.color || "",
        model: gameData.model || "",
        seller: gameData.seller || "",
        sellerScore: gameData.sellerScore || "",
        deliveryTime: gameData.deliveryTime || "",
        oftenBoughtWith: gameData.oftenBoughtWith || "",
        othersAlsoLookAt: gameData.othersAlsoLookAt || "",
        releaseDate: gameData.releaseDate || "",
        genre: gameData.genre?.join(", ") || "",
        platform: gameData.platform?.join(", ") || "",
        multiplayerModes: gameData.multiplayerModes?.join(", ") || "",
        ageRating: gameData.ageRating || "",
        languages: gameData.languages?.join(", ") || "",
        specialEditions: gameData.specialEditions || "",
        fileSize: gameData.fileSize || "",
        publisher: gameData.publisher || "",
        developer: gameData.developer || "",
        releaseRegion: gameData.releaseRegion || "",
        exclusiveContent: gameData.exclusiveContent || "",
      });
    }
  }, [gameData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedGame = {
        ...formData,
        genre: formData.genre.split(", "),
        platform: formData.platform.split(", "),
        multiplayerModes: formData.multiplayerModes.split(", "),
        languages: formData.languages.split(", "),
      };
      const response = await axios.put(
        `http://localhost:4000/api/games/${gameData._id}`,
        updatedGame
      );
      onUpdate(response.data); // Notify parent that the game was updated
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  const renderTextField = (label, name, type = "text") => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={formData[name] || ""}
      onChange={handleChange}
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
      type={type}
    />
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          backgroundColor: "#000",
        }}
      >
        Edit Game
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#000",
        }}
      >
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
          <React.Fragment key={field}>
            {renderTextField(field, field)}
          </React.Fragment>
        ))}
      </DialogContent>

      <DialogActions
        sx={{
          backgroundColor: "#000",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: "#fff",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            color: "#fff",
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGameModal;
