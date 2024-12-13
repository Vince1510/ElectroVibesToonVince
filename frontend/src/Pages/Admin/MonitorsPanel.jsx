import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import AddMonitorForm from "./AddMonitorForm";
import EditMonitorModal from "./EditMonitorModal";

const MonitorsPanel = () => {
  const [monitors, setMonitors] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedMonitorId, setSelectedMonitorId] = useState(null);

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
    setSelectedMonitorId(id);
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
      <Box sx={{ position: "relative" }}>
        <Typography variant="h6" component="div">
          Manage Monitors
        </Typography>

        {/* Plus Icon Button for adding new monitor */}
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
            borderImage: "linear-gradient(180deg, #E70002 0%, #FCD201 100%) 1",
          }}
        >
          <AddIcon sx={{ color: "white" }} />
        </IconButton>

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
          <Typography component="div">
            No monitors available or loading...
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default MonitorsPanel;
