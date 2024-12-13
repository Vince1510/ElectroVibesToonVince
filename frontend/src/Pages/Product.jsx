import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import CompareList from "../components/CompareList";
import FilterPanel from "../components/FilterPanel";

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");

  const [compareList, setCompareList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsAndGames = async () => {
      try {
        const endpoints = [
          "http://localhost:4000/api/laptops",
          "http://localhost:4000/api/keyboards",
          "http://localhost:4000/api/phones",
          "http://localhost:4000/api/games",
          "http://localhost:4000/api/mice",
          "http://localhost:4000/api/monitors",
        ];

        const responses = await Promise.all(
          endpoints.map((url) => fetch(url).catch((err) => err))
        );

        const data = await Promise.all(
          responses.map(async (response, index) => {
            if (!response.ok) {
              console.error(
                `Error fetching: ${endpoints[index]} - Status: ${response.status}`
              );
              return [];
            }
            const result = await response.json();
            return result;
          })
        );

        const [laptops, keyboards, phones, games, mice, monitors] = data;
        const combinedProducts = [
          ...laptops,
          ...keyboards,
          ...phones,
          ...games,
          ...monitors,
          ...mice,
        ];

        setProducts(combinedProducts);
      } catch (error) {
        console.error("Error fetching products:", error.message, error);
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

      const isIncluded =
        isWithinPriceRange && isCategoryMatch && isBrandMatch && isSpecsMatch;

      if (!isIncluded) {
        console.warn("Filtered Out Product:", product);
      }
      return isIncluded;
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
      return;
    }

    const updatedCompareList = [...compareList, product];
    setCompareList(updatedCompareList);

    if (updatedCompareList.length === 2) {
      setTimeout(() => {
        navigate("/compare", { state: { products: updatedCompareList } });
      }, 300);
    }
  };

  const handleRemoveFromCompare = (productId) => {
    setCompareList((prev) =>
      prev.filter((product) => product._id !== productId)
    );
  };

  const clearCompareList = () => {
    setCompareList([]);
  };

  return (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
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

      <Box
        sx={{
          flexGrow: 1,
          paddingLeft: { sm: 3 },
          paddingBottom: 10,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Products Page
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={3} // Controls spacing between cards
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Box
              key={product._id}
              sx={{
                flex: "1 1 calc(25% - 16px)",
                maxWidth: "calc(25% - 16px)",
                minWidth: "250px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ProductCard product={product} onCompare={handleCompare} />
            </Box>
          ))
        ) : (
          <Typography variant="h6" sx={{ color: "white", marginTop: 2 }}>
          No products found.
        </Typography>
      )}
             </Box>
      </Box>

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
