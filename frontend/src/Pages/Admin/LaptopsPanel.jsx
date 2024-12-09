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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import EditLaptopModal from "./EditLaptopModal";

const LaptopsPanel = () => {
  const [laptops, setLaptops] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false); // State to control edit modal visibility
  const [selectedLaptopId, setSelectedLaptopId] = useState(null); // Store the laptop ID to edit
  const [isAdding, setIsAdding] = useState(false); // State to distinguish between edit and add new laptop

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

  // Open the modal for adding a new laptop
  const handleAddNewClick = () => {
    setSelectedLaptopId(null); // No laptop selected for adding
    setIsAdding(true); // Set to true for adding
    setOpenEditModal(true);
  };

  // Function to refresh laptop list after update
  const handleLaptopUpdated = () => {
    axios.get("http://localhost:4000/api/laptops/").then((response) => {
      setLaptops(response.data); // Refresh the laptop list after editing
    });
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
      <Typography variant="h6">Manage Laptops</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNewClick}
        sx={{ mb: 2 }}
      >
        Add New Laptop
      </Button>
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
        isAdding={isAdding}
      />
    </div>
  );
};

export default LaptopsPanel;
