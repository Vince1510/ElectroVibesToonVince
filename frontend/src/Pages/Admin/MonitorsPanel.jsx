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

const MonitorsPanel = () => {
  const [monitors, setMonitors] = useState([]);

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
        {data.map((monitor) => (
          <TableRow key={monitor._id}>
            {["_id", "name", "brand", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {monitor[column.toLowerCase()] || monitor._id}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div>
      <Typography variant="h6">Manage Monitors</Typography>
      {monitors.length > 0 ? (
        renderTable(monitors)
      ) : (
        <Typography>No monitors available or loading...</Typography>
      )}
    </div>
  );
};

export default MonitorsPanel;
