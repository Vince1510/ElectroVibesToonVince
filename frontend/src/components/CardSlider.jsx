import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "./ProductCard";
import "../App.css";

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
          endpoints.map((endpoint) => fetch(endpoint))
        );

        const data = await Promise.all(
          responses.map((response) => {
            if (!response.ok) {
              console.error("Error fetching data:", response.statusText);
              return [];
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
      const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

      if (direction === "left") {
        if (sliderRef.current.scrollLeft === 0) {
          sliderRef.current.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      } else if (direction === "right") {
        if (sliderRef.current.scrollLeft >= maxScroll - 1) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        handleScroll("right");
      }, slideInterval);
    };

    startAutoSlide();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Box>
      {/* Slider Section */}
      <Box position="relative" width="100%" overflow="hidden" mb={4}>
        <IconButton
          onClick={() => handleScroll("left")}
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            zIndex: 2,
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
            <ProductCard
              key={card._id || index}
              product={card}
              onCompare={(product) => console.log("Compare product:", product)}
            />
          ))}
        </Box>
        <IconButton
          onClick={() => handleScroll("right")}
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            zIndex: 2,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Big Cards Section */}
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
        {bigCards.map((card, index) => (
          <ProductCard
            key={card._id || index}
            product={card}
            onCompare={(product) => console.log("Compare product:", product)}
            cardStyle={{ width: "400px", height: "360px" }} // Custom style for big cards
          />
        ))}
      </Box>
    </Box>
  );
};

export default CardSlider;