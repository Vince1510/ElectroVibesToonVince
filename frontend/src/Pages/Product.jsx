import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Drawer,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Filter from "../components/Filter";

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Fetch products and games from backend
  useEffect(() => {
    const fetchProductsAndGames = async () => {
      try {
        const responses = await Promise.all([
          fetch("http://localhost:4000/api/laptops"),
          fetch("http://localhost:4000/api/keyboards"),
          fetch("http://localhost:4000/api/phones"),
        ]);
    
        const data = await Promise.all(
          responses.map(async (response) => {
            if (!response.ok) {
              console.error(`Error fetching: ${response.url} - Status: ${response.status}`);
              return []; // Return an empty array for failed requests
            }
            return await response.json();
          })
        );
    
        const [laptops, keyboards, phones] = data;
        setProducts([...laptops, ...keyboards, ...phones]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    

    fetchProductsAndGames();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const isWithinPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const isCategoryMatch =
        selectedCategory === "All" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      const isBrandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const isSpecsMatch =
        selectedSpecs.length === 0 ||
        selectedSpecs.every((spec) =>
          Object.values(product.specs || {}).includes(spec)
        );
      return isWithinPriceRange && isCategoryMatch && isBrandMatch && isSpecsMatch;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
      {/* Filter Drawer for Small Screens */}
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
          <Box role="presentation">
            <Filter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedSpecs={selectedSpecs}
              setSelectedSpecs={setSelectedSpecs}
              handleSortChange={handleSortChange}
            />
          </Box>
        </Drawer>
      </Box>

      {/* Filter Panel for Larger Screens */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Filter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedSpecs={selectedSpecs}
          setSelectedSpecs={setSelectedSpecs}
          handleSortChange={handleSortChange}
        />
      </Box>

      {/* Products List */}
      <Box sx={{ flexGrow: 1, paddingLeft: { sm: 3 }, paddingTop: { xs: 2, sm: 0 } }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Products Page
        </Typography>

        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {filteredProducts.map((product) => (
            <Grid item xs={4} sm={4} md={4} key={product._id}>
              <Link
                to={`/detail/${product.category}/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: 330,
                    background:
                      "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)",
                    boxShadow: "0px 4px 4px 0px #000",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={product.imageCard}
                    alt={product.name}
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flexGrow: 1,
                      paddingBottom: "0px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="white"
                      sx={{ fontSize: "1rem", marginBottom: "5px" }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: "gray",
                        flexGrow: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        marginBottom: "5px",
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "auto" }}>
                      <Typography
                        sx={{ fontWeight: "bold", color: "white", fontSize: "1rem" }}
                      >
                        {`€${product.price}`}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Product;