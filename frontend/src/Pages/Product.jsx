import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Box, Button } from "@mui/material";
import ProductCard from "../components/ProductCard";
import CompareList from "../components/CompareList";
import FilterPanel from "../components/FilterPanel";

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Comparison functionality
  const [compareList, setCompareList] = useState([]);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchProductsAndGames = async () => {
      try {
        const responses = await Promise.all([
          fetch("http://localhost:4000/api/laptops"),
          fetch("http://localhost:4000/api/keyboards"),
          fetch("http://localhost:4000/api/phones"),
          fetch("http://localhost:4000/api/games"),
          fetch("http://localhost:4000/api/mice"),
          fetch("http://localhost:4000/api/monitors"),
        ]);

        const data = await Promise.all(
          responses.map(async (response) => {
            if (!response.ok) {
              console.error(
                `Error fetching: ${response.url} - Status: ${response.status}`
              );
              return []; // Return an empty array for failed requests
            }
            return await response.json();
          })
        );

        const [laptops, keyboards, phones, games, mice, monitors] = data;
        setProducts([
          ...laptops,
          ...keyboards,
          ...phones,
          ...games,
          ...monitors,
          ...mice,
        ]);
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
        product.category?.toLowerCase() === selectedCategory.toLowerCase();
      const isBrandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const isSpecsMatch =
        selectedSpecs.length === 0 ||
        selectedSpecs.every((spec) =>
          Object.values(product.specs || {}).includes(spec)
        );
      return (
        isWithinPriceRange && isCategoryMatch && isBrandMatch && isSpecsMatch
      );
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      if (sortOrder === "aToZ") return a.name.localeCompare(b.name);
      if (sortOrder === "zToA") return b.name.localeCompare(a.name);
      return 0;
    });

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleCompare = (product) => {
    if (compareList.some((item) => item._id === product._id)) {
      return; // Prevent adding duplicate products
    }

    const updatedCompareList = [...compareList, product];
    setCompareList(updatedCompareList);

    // Redirect after the state is updated and if two products are selected
    if (updatedCompareList.length === 2) {
      setTimeout(() => {
        navigate("/compare", { state: { products: updatedCompareList } });
      }, 300); // Delay navigation slightly to allow event propagation
    }
  };

  const handleRemoveFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((product) => product._id !== productId));
  };

  const clearCompareList = () => {
    setCompareList([]);
  };

  return (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
      {/* Filter Panel */}
      <Box sx={{ display: { xs: "block", sm: "block" } }}>
        <FilterPanel
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
      <Box
        sx={{
          flexGrow: 1,
          paddingLeft: { sm: 3 },
          paddingTop: { xs: 2, sm: 0 },
          paddingBottom: 10,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Products Page
        </Typography>

        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onCompare={handleCompare} // Pass compare handler to ProductCard
            />
          ))}
        </Grid>
      </Box>

      {/* Compare List */}
      {compareList.length > 0 && (
        <CompareList
          compareList={compareList}
          onRemove={handleRemoveFromCompare}
          onClear={clearCompareList}
        />
      )}
    </Box>
  );
}

export default Product;