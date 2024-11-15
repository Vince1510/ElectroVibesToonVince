import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardMedia, Box, Grid, List, ListItem, ListItemText, Button, CircularProgress, Divider, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";

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
        sx={{ backgroundColor: "black" }}
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

  const renderLaptopDetails = ({ product }) => (
    <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#121212', color: '#ffffff' }}>
      <Typography variant="h5" gutterBottom>
        Product Specs
      </Typography>
      <Divider sx={{ marginBottom: 2, backgroundColor: '#424242' }} />
      
      <Typography variant="h6" gutterBottom sx={{ color: '#bdbdbd' }}>
        Laptop-specific details
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Operating System" secondary={product.operatingSystem || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Screen Size" secondary={product.screenSize || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Screen Resolution" secondary={product.screenResolution || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Screen Technology" secondary={product.screenTechnology || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Processor" secondary={product.processor || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ram" secondary={product.ram || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Storage" secondary={product.storage || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Expandable Storage" secondary={product.expandableStorage || 'N/A'} />
        </ListItem>
      </List>
      
      <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: '#bdbdbd' }}>
        Graphics and Display
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Graphics card" secondary={product.gpu || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Refresh Rate" secondary={product.refreshRate || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Touch Screen" secondary={product.touchScreen || 'N/A'} />
        </ListItem>
      </List>
      
      <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: '#bdbdbd' }}>
        Battery
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Battery Capacity" secondary={product.batteryCapacity || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Battery Life" secondary={product.batteryLife || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Charging Speed" secondary={product.chargingSpeed || 'N/A'} />
        </ListItem>
      </List>
      
      <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: '#bdbdbd' }}>
        Connectivity
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Connectivity Ports" secondary={product.connectivityPorts || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Wifi Support" secondary={product.wifiSupport || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Bluetooth Version" secondary={product.bluetoothVersion || 'N/A'} />
        </ListItem>
      </List>
      
      <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: '#bdbdbd' }}>
        Additional features
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Weight" secondary={product.weight || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dimensions" secondary={product.Dimensions || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Color Options" secondary={product.colorOptions || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Fingerprint Sensor" secondary={product.fingerprintSensor || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Webcam" secondary={product.webcam || 'N/A'} />
        </ListItem>
      </List>
    </Paper>
  );

  return (
    <Box sx={{ padding: 4, backgroundColor: "#121212", color: "white", minHeight: "100vh" }}>
      <Grid container spacing={4} alignItems="flex-start">
  <Grid item xs={12} md={6}>
    <Typography variant="h4" gutterBottom>
      {product.name}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Brand: {product.brand}
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
    <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
      Product Bio
    </Typography>
    <Typography variant="body1" gutterBottom>
      {product.largeDescription}
    </Typography>
    <Card sx={{ marginTop: 2, marginBottom: 2 }}>
      <iframe
        src={`${product.commercial}&controls=0&autoplay=1`}
        title="Commercial"
        style={{ width: "100%", height: 300, border: "none" }}
        allow="autoplay"
        allowFullScreen
      />
    </Card>
    {renderLaptopDetails({ product })}
  </Grid>

  <Grid item xs={12} md={6}>
    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f50057", marginBottom: 2 }}>
      €{product.price}
    </Typography>
    <Button
      variant="contained"
      color="secondary"
      size="large"
      sx={{ marginBottom: 2, textTransform: "uppercase", fontWeight: "bold" }}
    >
      Add to Cart
    </Button>
  </Grid>
</Grid>
    </Box>
  );
}

export default DetailPage;