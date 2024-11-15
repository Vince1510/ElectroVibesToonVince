import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FormControlLabel } from "@mui/material";

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Box,
  Checkbox,
  FormGroup,
  Drawer,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Product() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [games, setGames] = useState([]); // For games data
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Fetch products and games from backend
  useEffect(() => {
    const fetchProductsAndGames = async () => {
      try {
        // Fetch products based on the selected category
        const categoryQuery =
          selectedCategory !== "All" ? `?category=${selectedCategory}` : "";

        let url = "";

        if (selectedCategory === "Monitor") {
          // Fetch only the monitors
          const monitorResponse = await fetch(
            "http://localhost:4000/api/monitors"
          );
          const monitorData = await monitorResponse.json();
          setProducts(monitorData);
        } else if (selectedCategory === "Games" || selectedCategory === "All") {
          // Fetch games only if "Games" category is selected or "All" is selected
          const gameResponse = await fetch("http://localhost:4000/api/games");
          const gameData = await gameResponse.json();
          setGames(gameData);

          // Fetch other product categories for "All"
          const productCategories = [
            "laptops",
            "keyboards",
            "phones",
            "mice",
            "monitors",
          ];
          const responses = await Promise.all(
            productCategories.map((category) =>
              fetch(
                `http://localhost:4000/api/${category}${categoryQuery}`
              ).then((res) => res.json())
            )
          );
          // Combine all products into one array
          setProducts(responses.flat());
        } else {
          // Fetch other product categories if a category like Laptop, Mouse, etc. is selected
          const fetchCategory = (category) =>
            fetch(`http://localhost:4000/api/${category}${categoryQuery}`).then(
              (res) => res.json()
            );

          const productCategories = ["laptops", "keyboards", "phones", "mice"];
          const responses = await Promise.all(
            productCategories.map((category) => fetchCategory(category))
          );
          setProducts(responses.flat());
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsAndGames();
  }, [selectedCategory]);

  const categories = [
    "All",
    "Laptop",
    "Monitor",
    "Games",
    "Mouse",
    "Phone",
    "Keyboard",
  ];

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSpecs([]);
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    if (selectedBrands.includes(value)) {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== value));
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }
  };

  const handleSpecsChange = (event) => {
    const value = event.target.value;
    if (selectedSpecs.includes(value)) {
      setSelectedSpecs(selectedSpecs.filter((spec) => spec !== value));
    } else {
      setSelectedSpecs([...selectedSpecs, value]);
    }
  };

  // Combine the products with the games based on the selected category
  // Combine the products with the games based on the selected category
  const filteredProducts =
    selectedCategory === "Games" || selectedCategory === "All"
      ? [
          ...games.filter((game) => {
            const isWithinPriceRange =
              game.price >= priceRange[0] && game.price <= priceRange[1];

            const isBrandMatch =
              selectedBrands.length === 0 ||
              selectedBrands.includes(game.brand);

            const isSpecsMatch =
              selectedSpecs.length === 0 ||
              selectedSpecs.every((spec) =>
                Object.values(game.specs).includes(spec)
              );

            return isWithinPriceRange && isBrandMatch && isSpecsMatch;
          }),
          ...products.filter((product) => {
            const isWithinPriceRange =
              product.price >= priceRange[0] && product.price <= priceRange[1];

            const isCategoryMatch =
              selectedCategory === "All" ||
              product.category === selectedCategory;

            const isBrandMatch =
              selectedBrands.length === 0 ||
              selectedBrands.includes(product.brand);

            const isSpecsMatch =
              selectedSpecs.length === 0 ||
              selectedSpecs.every((spec) =>
                Object.values(product.specs).includes(spec)
              );

            return (
              isWithinPriceRange &&
              isCategoryMatch &&
              isBrandMatch &&
              isSpecsMatch
            );
          }),
        ]
      : products.filter((product) => {
          const isWithinPriceRange =
            product.price >= priceRange[0] && product.price <= priceRange[1];

          const isCategoryMatch =
            selectedCategory === "All" || product.category === selectedCategory;

          const isBrandMatch =
            selectedBrands.length === 0 ||
            selectedBrands.includes(product.brand);

          const isSpecsMatch =
            selectedSpecs.length === 0 ||
            selectedSpecs.every((spec) =>
              Object.values(product.specs).includes(spec)
            );

          return (
            isWithinPriceRange &&
            isCategoryMatch &&
            isBrandMatch &&
            isSpecsMatch
          );
        });

  const renderFilters = () => (
    <Box
      sx={{
        width: 300,
        padding: 2,
        backgroundColor: "#191919",
        color: "white",
      }}
    >
      <Typography variant="h6">Filter</Typography>

      <FormControl
        fullWidth
        variant="outlined"
        margin="normal"
        sx={{ color: "white" }}
      >
        <InputLabel sx={{ color: "white" }}>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
          sx={{
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography>Price</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={3000}
        sx={{ color: "white" }}
      />
      <Typography>{`€${priceRange[0]} - €${priceRange[1]}`}</Typography>

      <Typography sx={{ paddingTop: "20px" }}>Brand</Typography>
      <FormGroup>
        {[
          "Apple",
          "Samsung",
          "Logitech",
          "Asus",
          "Corsair",
          "Dell",
          "Google",
          "Sony",
        ].map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={handleBrandChange}
                value={brand}
                sx={{ color: "white" }}
              />
            }
            label={brand}
          />
        ))}
      </FormGroup>
    </Box>
  );

  return (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
      <Box sx={{ display: { xs: "block", sm: "none" }, padding: 2 }}>
        <Button
          variant="contained"
          startIcon={<MenuIcon />}
          onClick={() => setIsFilterDrawerOpen(true)}
        >
          Filters
        </Button>
        <Drawer
          anchor="left"
          open={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
        >
          {renderFilters()}
        </Drawer>
      </Box>

      <Box sx={{ display: { xs: "none", sm: "block" } }}>{renderFilters()}</Box>

      <Box
        sx={{
          flexGrow: 1,
          paddingLeft: { sm: 3 },
          paddingTop: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Products Page
        </Typography>

        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {filteredProducts.map((product) => (
            <Grid item xs={4} sm={4} md={4} key={product._id}>
              <Card
                sx={{
                  width: "100%",
                  height: 330,
                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)",
                  boxShadow: "0px 4px 4px 0px #000",
                  borderRadius: "10px",
                  transition: "all 0.3s ease",
                  ":hover": { transform: "translateY(-8px)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageCard}
                  alt={product.name}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "600", color: "white" }}
                  >
                    {product.name} {/* Display 'name' instead of 'title' */}
                  </Typography>

                  <Typography variant="body2" color="white">
                    {product.description}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ marginTop: "10px", color: "white" }}
                  >
                    Price: €{product.price}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ marginTop: "10px", color: "white" }}
                  >
                    Brand: {product.brand} {/* Display 'brand' */}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    Code: {product.code} {/* Display 'code' */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Product;
