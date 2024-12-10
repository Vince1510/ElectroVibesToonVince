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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon
import axios from "axios";
import AddMiceForm from "./AddMiceForm";
import EditMiceModal from "./EditMiceModal"; // Import the EditMiceModal

const MicePanel = () => {
  const [mice, setMice] = useState([]);
  const [open, setOpen] = useState(false); // State to control add modal visibility
  const [editOpen, setEditOpen] = useState(false); // State to control edit modal visibility
  const [selectedMouse, setSelectedMouse] = useState(null); // Store the mouse being edited

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

  // Function to handle deleting a mouse
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/mice/${id}`);
      setMice(mice.filter((mouse) => mouse._id !== id));
    } catch (error) {
      console.error("Error deleting mouse:", error);
    }
  };

  const handleAddMouse = (newMouse) => {
    setMice((prevMice) => [...prevMice, newMouse]);
  };

  // Handle opening and closing the Edit modal
  const handleEditOpen = (mouse) => {
    setSelectedMouse(mouse);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleSaveMouse = (updatedMouse) => {
    setMice(
      mice.map((mouse) =>
        mouse._id === updatedMouse._id ? updatedMouse : mouse
      )
    );
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
        {data.map((mouse) => (
          <TableRow key={mouse._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {mouse[column.toLowerCase()] || mouse._id}
              </TableCell>
            ))}
            <TableCell>
              {/* Edit Icon Button */}
              <IconButton onClick={() => handleEditOpen(mouse)} color="primary">
                <EditIcon sx={{ color: "white" }} />
              </IconButton>
              {/* Delete Icon Button */}
              <IconButton
                onClick={() => handleDelete(mouse._id)}
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h6">Manage Mice</Typography>

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Mouse
      </Button>

      {/* Add Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <AddMiceForm onAddMouse={handleAddMouse} />
      </Dialog>

      {/* Edit Modal */}
      <EditMiceModal
        mouse={selectedMouse}
        open={editOpen}
        onClose={handleEditClose}
        onSave={handleSaveMouse}
      />

      {mice.length > 0 ? (
        renderTable(mice)
      ) : (
        <Typography>No mice available or loading...</Typography>
      )}
    </div>
  );
};

export default MicePanel;
