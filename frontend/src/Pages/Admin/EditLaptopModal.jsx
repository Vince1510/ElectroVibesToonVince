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
        await axios.post("http://localhost:4000/api/laptops", formData);
      } else {
        // Edit existing laptop
        await axios.put(
          `http://localhost:4000/api/laptops/${laptopId}`,
          formData
        );
      }
      onLaptopUpdated();
      handleClose();
    } catch (error) {
      console.error("Error saving laptop:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle sx={{ backgroundColor: "#000", color: "#fff" }}>
        {isAdding ? "Add New Laptop" : "Edit Laptop"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#000" }}>
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
            sx={{
              // Custom styling for the input fields
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
        ))}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#000", color: "#fff" }}>
        <Button
          onClick={handleClose}
          sx={{ backgroundColor: "#000", color: "#fff" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{ backgroundColor: "#000", color: "#fff" }}
        >
          {isAdding ? "Add" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditLaptopModal;
