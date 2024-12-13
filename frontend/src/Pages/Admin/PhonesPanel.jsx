// PhonesPanel.jsx
import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add"; // Import the Plus Icon
import axios from "axios";
import AddPhoneForm from "./AddPhoneForm";
import EditPhoneModal from "./EditPhoneModal"; // Import the EditPhoneModal component

const PhonesPanel = () => {
  const [phones, setPhones] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);

  const fetchPhones = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/phones/");
      setPhones(response.data);
    } catch (error) {
      console.error("Error fetching phones:", error);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/phones/${id}`);
      setPhones(phones.filter((phone) => phone._id !== id));
    } catch (error) {
      console.error("Error deleting phone:", error);
    }
  };

  const handleOpenEditModal = (phone) => {
    setSelectedPhone(phone);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
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
        {data.map((phone) => (
          <TableRow key={phone._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {phone[column.toLowerCase()] || phone._id}
              </TableCell>
            ))}
            <TableCell>
              {/* Edit Icon Button */}
              <IconButton
                onClick={() => handleOpenEditModal(phone)}
                color="primary"
              >
                <EditIcon sx={{ color: "white" }} />
              </IconButton>

              {/* Delete Icon Button */}
              <IconButton
                onClick={() => handleDelete(phone._id)}
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
      <Box sx={{ position: "relative" }}>
        {/* Plus IconButton to open the add phone modal, placed at the top right */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton
            onClick={() => setOpenAddModal(true)}
            color="primary"
            sx={{
              borderRadius: "50%",
              position: "absolute",
              top: 0,
              right: 0,
              color: "#fff",
              border: "1px solid",
              borderImage:
                "linear-gradient(180deg, #E70002 0%, #FCD201 100%) 1",
            }}
          >
            <AddIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <Typography variant="h6">Manage Phones</Typography>

        {/* Modal for adding a new phone */}
        <Dialog
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle sx={{ color: "white", backgroundColor: "#000" }}>
            Add a New Phone
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#000" }}>
            <AddPhoneForm onPhoneAdded={fetchPhones} />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#000" }}>
            <Button
              onClick={() => setOpenAddModal(false)}
              sx={{ color: "white" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal for editing a phone */}
        {selectedPhone && (
          <EditPhoneModal
            open={openEditModal}
            onClose={handleCloseEditModal}
            phoneData={selectedPhone}
            onPhoneUpdated={fetchPhones}
          />
        )}

        {/* Displaying phones in a table */}
        {phones.length > 0 ? (
          renderTable(phones)
        ) : (
          <Typography>No phones available or loading...</Typography>
        )}
      </Box>
    </div>
  );
};

export default PhonesPanel;
