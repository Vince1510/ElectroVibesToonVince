import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import PhoneDetails from "../components/PhoneDetails";
import MouseDetails from "../components/MouseDetails";
import LaptopDetails from "../components/LaptopDetails";
import MonitorDetails from "../components/MonitorDetails";
import KeyboardDetails from "../components/KeyboardDetails";
import GameDetails from "../components/GameDetails";

const ComparePage = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] }; // Safely retrieve products
  const [showFullDescriptions, setShowFullDescriptions] = useState(
    products.map(() => false) // Initialize state for each product
  );

  const toggleDescription = (index) => {
    setShowFullDescriptions((prev) =>
      prev.map((show, idx) => (idx === index ? !show : show))
    );
  };

  const renderDetailsComponent = (product) => {
    switch (product.category) {
      case "Phone":
        return <PhoneDetails product={product} />;
      case "Mouse":
        return <MouseDetails product={product} />;
      case "Laptop":
        return <LaptopDetails product={product} />;
      case "Monitor":
        return <MonitorDetails product={product} />;
      case "Keyboard":
        return <KeyboardDetails product={product} />;
      case "Game":
        return <GameDetails product={product} />;
      default:
        return (
          <Typography variant="body2" color="textSecondary">
            No details available for this category.
          </Typography>
        );
    }
  };

  return (
    <Box padding={3} style={{ backgroundColor: "transparent" }}>
      <Typography variant="h4" gutterBottom>
        Compare Products
      </Typography>
      {products.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card style={{ backgroundColor: "transparent", color: "#ffffff" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageOverview || ""}
                  alt={product.name}
                  style={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                    sx={{ marginBottom: 2 }}
                  >
                    {showFullDescriptions[index]
                      ? product.largeDescription
                      : `${product.largeDescription.slice(0, 100)}...`}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => toggleDescription(index)}
                    sx={{ color: "#ffffff", borderColor: "#ffffff", textAlign: "center", width: 150 }}
                  >
                    {showFullDescriptions[index] ? "Show Less" : "Show More"}
                  </Button>
                </CardContent>
              </Card>
              {renderDetailsComponent(product)}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No products selected for comparison yet.
        </Typography>
      )}
    </Box>
  );
};

export default ComparePage;