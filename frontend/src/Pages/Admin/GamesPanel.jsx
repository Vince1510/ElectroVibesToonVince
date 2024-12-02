import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddGameForm from "./AddGameForm";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GamesPanel = () => {
  const [games, setGames] = useState([]);
  const [open, setOpen] = useState(false); // State to control modal visibility

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

  const handleEdit = (gameId) => {
    console.log("Editing game with ID:", gameId);
    // Handle editing logic here (e.g., open a form with the game's details)
  };

  const handleDelete = async (gameId) => {
    try {
      await axios.delete(`http://localhost:4000/api/games/${gameId}`);
      setGames(games.filter((game) => game._id !== gameId)); // Remove deleted game from the state
      console.log("Deleted game with ID:", gameId);
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const renderTable = (data) => (
    <Table sx={{ mt: 2 }}>
      <TableHead>
        <TableRow>
          {["_id", "Name", "Genre", "Price", "Actions"].map((column) => (
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
            <TableCell sx={{ color: "white" }}>
              {/* Edit and Delete buttons */}
              <IconButton onClick={() => handleEdit(game._id)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(game._id)}
                color="secondary"
              >
                <DeleteIcon />
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
    <Box>
      <Typography variant="h6">Games Panel</Typography>

      {/* Button to open modal for adding a game */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Game
      </Button>

      {/* Modal for adding a new game */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: "white", backgroundColor: "#000" }}>
          Add a New Game
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#000",
          }}
        >
          <AddGameForm />
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

      {/* Displaying games in a table */}
      {games.length > 0 ? (
        renderTable(games)
      ) : (
        <Typography>No games available or loading...</Typography>
      )}
    </Box>
  );
};

export default GamesPanel;
