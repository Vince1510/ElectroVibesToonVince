import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add"; // Add this import
import axios from "axios";
import EditLaptopModal from "./EditLaptopModal";
import AddLaptopForm from "./AddLaptopForm"; // Import AddLaptopForm

const LaptopsPanel = () => {
  const [laptops, setLaptops] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false); // State to control edit modal visibility
  const [selectedLaptopId, setSelectedLaptopId] = useState(null); // Store the laptop ID to edit
  const [isAdding, setIsAdding] = useState(false); // State to distinguish between edit and add new laptop
  const [openAddLaptopDialog, setOpenAddLaptopDialog] = useState(false); // State to manage AddLaptopDialog visibility

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/laptops/");
        setLaptops(response.data);
      } catch (error) {
        console.error("Error fetching laptops:", error);
      }
    };

    fetchLaptops();
  }, []);

  // Function to handle deleting a laptop
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/laptops/${id}`);
      setLaptops(laptops.filter((laptop) => laptop._id !== id)); // Remove the deleted laptop from the list
    } catch (error) {
      console.error("Error deleting laptop:", error);
    }
  };

  // Open the edit modal for a specific laptop
  const handleEditClick = (id) => {
    setSelectedLaptopId(id);
    setIsAdding(false); // Set to false for editing
    setOpenEditModal(true);
  };

  // Open the dialog for adding a new laptop
  const handleAddNewClick = () => {
    setSelectedLaptopId(null); // No laptop selected for adding
    setIsAdding(true); // Set to true for adding
    setOpenAddLaptopDialog(true); // Open the dialog
  };

  // Function to refresh laptop list after update
  const handleLaptopUpdated = () => {
    axios.get("http://localhost:4000/api/laptops/").then((response) => {
      setLaptops(response.data); // Refresh the laptop list after editing
    });
  };

  const renderTable = (data) => (
    <Table>
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
        {data.map((laptop) => (
          <TableRow key={laptop._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {laptop[column.toLowerCase()] || laptop._id}
              </TableCell>
            ))}
            <TableCell>
              <IconButton
                onClick={() => handleEditClick(laptop._id)}
                color="primary"
              >
                <EditIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(laptop._id)}
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
      {/* Add Icon Button positioned at the top-right corner */}
      <Box
        sx={{ position: "relative", display: "inline-block", width: "100%" }}
      >
        <IconButton
          onClick={handleAddNewClick}
          color="primary"
          sx={{
            borderRadius: "50%",
            position: "absolute",
            top: 0,
            right: 0,
            color: "#fff",
            border: "1px solid",
            borderImage: "linear-gradient(180deg, #E70002 0%, #FCD201 100%) 1",
          }}
        >
          <AddIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      <Typography variant="h6">Manage Laptops</Typography>

      {/* Table rendering */}
      {laptops.length > 0 ? (
        renderTable(laptops)
      ) : (
        <Typography>No laptops available or loading...</Typography>
      )}

      {/* Edit Laptop Modal */}
      <EditLaptopModal
        laptopId={selectedLaptopId}
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        onLaptopUpdated={handleLaptopUpdated}
      />

      {/* Add Laptop Dialog */}
      <Dialog
        open={openAddLaptopDialog}
        onClose={() => setOpenAddLaptopDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#000", color: "white" }}>
          Add New Laptop
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#000",
          }}
        >
          <AddLaptopForm handleClose={() => setOpenAddLaptopDialog(false)} />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#000" }}>
          <Button
            onClick={() => setOpenAddLaptopDialog(false)}
            sx={{ color: "white" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LaptopsPanel;
