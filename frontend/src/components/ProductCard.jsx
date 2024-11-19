import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box, Grid } from "@mui/material";

function ProductCard({ product }) {
  return (
    <Grid item xs={4} sm={4} md={4} key={product._id}>
      <Link
        to={`/detail/${product.category}/${product._id}`}
        style={{ textDecoration: "none" }}
      >
        <Card
          sx={{
            width: 200,
            height: 330,
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
            image={product.imageCard}
            alt={product.name}
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
                <Box sx={{ textAlign: "right", display: 'flex' }}>
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
      </Link>
    </Grid>
  );
}

export default ProductCard;