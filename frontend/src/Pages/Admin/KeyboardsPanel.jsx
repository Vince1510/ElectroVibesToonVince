import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import AddKeyboardForm from "./AddKeyboardForm";

const KeyboardsPanel = () => {
  const [keyboards, setKeyboards] = useState([]);

  useEffect(() => {
    const fetchKeyboards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/keyboards/"
        );
        setKeyboards(response.data);
      } catch (error) {
        console.error("Error fetching keyboards:", error);
      }
    };

    fetchKeyboards();
  }, []);

  const handleAddKeyboard = (newKeyboard) => {
    setKeyboards((prevKeyboards) => [...prevKeyboards, newKeyboard]);
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
        {data.map((keyboard) => (
          <TableRow key={keyboard._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {keyboard[column.toLowerCase()] || keyboard._id}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div>
      <Typography variant="h6">Manage Keyboards</Typography>

      {/* Directly show the AddKeyboardForm */}
      <AddKeyboardForm onKeyboardAdded={handleAddKeyboard} />

      {/* Displaying keyboards in a table */}
      {keyboards.length > 0 ? (
        renderTable(keyboards)
      ) : (
        <Typography>No keyboards available or loading...</Typography>
      )}
    </div>
  );
};

export default KeyboardsPanel;
