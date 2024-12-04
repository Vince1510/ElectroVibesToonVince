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
import AddMonitorForm from "./AddMonitorForm";

const MonitorsPanel = () => {
  const [monitors, setMonitors] = useState([]);
  const [open, setOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchMonitors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/monitors/");
        setMonitors(response.data);
      } catch (error) {
        console.error("Error fetching monitors:", error);
      }
    };

    fetchMonitors();
  }, []);

  // Function to handle deleting a monitor
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/monitors/${id}`);
      setMonitors(monitors.filter((monitor) => monitor._id !== id)); // Remove the deleted monitor from the list
    } catch (error) {
      console.error("Error deleting monitor:", error);
    }
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
        {data.map((monitor) => (
          <TableRow key={monitor._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {monitor[column.toLowerCase()] || monitor._id}
              </TableCell>
            ))}
            <TableCell>
              {/* Delete Icon Button */}
              <IconButton
                onClick={() => handleDelete(monitor._id)}
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

  // Functions to handle opening and closing the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h6">Manage Monitors</Typography>

      {/* Button to open modal for adding a monitor */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Monitor
      </Button>

      {/* Modal for adding a new monitor */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: "white", backgroundColor: "#000" }}>
          Add a New Monitor
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#000",
          }}
        >
          <AddMonitorForm />
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

      {/* Displaying monitors in a table */}
      {monitors.length > 0 ? (
        renderTable(monitors)
      ) : (
        <Typography>No monitors available or loading...</Typography>
      )}
    </div>
  );
};

export default MonitorsPanel;
