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
          {["_id", "Name", "Brand", "Price"].map((column) => (
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
          <AddPhoneForm onPhoneAdded={fetchPhones} />{" "}
          {/* Add the form inside the modal */}
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
