import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import AddKeyboardForm from "./AddKeyboardForm";

const KeyboardsPanel = () => {
  const [keyboards, setKeyboards] = useState([]);
  const [open, setOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchKeyboards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/keyboards/"
        );
        setKeyboards(response.data);
      } catch (error) {
        console.error("Error fetching keyboards:", error);
      }
    };

    fetchKeyboards();
  }, []);

  const handleAddKeyboard = (newKeyboard) => {
    setKeyboards((prevKeyboards) => [...prevKeyboards, newKeyboard]);
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const renderTable = (data) => (
    <Table sx={{ mt: 2 }}>
      <TableHead>
        <TableRow>
          {["_id", "Name", "Brand", "Price"].map((column) => (
            <TableCell key={column} sx={{ color: "white" }}>
              {column}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((keyboard) => (
          <TableRow key={keyboard._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {keyboard[column.toLowerCase()] || keyboard._id}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div>
      <Typography variant="h6">Manage Keyboards</Typography>

      {/* Button to open modal for adding a keyboard */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Keyboard
      </Button>

      {/* Modal for adding a new keyboard */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: "white", backgroundColor: "#000" }}>
          Add a New Keyboard
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#000",
          }}
        >
          <AddKeyboardForm onKeyboardAdded={handleAddKeyboard} />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#000",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Displaying keyboards in a table */}
      {keyboards.length > 0 ? (
        renderTable(keyboards)
      ) : (
        <Typography>No keyboards available or loading...</Typography>
      )}
    </div>
  );
};

export default KeyboardsPanel;
