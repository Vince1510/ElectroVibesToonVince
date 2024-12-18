import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditMiceModal = ({ mouse, open, onClose, onSave }) => {
  const [editedMouse, setEditedMouse] = useState({});

  useEffect(() => {
    if (mouse) {
      setEditedMouse(mouse);
    }
  }, [mouse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMouse({ ...editedMouse, [name]: value });
  };

  const fields = [
    "name",
    "description",
    "largeDescription",
    "brand",
    "category",
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
    "dpi",
    "wireless",
    "rgb",
    "ergonomicDesign",
    "programmableButtons",
    "weightAdjustment",
    "sensorType",
    "pollingRate",
    "batteryLife",
    "wirelessRange",
    "dragCoefficient",
    "compatibility",
    "dimensions",
    "weight",
    "waterproof",
  ];

  const handleSave = () => {
    onSave(editedMouse);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{ backgroundColor: "#000", color: "#fff" }}
    >
      <DialogTitle sx={{ backgroundColor: "#000", color: "#fff" }}>
        Edit Mouse
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#000", color: "#fff" }}>
        {fields.map((field) => (
          <TextField
            key={field}
            margin="dense"
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={editedMouse[field] || ""}
            onChange={handleChange}
            fullWidth
            sx={{
              // Custom styling for the input fields
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#000",
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
        ))}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#000", color: "#fff" }}>
        <Button
          onClick={onClose}
          sx={{ backgroundColor: "#000", color: "#fff" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{ backgroundColor: "#000", color: "#fff" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMiceModal;
