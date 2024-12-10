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
import EditIcon from "@mui/icons-material/Edit"; // Make sure this import is added
import axios from "axios";
import AddMonitorForm from "./AddMonitorForm";
import EditMonitorModal from "./EditMonitorModal"; // Assuming you have this modal

const MonitorsPanel = () => {
  const [monitors, setMonitors] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false); // State for Add Monitor Modal
  const [openEditModal, setOpenEditModal] = useState(false); // State for Edit Monitor Modal
  const [selectedMonitorId, setSelectedMonitorId] = useState(null); // To hold selected monitor for editing

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

  // Handle delete monitor
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/monitors/${id}`);
      setMonitors(monitors.filter((monitor) => monitor._id !== id));
    } catch (error) {
      console.error("Error deleting monitor:", error);
    }
  };

  // Open Edit Modal
  const handleEditClick = (id) => {
    setSelectedMonitorId(id); // Set the monitor id to edit
    setOpenEditModal(true);
  };

  // Close all modals
  const handleCloseModal = () => {
    setOpenAddModal(false);
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
        {data.map((monitor) => (
          <TableRow key={monitor._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {monitor[column.toLowerCase()] || monitor._id}
              </TableCell>
            ))}
            <TableCell>
              {/* Edit Icon Button */}
              <IconButton
                onClick={() => handleEditClick(monitor._id)}
                color="primary"
              >
                <EditIcon sx={{ color: "white" }} />
              </IconButton>

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

  return (
    <div>
      <Typography variant="h6">Manage Monitors</Typography>

      {/* Button to open modal for adding a monitor */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddModal(true)}
      >
        Add New Monitor
      </Button>

      {/* Add Monitor Modal */}
      <Dialog
        open={openAddModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ color: "white", backgroundColor: "#000" }}>
          Add a New Monitor
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#000" }}>
          <AddMonitorForm />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#000" }}>
          <Button
            onClick={handleCloseModal}
            color="secondary"
            sx={{ backgroundColor: "#000", color: "#fff" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Monitor Modal */}
      <EditMonitorModal
        open={openEditModal}
        onClose={handleCloseModal}
        monitorId={selectedMonitorId}
      />

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
