import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, Box } from "@mui/material";

function DetailPage() {
  const { category, productId } = useParams(); // Get category and productId from URL

  // Example data for smartphones (In a real app, you'd fetch this data from an API)
  const smartphones = [
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
  ];

  const smartphone = smartphones.find(
    (phone) => phone.id === parseInt(productId)
  );

  if (!smartphone) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {smartphone.name}
      </Typography>
      <Card>
        <CardContent>
          <Box mb={2}>
            <img
              src={smartphone.img}
              alt={smartphone.name}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Typography variant="h6" paragraph>
            {smartphone.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default DetailPage;
