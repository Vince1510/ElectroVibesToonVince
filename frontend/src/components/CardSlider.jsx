import React, { useState, useRef } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../App.css";

const CardSlider = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 300; // Width of each card
  const totalCards = 5; // Total number of unique cards

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return totalCards - 1; // Jump to last card
    });
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < totalCards - 1) {
        return prevIndex + 1;
      }
      return 0; // Jump to first card
    });
  };

  // Example data for the big cards
  const bigCardsData = [
    {
      title: "Big Card 1",
      description: "Description for Big Card 1",
      price: "$99.99",
      discountedPrice: "$79.99",
    },
    {
      title: "Big Card 2",
      description: "Description for Big Card 2",
      price: "$89.99",
      discountedPrice: "$69.99",
    },
    {
      title: "Big Card 3",
      description: "Description for Big Card 3",
      price: "$79.99",
      discountedPrice: "$59.99",
    },
    {
      title: "Big Card 4",
      description: "Description for Big Card 4",
      price: "$69.99",
      discountedPrice: "$49.99",
    },
  ];

  return (
    <Box>
      <Box position="relative" width="100%" overflow="hidden" mb={4}>
        <IconButton
          onClick={handleLeftClick}
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            zIndex: 2,
            color: "white", // Black icon color
            borderRadius: "50%", // Round buttons
            padding: "10px", // Padding for better touch targets
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          onClick={handleRightClick}
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            zIndex: 2,
            color: "white", // Black icon color
            borderRadius: "50%", // Round buttons
            padding: "10px", // Padding for better touch targets
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
        {/* Card container */}
        <Box
          ref={sliderRef}
          display="flex"
          gap={2}
          sx={{
            transform: `translateX(-${currentIndex * cardWidth}px)`, // Move based on the current index
            transition: "transform 0.5s ease", // Smooth transition for the movement
          }}
        >
          {[...Array(totalCards)].map((_, index) => (
            <Box
              key={index}
              className="card" // Add className for styling
              sx={{
                minWidth: `${cardWidth}px`,
                height: "200px",
              }}
            >
              Card {index + 1}
            </Box>
          ))}
        </Box>
        {/* Right Arrow */}
        <IconButton
          onClick={handleRightClick}
          sx={{ position: "absolute", top: "50%", right: "10px", zIndex: 2 }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Big Cards Section */}
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
        {bigCardsData.map((card, index) => (
          <Box
            key={index}
            className="card" // Add className for styling
            sx={{
              height: "300px", // Set a height for big cards
            }}
          >
            <img
              src={card.image}
              alt={card.title}
              style={{ width: "100%", height: "auto" }}
            />
            <Box p={2}>
              <Typography variant="h6" className="title" fontWeight="bold">
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                className="description"
                color="textSecondary"
              >
                {card.description}
              </Typography>
              <Typography variant="body1" className="price" fontWeight="bold">
                {card.price}{" "}
                <span className="discounted-price">{card.discountedPrice}</span>
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CardSlider;
