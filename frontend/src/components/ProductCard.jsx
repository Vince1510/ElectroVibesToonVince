import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

function ProductCard({ product }) {
  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        color: "white",
        margin: 2,
        width: 200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{ height: 150, objectFit: "cover" }}
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
          {product.name}
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
          {product.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "auto",
          }}
        >
          {product.dealPrice ? (
            <Box sx={{ textAlign: "right", display: "flex" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#f50057",
                  fontSize: "1rem",
                  marginRight: 0.2,
                }}
              >
                €{product.dealPrice}
              </Typography>
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "gray",
                  fontSize: "0.7rem",
                }}
              >
                €{product.price}
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
              €{product.price}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;