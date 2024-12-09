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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import AddKeyboardForm from "./AddKeyboardForm";
import EditKeyboardModal from "./EditKeyboardModal";

const KeyboardsPanel = () => {
  const [keyboards, setKeyboards] = useState([]);
  const [openAdd, setOpenAdd] = useState(false); // State for adding keyboard modal
  const [openEdit, setOpenEdit] = useState(false); // State for editing keyboard modal
  const [selectedKeyboardId, setSelectedKeyboardId] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/keyboards/${id}`);
      setKeyboards(keyboards.filter((keyboard) => keyboard._id !== id)); // Remove the deleted keyboard from the list
    } catch (error) {
      console.error("Error deleting keyboard:", error);
    }
  };

  const handleEditOpen = (id) => {
    setSelectedKeyboardId(id); // Set the selected keyboard ID for editing
    setOpenEdit(true); // Open the edit modal
  };

  const handleEditClose = () => {
    setOpenEdit(false); // Close the edit modal
    setSelectedKeyboardId(null); // Reset the selected keyboard ID
  };

  const handleEditSave = () => {
    // Refresh the keyboard list after saving changes
    const fetchUpdatedKeyboards = async () => {
      const response = await axios.get("http://localhost:4000/api/keyboards/");
      setKeyboards(response.data);
    };
    fetchUpdatedKeyboards();
  };

  const handleAddOpen = () => {
    setOpenAdd(true); // Open the add keyboard modal
  };

  const handleAddClose = () => {
    setOpenAdd(false); // Close the add keyboard modal
  };

  const renderTable = (data) => (
    <Table sx={{ mt: 2 }}>
      <TableHead>
        <TableRow>
          {["_id", "Name", "Brand", "Price", "Actions"].map((column) => (
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
            <TableCell>
              {/* Edit Icon Button */}
              <IconButton
                onClick={() => handleEditOpen(keyboard._id)}
                color="primary"
              >
                <EditIcon sx={{ color: "white" }} />
              </IconButton>

              {/* Delete Icon Button */}
              <IconButton
                onClick={() => handleDelete(keyboard._id)}
                color="secondary"
              >
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div>
      <Typography variant="h6">Manage Keyboards</Typography>

      {/* Button to open modal for adding a keyboard */}
      <Button variant="contained" color="primary" onClick={handleAddOpen}>
        Add New Keyboard
      </Button>

      {/* Modal for adding a new keyboard */}
      <Dialog open={openAdd} onClose={handleAddClose} fullWidth maxWidth="md">
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
            onClick={handleAddClose}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for editing a keyboard */}
      <EditKeyboardModal
        open={openEdit}
        handleClose={handleEditClose}
        keyboardId={selectedKeyboardId}
        onSave={handleEditSave}
      />

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
