import React from "react";
import { Box, Typography, Button, CardMedia } from "@mui/material";

const CompareList = ({ compareList, onRemove, onClear }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: 405,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingY: 10,
        paddingX: 5,
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Compare List
      </Typography>
      <ul>
        {compareList.map((product) => (
          <li
            key={product._id}
            style={{
              listStyle: "none",
              padding: "8px 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                padding: "8px",
              }}
            >
              <CardMedia
                component="img"
                height="40"
                image={product.imageCard}
                alt={product.name}
                sx={{
                  objectFit: "contain",
                  width: "40px",
                  borderRadius: "4px",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  flexGrow: 1,
                }}
              >
                {product.name}
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#f50057",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#c51162",
                  },
                }}
                onClick={() => onRemove(product._id)}
              >
                Remove
              </Button>
            </Box>
          </li>
        ))}
      </ul>
      <Button
        variant="contained"
        color="error"
        onClick={onClear}
        sx={{ marginTop: 2 }}
      >
        Clear Comparison
      </Button>
    </Box>
  );
};

export default CompareList;
