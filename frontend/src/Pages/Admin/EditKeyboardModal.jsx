import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";

const EditKeyboardModal = ({ open, handleClose, keyboardId, onSave }) => {
  const [keyboardData, setKeyboardData] = useState(null);

  useEffect(() => {
    if (keyboardId) {
      // Fetch the current keyboard data
      const fetchKeyboardData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/keyboards/${keyboardId}`
          );
          setKeyboardData(response.data);
        } catch (error) {
          console.error("Error fetching keyboard data:", error);
        }
      };
      fetchKeyboardData();
    }
  }, [keyboardId]);

  const handleInputChange = (e) => {
    setKeyboardData({ ...keyboardData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/keyboards/${keyboardId}`,
        keyboardData
      );
      onSave(); // Trigger callback to refresh the keyboard list
      handleClose();
    } catch (error) {
      console.error("Error updating keyboard:", error);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ backgroundColor: "black", color: "white" }}>
        Edit Keyboard
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "black", padding: 2 }}>
        {keyboardData ? (
          <Grid container spacing={2}>
            {Object.keys(keyboardData).map((key, index) => (
              <Grid item xs={6} key={index}>
                <TextField
                  name={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={keyboardData[key]}
                  onChange={handleInputChange}
                  fullWidth
                  margin="dense"
                  sx={{
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
        ) : (
          <p>Loading keyboard data...</p>
        )}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "black" }}>
        <Button onClick={handleClose} sx={{ color: "white" }}>
          Cancel
        </Button>
        <Button onClick={handleSave} sx={{ color: "white" }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditKeyboardModal;
