import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
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
  const [deliveryDate, setDeliveryDate] = useState(null);
  const { addToCart } = useCart();

  const transformRelatedProducts = (relatedProducts) => {
    if (!Array.isArray(relatedProducts)) {
      console.error("Invalid relatedProducts format:", relatedProducts);
      return [];
    }
    return relatedProducts
      .map((item) => {
        // Ensure item is an object and contains keys "0" and "1"
        if (item && item[0] && item[1]) {
          return { id: item[0], category: item[1] };
        } else {
          console.error("Malformed item in relatedProducts:", item);
          return null;
        }
      })
      .filter(Boolean);
  };

  // Fetch full product details
  const fetchFullProductDetails = async (relatedProducts) => {
    try {
      const products = await Promise.all(
        relatedProducts.map(({ id, category }) => {
          const url = `http://localhost:4000/api/${category.toLowerCase()}/${id}`;
          return fetch(url)
            .then((res) => (res.ok ? res.json() : null))
            .catch((err) => {
              console.error(
                `Error fetching product ${id} in category ${category}:`,
                err
              );
              return null;
            });
        })
      );

      return products.filter(Boolean);
    } catch (err) {
      console.error("Error fetching related products:", err);
      return [];
    }
  };

  // Fetch product data
  const fetchProductData = async () => {
    try {
      const productResponse = await fetch(
        `http://localhost:4000/api/${category.toLowerCase()}/${productId}`
      );
      if (!productResponse.ok) throw new Error("Failed to fetch product");

      const productData = await productResponse.json();
      setProduct(productData);

      const oftenBought = transformRelatedProducts(
        productData.oftenBoughtWith || []
      );
      const othersLook = transformRelatedProducts(
        productData.othersAlsoLookAt || []
      );

      const [oftenBoughtDetails, othersLookDetails] = await Promise.all([
        fetchFullProductDetails(oftenBought),
        fetchFullProductDetails(othersLook),
      ]);

      setOftenBoughtProducts(oftenBoughtDetails);
      setOthersAlsoLookProducts(othersLookDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Main useEffect hook
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await fetch(
          `http://localhost:4000/api/${category.toLowerCase()}/${productId}`
        );
        if (!productResponse.ok) throw new Error("Failed to fetch product");
        const productData = await productResponse.json();
        setProduct(productData);
        // Transform related products
        const oftenBought = transformRelatedProducts(
          productData.oftenBoughtWith || []
        );
        const othersLook = transformRelatedProducts(
          productData.othersAlsoLookAt || []
        );

        // Fetch details for related products
        const [oftenBoughtDetails, othersLookDetails] = await Promise.all([
          fetchFullProductDetails(oftenBought),
          fetchFullProductDetails(othersLook),
        ]);

        setOftenBoughtProducts(oftenBoughtDetails);
        setOthersAlsoLookProducts(othersLookDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [category, productId]);

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
    if (!product) {
      alert("Product information is not available.");
      return;
    }
    if (!selectedColor || !selectedModel) {
      alert("Please select a color and model.");
      return;
    }

    const productToAdd = {
      id: product.id || product._id || "unknown",
      name: product.name || "Unnamed Product",
      price: product.dealPrice || product.price || 0,
      color: selectedColor,
      model: selectedModel,
      image: product.imageOverview?.[0] || "placeholder-image-url",
      seller: product.seller || "Unknown Seller",
    };

    addToCart(productToAdd);
    alert("Product added to cart!");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h5" color="error">
          Product not found. Please check back later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "transparent",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Brand: <span style={{ cursor: "pointer" }}>{product.brand}</span> |{" "}
            <span style={{ cursor: "pointer" }}>Write a review</span> |{" "}
            <span style={{ cursor: "pointer" }}>Share</span>
          </Typography>

          {/* Product Carousel */}
          <Card
            sx={{
              marginTop: 2,
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)",
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
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
                maxHeight: { xs: 300, sm: 400 },
              }}
            >
              {product.imageOverview.map((image, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={image}
                  alt={`Thumbnail ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: { xs: 300, sm: 400 },
                    objectFit: "contain",
                    borderRadius: 1,
                  }}
                />
              ))}
            </Carousel>
          </Card>
          {/* Thumbnail Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
              marginTop: 2,
            }}
          >
            {product.imageOverview.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                image={image}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  cursor: "pointer",
                  border:
                    currentImage === index
                      ? "3px solid #fff"
                      : "2px solid #aaa",
                  borderRadius: 1,
                  transition: "transform 0.3s ease",
                  ":hover": {
                    transform: "scale(1.1)",
                    border: "3px solid #fff",
                  },
                }}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </Box>

          {/* Product Description */}
          <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
            Product Bio
          </Typography>
          {product.largeDescription
            .slice(0, showAllDescription ? product.largeDescription.length : 2)
            .map((description, index) => (
              <Typography
                key={index}
                variant="body1"
                gutterBottom
                sx={{ marginBottom: 2 }}
              >
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

          {/* Category-specific Details */}
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
          {/* Color Selection */}
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
                  border:
                    selectedColor === color
                      ? "2px solid white"
                      : "2px solid gray",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              />
            ))}
          </Box>

          {/* Model Selection */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Choose your model
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
              marginBottom: 2,
              flexWrap: "wrap",
            }}
          >
            {product.model.map((model, index) => (
              <Box
                key={index}
                onClick={() => handleModelSelect(model)}
                sx={{
                  padding: "8px 16px",
                  borderRadius: 2,
                  border:
                    selectedModel === model
                      ? "2px solid white"
                      : "2px solid gray",
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

          {/* Price and Cart */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
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
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#f50057" }}
                >
                  <span>€{product.price}</span>
                </Typography>
              )}
              <Typography variant="body1" gutterBottom>
                Delivered no later than <span>{deliveryDate || "N/A"}</span>
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
                <span style={{ fontWeight: "bold" }}>
                  {product.sellerScore}
                </span>
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
                width: { xs: 45, sm: 140 },
                height: 45,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ShoppingCartIcon sx={{ display: { xs: "block", sm: "none" } }} />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>In Cart</Box>
            </Button>
          </Box>

          {/* Often Bought With Section */}
          <Divider sx={{ marginY: 4, backgroundColor: "#424242" }} />
          <Typography variant="h5">Often Bought With</Typography>
          <Grid container spacing={1} sx={{ marginY: 2, width: "110%" }}>
            {oftenBoughtProducts.map((prod) => (
              <Grid item key={prod.id || prod._id || Math.random()}>
                <ProductCard product={prod} />
              </Grid>
            ))}
          </Grid>

          {/* Others Also Look At Section */}
          <Typography variant="h5">Others Also Look At</Typography>
          <Grid container spacing={1} sx={{ marginY: 2, width: "110%" }}>
            {othersAlsoLookProducts.map((prod) => (
              <Grid item key={prod.id || prod._id || Math.random()}>
                <ProductCard product={prod} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DetailPage;
