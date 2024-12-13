import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Box,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import CompareList from "../components/CompareList";
import FilterPanel from "../components/FilterPanel";
import { useMediaQuery } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");

  const [compareList, setCompareList] = useState([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const navigate = useNavigate();

  // Using useMediaQuery to check the screen size
  const isLargeScreen = useMediaQuery("(min-width:1170px)");

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
      {/* For screens larger than 1170px, show FilterPanel to the right */}
      {isLargeScreen && (
        <Box sx={{ display: { xs: "none", sm: "block" }, width: "25%" }}>
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
      )}

      {/* For smaller screens, show a sticky left-side filter modal */}
      {!isLargeScreen && (
        <>
          <Button
            onClick={() => setOpenFilterModal(true)}
            variant="contained"
            sx={{
              position: "absolute",

              zIndex: 1000,
              backgroundColor: "transparent",
              borderRadius: "50%",
              position: "absolute",
              top: "90px",
              right: "20px",
              color: "#fff",
              border: "1px solid",
              borderImage:
                "linear-gradient(180deg, #E70002 0%, #FCD201 100%) 1",
            }}
          >
            <FilterAltIcon sx={{ color: "white" }} />
          </Button>

          {/* Sticky Left-Side Filter Modal for smaller screens */}
          <Modal
            open={openFilterModal}
            onClose={() => setOpenFilterModal(false)}
            aria-labelledby="filter-modal-title"
            aria-describedby="filter-modal-description"
          >
            <Box
              sx={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "300px",
                height: "100%",
                backgroundColor: "white",
                zIndex: 1000,
                overflowY: "auto",
                boxShadow: 2,
                backgroundColor: "#191919",
              }}
            >
              <IconButton
                onClick={() => setOpenFilterModal(false)}
                sx={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  borderRadius: "50%",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "#fff",
                  border: "1px solid",
                  borderImage:
                    "linear-gradient(180deg, #E70002 0%, #FCD201 100%) 1",
                }}
              >
                <CloseIcon />
              </IconButton>
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
          </Modal>
        </>
      )}

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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onCompare={handleCompare}
              />
            ))
          ) : (
            <Typography variant="h6" sx={{ color: "white", marginTop: 2 }}>
              No products found.
            </Typography>
          )}
        </Grid>
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
