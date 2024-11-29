import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box, Grid, Card, CardContent, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
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
    Array(products.length).fill(false) // Initialize state for each product
  );

  const toggleDescription = (index) => {
    setShowFullDescriptions((prev) =>
      prev.map((show, idx) => (idx === index ? !show : show))
    );
  };

  const renderDetailsComponent = (product) => {
    switch (product.category) {
      case "Phones":
        return <PhoneDetails product={product} />;
      case "Mice":
        return <MouseDetails product={product} />;
      case "Laptops":
        return <LaptopDetails product={product} />;
      case "Monitors":
        return <MonitorDetails product={product} />;
      case "Keyboards":
        return <KeyboardDetails product={product} />;
      case "Games":
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
                {/* Carousel for multiple images */}
                <Carousel
                  indicators={false}
                  navButtonsAlwaysVisible
                  sx={{ height: 200, backgroundColor: "transparent" }}
                >
                  {Array.isArray(product.imageOverview) ? (
                    product.imageOverview.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Product ${idx + 1}`}
                        style={{ objectFit: "contain", height: "200px", width: "100%" }}
                      />
                    ))
                  ) : (
                    <img
                      src={product.imageOverview || ""}
                      alt="Product"
                      style={{ objectFit: "contain", height: "200px", width: "100%" }}
                    />
                  )}
                </Carousel>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {product.name}
                  </Typography>
                  {product.largeDescription
                    .slice(0, showFullDescriptions[index] ? product.largeDescription.length : 1)
                    .map((description, idx) => (
                      <Typography
                        key={idx}
                        variant="body1"
                        color="textSecondary"
                        gutterBottom
                        sx={{ marginBottom: 2 }}
                      >
                        {description}
                      </Typography>
                    ))}
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
