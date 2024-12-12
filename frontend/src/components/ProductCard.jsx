import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";

function ProductCard({ product, onCompare, cardStyle = {} }) {
  return (
    <Grid item xs={4} sm={4} md={4} key={product._id}>
      <Card
        sx={{
          width: 270,
          height: 360,
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)",
          boxShadow: "0px 4px 4px 0px #000",
          display: "flex",
          pt: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          ...cardStyle,
        }}
      >
        <Link
          to={`/detail/${product.category}/${product._id}`}
          state={{ product }}
          style={{
            textDecoration: "none",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
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
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
          </CardContent>
        </Link>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
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
                {product.dealPrice}
              </Typography>
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "gray",
                  fontSize: "0.7rem",
                }}
              >
                {product.price}
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
              {product.price}
            </Typography>
          )}
          <Button
            variant="contained"
            size="small"
            sx={{
              borderColor: "white",
              background: "transparent",
              color: "white",
              border: "1px solid white",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.1)",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              onCompare(product);
            }}
          >
            Compare
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}

export default ProductCard;
