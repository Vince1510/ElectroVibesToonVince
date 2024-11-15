import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardMedia, Box, Grid, Button, CircularProgress } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import LaptopDetails from "../components/LaptopDetails";

function DetailPage() {
  const { category, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/laptops/${productId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ backgroundColor: "transparent" }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h5" sx={{ color: "white", textAlign: "center", marginTop: 4 }}>
        Product not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "transparent", color: "white", minHeight: "100vh" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Brand: {product.brand} | Write a review | share
          </Typography>
          <Card
            sx={{
              marginTop: 2,
              background: "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)",
            }}
          >
            <Carousel indicators={false} navButtonsAlwaysVisible>
              {product.imageOverview.map((image, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={image}
                  alt={`Product Image ${index + 1}`}
                  style={{ objectFit: "contain", height: 400 }}
                />
              ))}
            </Carousel>
          </Card>

          <Box
            sx={{
              display: { xs: "block", md: "none" },
              marginTop: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f50057", marginBottom: 1 }}>
              €{product.price}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Delivered no later than 21 November
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Sold by --- 'rating seller'
            </Typography>
            <Button variant="contained" color="secondary" size="large" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
              Add to Cart
            </Button>
          </Box>

          <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
            Product Bio
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.largeDescription}
          </Typography>
          <Card sx={{ marginTop: 4, marginBottom: 2 }}>
            <iframe
              src={`${product.commercial}&controls=0`}
              title="Commercial"
              style={{ width: "100%", height: 300, border: "none" }}
              allowFullScreen
            />
          </Card>
          <LaptopDetails product={product} />
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f50057", marginBottom: 2 }}>
              €{product.price}
            </Typography>
            <Typography variant="body1">
              Delivered no later than 21 November
            </Typography>
            <Typography variant="body1">
              Sold by --- 'rating seller'
            </Typography>
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ textTransform: "uppercase", fontWeight: "bold", alignSelf: "flex-end" }}
            >
              Add to Cart
            </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DetailPage;