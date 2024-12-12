import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  Box,
  Grid,
  Button,
  CircularProgress,
  Divider,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Carousel from "react-material-ui-carousel";
import ProductCard from "../components/ProductCard";
import PhoneDetails from "../components/PhoneDetails";
import GameDetails from "../components/GameDetails";
import MouseDetails from "../components/MouseDetails";
import LaptopDetails from "../components/LaptopDetails";
import MonitorDetails from "../components/MonitorDetails";
import KeyboardDetails from "../components/KeyboardDetails";

function DetailPage() {
  const { category, productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [oftenBoughtProducts, setOftenBoughtProducts] = useState([]);
  const [othersAlsoLookProducts, setOthersAlsoLookProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null); // Add a default value

  useEffect(() => {
    const fetchProduct = async () => {
      if (product) return; // Skip if already loaded

      try {
        const response = await fetch(`http://localhost:4000/api/${category.toLowerCase()}/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        const foundProduct = await response.json();
        setProduct(foundProduct);
        setDeliveryDate("Estimated delivery: 3-5 business days"); // Example static delivery date
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category, productId, product]);

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleAddToCart = () => {
    console.log(`Adding ${product.name} to the cart`);
    // Implement adding product to cart functionality here
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5" color="error">
          Product not found. Please check back later.
        </Typography>
      </Box>
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
            Brand: <span style={{ cursor: "pointer" }}>{product.brand}</span> |{" "}
            <span style={{ cursor: "pointer" }}>Write a review</span> |{" "}
            <span style={{ cursor: "pointer" }}>Share</span>
          </Typography><Card
  sx={{
    marginTop: 2,
    background:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)",
    padding: 2,
    borderRadius: 2,
    boxShadow: 3, // Adds a slight shadow for a modern look
  }}
>
  <Carousel
    index={currentImage}
    onChange={(index) => setCurrentImage(index)}
    indicators={false}
    navButtonsAlwaysVisible
    sx={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    {product.imageOverview.map((image, index) => (
      <CardMedia
        key={index}
        component="img"
        image={image}
        alt={`Thumbnail ${index + 1}`}
        sx={{
          width: "100%", // Ensures the carousel image takes the full width of the container
          height: 400, // Adjusts the height of the carousel images
          objectFit: "contain", // Makes sure the images retain their aspect ratio
          borderRadius: 1,
        }}
      />
    ))}
  </Carousel>

</Card>
  {/* Thumbnail Row */}
  <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
    {product.imageOverview.map((image, index) => (
      <CardMedia
        key={index}
        component="img"
        image={image}
        alt={`Thumbnail ${index + 1}`}
        sx={{
          width: 80, // Slightly bigger thumbnails for better visibility
          height: 80,
          cursor: "pointer",
          border: currentImage === index ? "3px solid #fff" : "2px solid #aaa", // Highlight selected thumbnail with a white border
          borderRadius: 1,
          margin: "0 8px", // Adds some space between the thumbnails
          transition: "transform 0.3s ease", // Smooth scale transition on hover
          ":hover": {
            transform: "scale(1.1)", // Enlarges the thumbnail slightly on hover
            border: "3px solid #fff", // Highlight on hover
          },
        }}
        onClick={() => handleThumbnailClick(index)} // Clicking a thumbnail will update the currentImage
      />
    ))}
  </Box>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
            Product Bio
          </Typography>
          {product.largeDescription
            .slice(0, showAllDescription ? product.largeDescription.length : 2)
            .map((description, index) => (
              <Typography key={index} variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
                {description}
              </Typography>
            ))}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setShowAllDescription(!showAllDescription)}
              sx={{ color: "#ffffff", borderColor: "#ffffff", width: 150 }}
            >
              {showAllDescription ? "Show Less" : "Show More"}
            </Button>
          </Box>
          <Card sx={{ marginTop: 4 }}>
            <iframe
              src={`${product.commercial}&controls=0`}
              title="Commercial"
              style={{ width: "100%", height: 300, border: "none" }}
              allowFullScreen
            />
          </Card>
          {product.category === "Phones" ? (
            <PhoneDetails product={product} />
          ) : product.category === "Laptops" ? (
            <LaptopDetails product={product} />
          ) : product.category === "Games" ? (
            <GameDetails product={product} />
          ) : product.category === "Mice" ? (
            <MouseDetails product={product} />
          ) : product.category === "Monitors" ? (
            <MonitorDetails product={product} />
          ) : product.category === "Keyboards" ? (
            <KeyboardDetails product={product} />
          ) : (
            <Typography>Category not found!</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Choose your color</Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2, flexWrap: "wrap" }}>
            {product.color.map((color, index) => (
              <Box
                key={index}
                onClick={() => handleColorSelect(color)}
                sx={{
                  width: 25,
                  height: 25,
                  backgroundColor: color,
                  borderRadius: "50%",
                  border: selectedColor === color ? "2px solid white" : "2px solid gray",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              />
            ))}
          </Box>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Choose your model
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2, marginBottom: 2, flexWrap: "wrap" }}>
            {product.model.map((model, index) => (
              <Box
                key={index}
                onClick={() => handleModelSelect(model)}
                sx={{
                  padding: "8px 16px",
                  borderRadius: 2,
                  border: selectedModel === model ? "2px solid white" : "2px solid gray",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: "white",
                  transition: "0.3s",
                  textAlign: "center",
                }}
              >
                {model}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Box>
              {product.dealPrice ? (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#f50057",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <span>€{product.dealPrice}</span>
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: "line-through",
                        color: "#b0b0b0",
                        fontSize: "1rem",
                      }}
                    >
                      €{product.price}
                    </Typography>
                  </Typography>
                </Box>
              ) : (
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f50057" }}>
                  <span>€{product.price}</span>
                </Typography>
              )}
              <Typography variant="body1" gutterBottom>
                Delivered no later than{" "}
                <span>{deliveryDate || "N/A"}</span>
                <Tooltip
                  title="This delivery date may vary during holidays or special circumstances."
                  arrow
                >
                  <InfoOutlinedIcon
                    style={{
                      marginLeft: "2px",
                      fontSize: "1rem",
                      verticalAlign: "middle",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </Typography>
              <Typography variant="body1">
                Sold by <span>{product.seller}</span>{" "}
                <span style={{ fontWeight: "bold" }}>{product.sellerScore}</span>
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={handleAddToCart}
              sx={{
                fontWeight: "bold",
                background: "transparent",
                border: "1px solid white",
                alignSelf: "end",
                marginTop: 4,
                borderRadius: 2,
                width: 140,
                height: 45,
              }}
            >
              <ShoppingCartIcon /> In Cart
            </Button>
          </Box>
          <Divider sx={{ marginY: 4, backgroundColor: "#424242" }} />
          <Typography variant="h5">Often Bought With</Typography>
          <Grid container spacing={1}>
            {oftenBoughtProducts.map((prod) => (
              <Grid item key={prod.id || prod._id || Math.random()}>
                <ProductCard product={prod} />
              </Grid>
            ))}
          </Grid>
          
          <Typography variant="h5">Others Also Look At</Typography>
          <Grid container spacing={1}>
            {othersAlsoLookProducts.map((prod) => (
              <Grid item key={prod.id}>
                <ProductCard product={prod} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailPage;