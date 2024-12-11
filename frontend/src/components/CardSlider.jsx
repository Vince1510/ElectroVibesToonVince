import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "./ProductCard.jsx";

const CardSlider = () => {
  const [cards, setCards] = useState([]);
  const [bigCards, setBigCards] = useState([]);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const cardWidth = 300;
  const slideInterval = 3000;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoints = [
          "http://localhost:4000/api/laptops",
          "http://localhost:4000/api/keyboards",
          "http://localhost:4000/api/phones",
          "http://localhost:4000/api/games",
          "http://localhost:4000/api/mice",
          "http://localhost:4000/api/monitors",
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) =>  fetch(endpoint))
        
        );

      

        const data = await Promise.all(
          responses.map((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch from ${response.url}`);
            }
            return response.json();
          })
        );

        const allProducts = data.flat();
        setCards(allProducts.slice(0, 7));
        setBigCards(allProducts.slice(7, 9));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = cardWidth;

      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => handleScroll("right"), slideInterval);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        position="relative"
        width="100%"
        overflow="hidden"
        mb={4}
        sx={{
          "@media (max-width: 600px)": {
            mb: 2,
          },
        }}
      >
        <IconButton
          onClick={() => handleScroll("left")}
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Box
          ref={sliderRef}
          display="flex"
          gap={2}
          sx={{
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {cards.map((card, index) => (
            <ProductCard key={card._id || index} product={card} />
          ))}
        </Box>

        <IconButton
          onClick={() => handleScroll("right")}
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}
        gap={2}
      >
        {bigCards.map((card, index) => (
          <ProductCard
            key={card._id || index}
            product={card}
            cardStyle={{ width: "100%", height: "360px" }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CardSlider;