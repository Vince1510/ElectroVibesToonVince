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
      setEditedMouse(mouse); // Initialize with the selected mouse's data
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
    onSave(editedMouse); // Save changes
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Mouse</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <TextField
            key={field}
            margin="dense"
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={editedMouse[field] || ""}
            onChange={handleChange}
            fullWidth
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMiceModal;
