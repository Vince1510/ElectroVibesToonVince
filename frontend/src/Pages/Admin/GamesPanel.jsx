import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import AddGameForm from "./AddGameForm"; // Import the AddGameForm component
import axios from "axios";

const GamesPanel = () => {
  const [games, setGames] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch games from the backend API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/games/");
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const renderTable = (data) => (
    <Table sx={{ mt: 2 }}>
      <TableHead>
        <TableRow>
          {["_id", "Name", "Genre", "Price"].map((column) => (
            <TableCell key={column} sx={{ color: "white" }}>
              {column}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((game) => (
          <TableRow key={game._id}>
            {["_id", "name", "genre", "price"].map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {game[column.toLowerCase()] || game._id}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const handleAddGameClick = () => {
    setShowForm((prev) => !prev); // Toggle form visibility
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Games Panel
      </Typography>

      {/* Button to show/hide the Add Game form */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddGameClick}
        sx={{ marginBottom: 2 }}
      >
        {showForm ? "Cancel Add Game" : "Add New Game"}
      </Button>

      {/* Conditionally render AddGameForm */}
      {showForm && <AddGameForm />}

      {/* Displaying games in a table */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Manage Games
      </Typography>
      {games.length > 0 ? (
        renderTable(games)
      ) : (
        <Typography>No games available or loading...</Typography>
      )}
    </Box>
  );
};

export default GamesPanel;
