// MicePanel.jsx
import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import AddMiceForm from "./AddMiceForm"; // Import the form component

const MicePanel = () => {
  const [mice, setMice] = useState([]);

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

  const handleAddMouse = (newMouse) => {
    setMice((prevMice) => [...prevMice, newMouse]);
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
        {data.map((mouse) => (
          <TableRow key={mouse._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {mouse[column.toLowerCase()] || mouse._id}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div>
      <Typography variant="h6">Manage Mice</Typography>
      <AddMiceForm onAddMouse={handleAddMouse} />
      {mice.length > 0 ? (
        renderTable(mice)
      ) : (
        <Typography>No mice available or loading...</Typography>
      )}
    </div>
  );
};

export default MicePanel;
