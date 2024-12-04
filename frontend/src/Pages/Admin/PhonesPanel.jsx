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
import axios from "axios";
import AddPhoneForm from "./AddPhoneForm"; // Import the form component

const PhonesPanel = () => {
  const [phones, setPhones] = useState([]);
  const [open, setOpen] = useState(false); // State to control modal visibility

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

  // Function to handle deleting a phone
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/phones/${id}`);
      setPhones(phones.filter((phone) => phone._id !== id)); // Remove the deleted phone from the list
    } catch (error) {
      console.error("Error deleting phone:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Typography variant="h6">Manage Phones</Typography>

      {/* Button to open modal for adding a phone */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Phone
      </Button>

      {/* Modal for adding a new phone */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: "white", backgroundColor: "#000" }}>
          Add a New Phone
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#000",
          }}
        >
          <AddPhoneForm onPhoneAdded={fetchPhones} />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#000",
          }}
        >
          <Button onClick={handleClose} sx={{ color: "white" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Displaying phones in a table */}
      {phones.length > 0 ? (
        renderTable(phones)
      ) : (
        <Typography>No phones available or loading...</Typography>
      )}
    </div>
  );
};

export default PhonesPanel;
