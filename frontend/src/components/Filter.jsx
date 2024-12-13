import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";

const Filter = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  setSelectedSpecs,
  handleSortChange,
}) => {
  const categories = [
    "All",
    "Laptop",
    "Monitor",
    "Games",
    "Mouse",
    "Phone",
    "Keyboard",
    "Headphones",
  ];
  const brands = [
    "Apple",
    "Samsung",
    "Logitech",
    "Asus",
    "Corsair",
    "Dell",
    "Google",
    "Sony",
    "OnePlus",
    "Doogee",
  ];

  const handlePriceChange = (newValue) => {
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

  return (
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

      <Typography sx={{ paddingTop: "20px" }}>Sort By</Typography>
      <RadioGroup
        onChange={(e) => handleSortChange(e.target.value)}
        sx={{ color: "white" }}
      >
        <FormControlLabel
          value="none"
          control={<Radio sx={{ color: "white" }} />}
          label="None"
        />
        <FormControlLabel
          value="lowToHigh"
          control={<Radio sx={{ color: "white" }} />}
          label="Price: Low to High"
        />
        <FormControlLabel
          value="highToLow"
          control={<Radio sx={{ color: "white" }} />}
          label="Price: High to Low"
        />
        <FormControlLabel
          value="aToZ"
          control={<Radio sx={{ color: "white" }} />}
          label="Name: A to Z"
        />
        <FormControlLabel
          value="zToA"
          control={<Radio sx={{ color: "white" }} />}
          label="Name: Z to A"
        />
      </RadioGroup>

      <Typography sx={{ paddingTop: "20px" }}>Price</Typography>
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
        {brands.map((brand) => (
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
};

export default Filter;
