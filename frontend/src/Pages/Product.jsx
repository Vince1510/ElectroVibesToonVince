import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  FormControlLabel,
  Drawer,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Product() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const laptopResponse = await fetch('http://localhost:4000/api/laptop');
        if (!laptopResponse.ok) {
          throw new Error(`HTTP error! Status: ${laptopResponse.status}`);
        }
        const laptops = await laptopResponse.json();
  
        const keyboardResponse = await fetch('http://localhost:4000/api/keyboards');
        if (!keyboardResponse.ok) {
          throw new Error(`HTTP error! Status: ${keyboardResponse.status}`);
        }
        const keyboards = await keyboardResponse.json();
  
        const phoneResponse = await fetch('http://localhost:4000/api/phones');
        if (!phoneResponse.ok) {
          throw new Error(`HTTP error! Status: ${phoneResponse.status}`);
        }
        const phones = await phoneResponse.json();
  
        // Combine both laptops and keyboards into a single array
        setProducts([...laptops, ...keyboards, ...phones]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = ['All', 'Laptop', 'Monitor', 'Games', 'Mouse', 'Phone', 'Keyboard', 'Headphones'];

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

  const filteredProducts = products.filter((product) => {
    const isWithinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const isCategoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const isBrandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const isSpecsMatch = selectedSpecs.length === 0 || selectedSpecs.every((spec) => Object.values(product.specs).includes(spec));
    return isWithinPriceRange && isCategoryMatch && isBrandMatch && isSpecsMatch;
  });

  const renderFilters = () => (
    <Box sx={{ width: 300, padding: 2, backgroundColor: '#191919', color: 'white' }}>
      <Typography variant="h6">Filter</Typography>

      <FormControl fullWidth variant="outlined" margin="normal" sx={{ color: 'white' }}>
        <InputLabel sx={{ color: 'white' }}>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
          sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
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
        sx={{ color: 'white' }}
      />
      <Typography>{`€${priceRange[0]} - €${priceRange[1]}`}</Typography>

      <Typography sx={{ paddingTop: '20px' }}>Brand</Typography>
      <FormGroup>
        {['Apple', 'Samsung', 'Logitech', 'Asus', 'Corsair', 'Dell', 'Google', 'Sony', 'OnePlus', 'Doogee'].map((brand) => (
          <FormControlLabel
            key={brand}
            control={<Checkbox checked={selectedBrands.includes(brand)} onChange={handleBrandChange} value={brand} sx={{ color: 'white' }} />}
            label={brand}
          />
        ))}
      </FormGroup>
    </Box>
  );

  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
      <Box sx={{ display: { xs: 'block', sm: 'none' }, padding: 2 }}>
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

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{renderFilters()}</Box>

      <Box sx={{ flexGrow: 1, paddingLeft: { sm: 3 }, paddingTop: { xs: 2, sm: 0 } }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
          Products Page
        </Typography>

        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {filteredProducts.map((product) => (
            <Grid item xs={4} sm={4} md={4} key={product._id}>
              <Card
                sx={{
                  width: '100%',
                  height: 330,
                  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)',
                  boxShadow: '0px 4px 4px 0px #000',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={product.imageCard}
                  alt={product.name}
                  sx={{
                    objectFit: 'contain',
                  }}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    paddingBottom: '0px',
                  }}
                >
                  <Typography
                    variant="h6"
                    color="white"
                    sx={{ fontSize: '1rem', marginBottom: '5px' }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      color: 'gray',
                      flexGrow: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      marginBottom: '5px',
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: 'auto',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: '1rem',
                      }}
                    >
                      {`€${product.price}`}
                    </Typography>
                  </Box>
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