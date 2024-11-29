import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
<<<<<<< Updated upstream
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Carousel from "react-material-ui-carousel";
import ProductCard from "../components/ProductCard";
import LaptopDetails from "../components/LaptopDetails";
import PhoneDetails from "../components/PhoneDetails";

function DetailPage() {
  const { productId } = useParams();
=======
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
>>>>>>> Stashed changes
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oftenBoughtProducts, setOftenBoughtProducts] = useState([]);
  const [othersAlsoLookProducts, setOthersAlsoLookProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
<<<<<<< Updated upstream
      try {
        const endpoints = [
          `http://localhost:4000/api/phones/${productId}`,
          `http://localhost:4000/api/laptops/${productId}`,
        ];

        for (const endpoint of endpoints) {
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
            if (typeof data.deliveryTime === "number") {
              const currentDate = new Date();
              currentDate.setDate(currentDate.getDate() + data.deliveryTime);
              const formattedDate = currentDate.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              });
              setDeliveryDate(formattedDate);
            }
            return;
          }
        }
        throw new Error("Product not found.");
=======
      if (!category || !productId) {
        console.error("Invalid category or product ID.");
        return;
      }
  
      try {
        // Convert category to lowercase to match API requirements
        const response = await fetch(`http://localhost:4000/api/${category.toLowerCase()}/${productId}`);
        if (!response.ok) {
          throw new Error(`Product not found in category: ${category}, ID: ${productId}`);
        }
        const foundProduct = await response.json();
        setProduct(foundProduct);
  
        // Calculate delivery date if available
        if (typeof foundProduct.deliveryTime === "number") {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + foundProduct.deliveryTime);
          setDeliveryDate(
            currentDate.toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })
          );
        }
>>>>>>> Stashed changes
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
<<<<<<< Updated upstream

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchRelatedProducts = async (codes) => {
      const endpoints = [
        "http://localhost:4000/api/laptops",
        "http://localhost:4000/api/keyboards",
        "http://localhost:4000/api/phones",
        "http://localhost:4000/api/games",
        "http://localhost:4000/api/mice",
        "http://localhost:4000/api/monitors",
      ];

      try {
        const products = await Promise.all(
          codes.map(async (code) => {
            for (const endpoint of endpoints) {
              try {
                const response = await fetch(`${endpoint}/${code}`);
                if (response.ok) {
                  return await response.json();
                }
              } catch (error) {
                console.warn(`Error fetching from ${endpoint}:`, error);
              }
            }
            console.warn(`Product with code ${code} not found in any endpoint.`);
            return null;
          })
        );
        return products.filter((product) => product !== null);
      } catch (error) {
        console.error("Error fetching related products:", error);
        return [];
      }
    };

    const fetchAllRelatedProducts = async () => {
      if (product) {
        const oftenBoughtProducts = await fetchRelatedProducts(product.oftenBoughtWith || []);
        const othersAlsoLookProducts = await fetchRelatedProducts(product.othersAlsoLookAt || []);

        setOftenBoughtProducts(oftenBoughtProducts);
        setOthersAlsoLookProducts(othersAlsoLookProducts);
      }
    };

    fetchAllRelatedProducts();
  }, [product]);

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography variant="h5">Product not found.</Typography>;
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
=======
  
    fetchProduct();
  }, [category, productId]);

  useEffect(() => {
    const fetchSingleProduct = async (id) => {
      try {
        // Fetch the product by ID from all possible categories
        const categories = ["phones", "laptops", "monitors", "mice", "keyboards", "games"];
        for (const category of categories) {
          try {
            const response = await fetch(`http://localhost:4000/api/${category}/${id}`);
            if (response.ok) {
              const product = await response.json();
              return product; // Return the product if found
            }
          } catch (error) {
            // Continue to next category if this one fails
            console.warn(`Error fetching product ${id} in category ${category}:`, error);
          }
        }
        console.warn(`Product with ID ${id} not found in any category.`);
        return null; // Return null if product is not found
      } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        return null;
      }
    };
  
    const fetchRelatedProducts = async (ids) => {
      try {
        const products = await Promise.all(
          ids.map(async (id) => {
            const product = await fetchSingleProduct(id);
            return product; // Return the product if found
          })
        );
  
        return products.filter((product) => product !== null); // Remove null entries
      } catch (error) {
        console.error("Error fetching related products:", error);
        return [];
      }
    };
  
    const fetchAllRelatedProducts = async () => {
      if (product) {
        // Use product IDs to fetch related products
        const oftenBoughtProducts = await fetchRelatedProducts(product.oftenBoughtWith || []);
        const othersAlsoLookProducts = await fetchRelatedProducts(product.othersAlsoLookAt || []);
        setOftenBoughtProducts(oftenBoughtProducts);
        setOthersAlsoLookProducts(othersAlsoLookProducts);
      }
    };
  
    fetchAllRelatedProducts();
  }, [product]);  
  
  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
>>>>>>> Stashed changes
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography variant="h5">Product not found.</Typography>;
  }

  return (
<<<<<<< Updated upstream
    <Box
      sx={{ padding: 4, backgroundColor: "transparent", color: "white", minHeight: "100vh" }}
    >
=======
    <Box sx={{ padding: 4, backgroundColor: "transparent", color: "white", minHeight: "100vh" }}>
>>>>>>> Stashed changes
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
<<<<<<< Updated upstream
            Brand:{" "}
            <span className="custom" style={{ cursor: "pointer" }}>
              {product.brand}
            </span>{" "}
            |{" "}
            <span className="custom" style={{ cursor: "pointer" }}>
              Write a review
            </span>{" "}
            |{" "}
            <span className="custom" style={{ cursor: "pointer" }}>
              Share
            </span>
=======
            Brand: <span style={{ cursor: "pointer" }}>{product.brand}</span> |{" "}
            <span style={{ cursor: "pointer" }}>Write a review</span> |{" "}
            <span style={{ cursor: "pointer" }}>Share</span>
>>>>>>> Stashed changes
          </Typography>
          <Card
            sx={{
              marginTop: 2,
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)",
              padding: 1,
            }}
          >
            <Carousel
              index={currentImage}
              onChange={(index) => setCurrentImage(index)}
              indicators={false}
              navButtonsAlwaysVisible
            >
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
              display: "flex",
              justifyContent: "center",
              gap: 1,
              padding: 2,
              overflowX: "auto",
            }}
          >
            {product.imageOverview.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                image={image}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: 60,
                  height: 60,
                  cursor: "pointer",
<<<<<<< Updated upstream
                  border:
                    currentImage === index
                      ? "2px solid white"
                      : "2px solid rgb(34, 34, 34)",
=======
                  border: currentImage === index ? "2px solid white" : "2px solid gray",
>>>>>>> Stashed changes
                  borderRadius: 1,
                  padding: 1,
                }}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </Box>
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
          <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
            Product Bio
          </Typography>
          {product.largeDescription
            .slice(0, showAllDescription ? product.largeDescription.length : 2)
            .map((description, index) => (
<<<<<<< Updated upstream
              <Typography
                key={index}
                variant="body1"
                gutterBottom
                sx={{ marginBottom: 2 }}
              >
=======
              <Typography key={index} variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
          <Card sx={{ marginTop: 4 }}>
            <iframe
              src={`${product.commercial}&controls=0`}
              title="Commercial"
              style={{ width: "100%", height: 300, border: "none" }}
              allowFullScreen
            />
          </Card>
<<<<<<< Updated upstream
          {product.category === "Phone" ? (
            <PhoneDetails product={product} />
          ) : (
            <LaptopDetails product={product} />
          )}
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ marginTop: 4 }}>
            Choose your color
          </Typography>
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    <span className="custom">€{product.dealPrice}</span>
=======
                    <span>€{product.dealPrice}</span>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                  <span className="custom">€{product.price}</span>
=======
                  <span>€{product.price}</span>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                Sold by{" "}
                <span className="custom">{product.seller}</span>{" "}
                <span className="custom-score-cover">
                  <span className="custom-score">{product.sellerScore}</span>
                </span>
=======
                Sold by <span>{product.seller}</span>{" "}
                <span style={{ fontWeight: "bold" }}>{product.sellerScore}</span>
>>>>>>> Stashed changes
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              sx={{
                fontWeight: "bold",
                background: "transparent",
                border: "1px solid white",
<<<<<<< Updated upstream
                justifyContent: 'space-between',
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          <Divider sx={{ marginY: 4, backgroundColor: "#424242" }} /><Grid item xs={12} md={6}>
          <Typography variant="h5">Often bought with</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              marginTop: 2,
            }}
          >
=======
          <Divider sx={{ marginY: 4, backgroundColor: "#424242" }} />
          <Typography variant="h5">Often bought with</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
>>>>>>> Stashed changes
            {oftenBoughtProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id || relatedProduct.code} product={relatedProduct} />
            ))}
          </Box>
<<<<<<< Updated upstream
          
          <Typography variant="h5" sx={{ marginTop: 4 }}>
            Others also look at
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              marginTop: 2,
            }}
          >
=======
          <Typography variant="h5" sx={{ marginTop: 4 }}>
            Others also look at
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
>>>>>>> Stashed changes
            {othersAlsoLookProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id || relatedProduct.code} product={relatedProduct} />
            ))}
          </Box>
<<<<<<< Updated upstream
          </Grid>
=======
>>>>>>> Stashed changes
        </Grid>
      </Grid>
    </Box>
  );
}

export default DetailPage;