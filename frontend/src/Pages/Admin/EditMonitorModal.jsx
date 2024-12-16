import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";

const EditMonitorModal = ({ open, onClose, monitorId }) => {
  const [monitor, setMonitor] = useState(null);

  const [fields, setFields] = useState({
    name: "",
    code: "",
    description: "",
    largeDescription: "",
    brand: "",
    category: "Phone",
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
    operatingSystem: "",
    screenSize: "",
    screenResolution: "",
    screenTechnology: "",
    refreshRate: "",
    processor: "",
    ram: "",
    storage: "",
    expandableStorage: "",
    rearCamera: "",
    frontCamera: "",
    cameraFeatures: "",
    batteryCapacity: "",
    chargingSpeed: "",
    wirelessCharging: "",
    simType: "Nano-SIM",
    network: "",
    connectivityFeatures: "",
    waterproof: "",
    fingerprintSensor: "",
    faceRecognition: "",
    colorOptions: "",
    weight: "",
    dimensions: "",
  });

  useEffect(() => {
    if (monitorId) {
      const fetchMonitorData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/monitors/${monitorId}`
          );
          setMonitor(response.data);
          setFields((prevFields) => ({
            ...prevFields,
            ...response.data,
          }));
        } catch (error) {
          console.error("Error fetching monitor data:", error);
        }
      };
      fetchMonitorData();
    }
  }, [monitorId]);

  if (!monitor) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/monitors/${monitorId}`,
        fields
      );
      onClose();
    } catch (error) {
      console.error("Error saving monitor:", error);
    }
  };

  const inputFields = Object.keys(fields);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ backgroundColor: "#000", color: "white" }}>
        Edit Monitor
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#000", color: "white" }}>
        <Grid container spacing={2}>
          {inputFields.map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()} // Format label
                name={field}
                value={fields[field]}
                onChange={handleInputChange}
                fullWidth
                multiline={["description", "largeDescription"].includes(field)}
                rows={
                  ["description", "largeDescription"].includes(field) ? 3 : 1
                }
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
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#000", color: "white" }}>
        <Button
          onClick={onClose}
          sx={{ backgroundColor: "#000", color: "white" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{ backgroundColor: "#000", color: "white" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMonitorModal;
