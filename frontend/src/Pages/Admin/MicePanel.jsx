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
import AddMiceForm from "./AddMiceForm"; // Import the form component

const MicePanel = () => {
  const [mice, setMice] = useState([]);
  const [open, setOpen] = useState(false); // State to control modal visibility

  // Fetch mice from the backend API
  useEffect(() => {
    const fetchMice = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/mice/");
        setMice(response.data);
      } catch (error) {
        console.error("Error fetching mice:", error);
      }
    };

    fetchMice();
  }, []);

  const handleAddMouse = (newMouse) => {
    setMice((prevMice) => [...prevMice, newMouse]);
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
        {data.map((mouse) => (
          <TableRow key={mouse._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {mouse[column.toLowerCase()] || mouse._id}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  // Functions to handle opening and closing the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h6">Manage Mice</Typography>

      {/* Button to open modal for adding a mouse */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Mouse
      </Button>

      {/* Modal for adding a new mouse */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: "white", backgroundColor: "#000" }}>
          Add a New Mouse
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#000",
          }}
        >
          <AddMiceForm onAddMouse={handleAddMouse} />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#000",
          }}
        >
          <Button
            onClick={handleClose}
            color="secondary"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Displaying mice in a table */}
      {mice.length > 0 ? (
        renderTable(mice)
      ) : (
        <Typography>No mice available or loading...</Typography>
      )}
    </div>
  );
};

export default MicePanel;
