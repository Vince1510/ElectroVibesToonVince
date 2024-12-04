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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import AddGameForm from "./AddGameForm";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditGameModal from "./EditGameModal"; // Import the EditGameModal

const GamesPanel = () => {
  const [games, setGames] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false); // State to control edit modal
  const [selectedGame, setSelectedGame] = useState(null); // Store selected game for editing

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
    const gameToEdit = games.find((game) => game._id === gameId);
    setSelectedGame(gameToEdit); // Set the game to be edited
    setOpenEditDialog(true); // Open the edit modal
  };

  const handleDelete = async (gameId) => {
    try {
      await axios.delete(`http://localhost:4000/api/games/${gameId}`);
      setGames(games.filter((game) => game._id !== gameId)); // Remove deleted game from the state
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const handleGameUpdate = (updatedGame) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      )
    );
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
              <IconButton
                onClick={() => handleEdit(game._id)}
                sx={{ color: "#fff" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(game._id)}
                sx={{ color: "#fff" }}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const handleClickOpenAdd = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAdd = () => {
    setOpenAddDialog(false);
  };

  return (
    <Box>
      <Typography variant="h6">Games Panel</Typography>

      {/* Button to open modal for adding a game */}
      <Button variant="contained" color="primary" onClick={handleClickOpenAdd}>
        Add New Game
      </Button>

      {/* Modal for adding a new game */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAdd}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ color: "white", backgroundColor: "#000" }}>
          Add a New Game
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#000" }}>
          <AddGameForm />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#000" }}>
          <Button
            onClick={handleCloseAdd}
            color="secondary"
            sx={{ backgroundColor: "#000", color: "#fff" }}
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

      {/* Edit Game Modal */}
      {selectedGame && (
        <EditGameModal
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          gameData={selectedGame}
          onUpdate={handleGameUpdate}
        />
      )}
    </Box>
  );
};

export default GamesPanel;
