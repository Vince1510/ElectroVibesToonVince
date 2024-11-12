import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, Box } from "@mui/material";

function DetailPage() {
  const { category, productId } = useParams(); // Get category and productId from URL

  // Example data for multiple categories (in a real app, this would come from an API)
  const products = {
    games: [
      {
        id: 1,
        name: "Game A",
        description: "Detailed description for Game A.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Game B",
        description: "Detailed description for Game B.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Game C",
        description: "Detailed description for Game C.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        name: "Game D",
        description: "Detailed description for Game D.",
        img: "https://via.placeholder.com/150",
      },
    ],
    keyboard: [
      {
        id: 1,
        name: "Keyboard A",
        description: "Detailed description for Keyboard A.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Keyboard B",
        description: "Detailed description for Keyboard B.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Keyboard C",
        description: "Detailed description for Keyboard C.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        name: "Keyboard D",
        description: "Detailed description for Keyboard D.",
        img: "https://via.placeholder.com/150",
      },
    ],
    laptop: [
      {
        id: 1,
        name: "Laptop A",
        description: "Detailed description for Laptop A.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Laptop B",
        description: "Detailed description for Laptop B.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Laptop C",
        description: "Detailed description for Laptop C.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        name: "Laptop D",
        description: "Detailed description for Laptop D.",
        img: "https://via.placeholder.com/150",
      },
    ],
    monitor: [
      {
        id: 1,
        name: "Monitor A",
        description: "Detailed description for Monitor A.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Monitor B",
        description: "Detailed description for Monitor B.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Monitor C",
        description: "Detailed description for Monitor C.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        name: "Monitor D",
        description: "Detailed description for Monitor D.",
        img: "https://via.placeholder.com/150",
      },
    ],
    mouse: [
      {
        id: 1,
        name: "Mouse A",
        description: "Detailed description for Mouse A.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Mouse B",
        description: "Detailed description for Mouse B.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Mouse C",
        description: "Detailed description for Mouse C.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        name: "Mouse D",
        description: "Detailed description for Mouse D.",
        img: "https://via.placeholder.com/150",
      },
    ],
    smartphone: [
      {
        id: 1,
        name: "SmartPhone A",
        description: "Detailed description for SmartPhone A.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "SmartPhone B",
        description: "Detailed description for SmartPhone B.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "SmartPhone C",
        description: "Detailed description for SmartPhone C.",
        img: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        name: "SmartPhone D",
        description: "Detailed description for SmartPhone D.",
        img: "https://via.placeholder.com/150",
      },
    ],
  };

  // Get the category data based on the URL parameter
  const categoryData = products[category];

  if (!categoryData) {
    return <Typography variant="h6">Category not found</Typography>;
  }

  // Find the product in the selected category
  const product = categoryData.find((item) => item.id === parseInt(productId));

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Card>
        <CardContent>
          <Box mb={2}>
            <img
              src={product.img}
              alt={product.name}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Typography variant="h6" paragraph>
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default DetailPage;
