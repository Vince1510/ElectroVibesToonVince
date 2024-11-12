import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const Keyboard = () => {
  const keyboardData = [
    {
      id: 1,
      name: "Mechanical Keyboard",
      description: "Description for mechanical keyboard",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Wireless Keyboard",
      description: "Description for wireless keyboard",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Keyboards
      </Typography>
      <Grid container spacing={3}>
        {keyboardData.map((keyboard) => (
          <Grid item xs={12} sm={6} md={4} key={keyboard.id}>
            <Card>
              <img
                src={keyboard.img}
                alt={keyboard.name}
                style={{ width: "100%", height: "auto" }}
              />
              <CardContent>
                <Typography variant="h6">{keyboard.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {keyboard.description}
                </Typography>
                <Link to={`/keyboard/${keyboard.id}`}>View Details</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Keyboard;
