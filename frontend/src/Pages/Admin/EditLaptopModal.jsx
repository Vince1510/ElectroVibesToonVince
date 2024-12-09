import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const EditLaptopModal = ({
  laptopId,
  open,
  handleClose,
  onLaptopUpdated,
  isAdding,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    brand: "",
    price: "",
    // Add all other fields you need
  });

  useEffect(() => {
    if (laptopId && !isAdding) {
      // Fetch laptop data for editing
      axios
        .get(`http://localhost:4000/api/laptops/${laptopId}`)
        .then((response) => {
          setFormData(response.data);
        });
    } else if (isAdding) {
      // Reset form for adding a new laptop
      setFormData({
        name: "",
        code: "",
        description: "",
        brand: "",
        price: "",
        // Reset other fields
      });
    }
  }, [laptopId, isAdding]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isAdding) {
        // Add new laptop
        await axios.post("http://localhost:4000/api/laptops", formData);
      } else {
        // Edit existing laptop
        await axios.put(
          `http://localhost:4000/api/laptops/${laptopId}`,
          formData
        );
      }
      onLaptopUpdated(); // Refresh laptop list after submission
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error saving laptop:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>{isAdding ? "Add New Laptop" : "Edit Laptop"}</DialogTitle>
      <DialogContent>
        {/* Render text fields dynamically if you have many fields */}
        {Object.keys(formData).map((key) => (
          <TextField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          {isAdding ? "Add" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditLaptopModal;
