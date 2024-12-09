import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Keyboard</DialogTitle>
      <DialogContent>
        {keyboardData ? (
          Object.keys(keyboardData).map((key) => (
            <TextField
              key={key}
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={keyboardData[key]}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
            />
          ))
        ) : (
          <p>Loading keyboard data...</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditKeyboardModal;
