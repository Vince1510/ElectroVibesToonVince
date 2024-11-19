import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../App.css";

const CardSlider = () => {
  const [cards, setCards] = useState([]); // State for slider cards
  const [bigCards, setBigCards] = useState([]); // State for big cards
  const sliderRef = useRef(null); // Reference for scrolling
  const intervalRef = useRef(null); // Reference for interval
  const cardWidth = 300; // Card width with gap
  const slideInterval = 3000; // Time interval for auto-slide (3 seconds)

  // Fetch data from multiple endpoints
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
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={card._id || index}
              sx={{
                flex: "0 0 auto",
                width: "300px",
                height: "330px",
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)",
                boxShadow: "0px 4px 4px 0px #000",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={card.imageCard}
                alt={card.name}
                sx={{ objectFit: "contain" }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  paddingBottom: "0px",
                }}
              >
                <Typography
                  variant="h6"
                  color="white"
                  sx={{ fontSize: "1rem", marginBottom: "5px" }}
                >
                  {card.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "gray",
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    marginBottom: "5px",
                  }}
                >
                  {card.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "auto",
                  }}
                >
                  {card.dealPrice ? (
                    <Box sx={{ textAlign: "right", display: "flex" }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: "#f50057",
                          fontSize: "1rem",
                          marginRight: 0.2,
                        }}
                      >
                        €{card.dealPrice}
                      </Typography>
                      <Typography
                        sx={{
                          textDecoration: "line-through",
                          color: "gray",
                          fontSize: "0.7rem",
                        }}
                      >
                        €{card.price}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: "1rem",
                      }}
                    >
                      €{card.price}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
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
          <Card
            key={card._id || index}
            sx={{
              height: "330px",
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)",
              boxShadow: "0px 4px 4px 0px #000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={card.imageCard}
              alt={card.name}
              sx={{ objectFit: "contain" }}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                paddingBottom: "0px",
              }}
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ fontSize: "1rem", marginBottom: "5px" }}
              >
                {card.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "gray",
                  flexGrow: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  marginBottom: "5px",
                }}
              >
                {card.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "auto",
                }}
              >
                {card.dealPrice ? (
                  <Box sx={{ textAlign: "right", display: "flex" }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "#f50057",
                        fontSize: "1rem",
                        marginRight: 0.2,
                      }}
                    >
                      €{card.dealPrice}
                    </Typography>
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "gray",
                        fontSize: "0.7rem",
                      }}
                    >
                        €{card.price}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: "1rem",
                      }}
                    >
                      €{card.price}
                    </Typography>
                  )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CardSlider;
