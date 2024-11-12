import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const Games = () => {
  const gameData = [
    {
      id: 1,
      title: "Game 1",
      description: "Detailed description of Game 1",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Game 2",
      description: "Detailed description of Game 2",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Games
      </Typography>
      <Grid container spacing={3}>
        {gameData.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card>
              <img
                src={game.img}
                alt={game.title}
                style={{ width: "100%", height: "auto" }}
              />
              <CardContent>
                <Typography variant="h6">{game.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {game.description}
                </Typography>
                <Link to={`/games/${game.id}`}>View Details</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Games;
