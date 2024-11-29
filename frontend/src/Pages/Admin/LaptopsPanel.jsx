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
import AddLaptopForm from "./AddLaptopForm";

const LaptopsPanel = () => {
  const [laptops, setLaptops] = useState([]);

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
        {data.map((laptop) => (
          <TableRow key={laptop._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {laptop[column.toLowerCase()] || laptop._id}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const handleLaptopAdded = () => {
    axios.get("http://localhost:4000/api/laptops/").then((response) => {
      setLaptops(response.data); // Refresh the laptop list after adding
    });
  };

  return (
    <div>
      <Typography variant="h6">Manage Laptops</Typography>

      {/* Directly show the AddLaptopForm */}
      <AddLaptopForm onLaptopAdded={handleLaptopAdded} />

      {/* Display laptops in a table */}
      {laptops.length > 0 ? (
        renderTable(laptops)
      ) : (
        <Typography>No laptops available or loading...</Typography>
      )}
    </div>
  );
};

export default LaptopsPanel;
