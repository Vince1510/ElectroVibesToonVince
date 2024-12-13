import React, { useState } from "react";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  const [open, setOpen] = useState(false);

  const categories = [
    "All",
    "Laptops",
    "Monitors",
    "Games",
    "Mice",
    "Phones",
    "Keyboards",
  ];

  const brands = [
    "Apple",
    "Samsung",
    "Logitech",
    "Corsair",
    "Rockstar Games",
    "Warner Bros. Games",
    "LG",
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
  };const FilterContent = () => (
    <Box
      sx={{
               width: { md: "300px" },
        padding: 2,
        backgroundColor: "#191919",
        color: "white",
      }}
    >
      <Typography variant="h6">Filter</Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
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
            {[
          { value: "none", label: "None" },
          { value: "lowToHigh", label: "Price: Low to High" },
          { value: "highToLow", label: "Price: High to Low" },
          { value: "aToZ", label: "Name: A to Z" },
          { value: "zToA", label: "Name: Z to A" },
        ].map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio sx={{ color: "white" }} />}
            label={label}
          />
        ))}
      </RadioGroup>

      <Typography sx={{ paddingTop: "20px" }}>Price</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={4000}
        sx={{ color: "white" }}
      />
      <Typography>{`${priceRange[0]} - ${priceRange[1]}`}</Typography>

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

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
      <Button
        variant="text"
        onClick={() => setOpen(true)}
        sx={{ 
          display: { xs: "block", md: "none" }, 
          border: "1px solid white", 
          color: "white", 
          marginBottom: 2 
        }}
      >
        Filter
      </Button>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <FilterContent />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle sx={{ backgroundColor: "#191919", color: "white" }}>
          Filter
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#191919", color: "white" }}>
          <FilterContent />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Filter;