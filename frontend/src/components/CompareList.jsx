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
      listStyle: 'none', // Correctly apply list-style removal
      padding: '8px 0', // Add spacing between items
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center", // Center-align image and text vertically
        gap: 2, // Add consistent spacing between image and text
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Optional: light background for contrast
        borderRadius: "4px", // Rounded corners
        padding: "8px", // Add padding for better appearance
      }}
    >
      <CardMedia
        component="img"
        height="40"
        image={product.imageCard}
        alt={product.name}
        sx={{
          objectFit: "contain",
          width: "40px", // Ensure consistent image size
          borderRadius: "4px", // Match with parent border-radius
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: "black", // Adjust text color if needed
          flexGrow: 1, // Allow the text to expand within available space
        }}
      >
        {product.name}
      </Typography>
      <Button
        variant="contained"
        size="small"
        sx={{
          backgroundColor: "#f50057", // Customize button color
          color: "white",
          "&:hover": {
            backgroundColor: "#c51162", // Darker shade on hover
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
