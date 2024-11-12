import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Grid, Select, MenuItem, FormControl, InputLabel, Slider, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

function Product() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const products = [
    { id: 1, title: 'Apple MacBook Air (M1)', description: '13-inch, 8GB RAM, 256GB SSD', category: 'Laptop', price: 999, brand: 'Apple', specs: { memory: '8GB RAM', display: '13-inch', feature: '' }, image: './assets/images/macbook_air.jpg' },
    { id: 2, title: 'Samsung Galaxy S23 Ultra', description: '256GB, 6.8-inch Display, 108MP Camera', category: 'Smartphones', price: 1200, brand: 'Samsung', specs: { memory: '', display: '6.8-inch', feature: '108MP Camera' }, image: './assets/images/galaxy_s23_ultra.png' },
    { id: 3, title: 'Sony PlayStation 5', description: '825GB SSD, 4K Gaming Console', category: 'Games', price: 499, brand: 'Sony', specs: { memory: '', display: '4K', feature: '825GB SSD' }, image: './assets/images/playstation_5.png' },
    { id: 4, title: 'Logitech MX Master 3', description: 'Wireless Bluetooth Mouse, Ergonomic Design', category: 'Mouse', price: 99, brand: 'Logitech', specs: { memory: '', display: '', feature: 'Wireless' }, image: './assets/images/mx_master_3.webp' },
    { id: 5, title: 'Dell UltraSharp 27" 4K Monitor', description: 'IPS, 60Hz, USB-C', category: 'Monitor', price: 699, brand: 'Dell', specs: { memory: '', display: '27-inch 4K', feature: 'USB-C' }, image: './assets/images/dell_ultrasharp.webp' },
    { id: 6, title: 'Razer BlackWidow V3', description: 'Mechanical Gaming Keyboard, Green Switches', category: 'Keyboards', price: 149, brand: 'Razer', specs: { memory: '', display: '', feature: 'Mechanical' }, image: './assets/images/blackwidow_v3.png' },
    { id: 7, title: 'Apple iPhone 14 Pro', description: '128GB, 6.1-inch Display', category: 'Smartphones', price: 1099, brand: 'Apple', specs: { memory: '', display: '6.1-inch', feature: '' }, image: './assets/images/iphone_14_pro.png' },
    { id: 8, title: 'Acer Nitro 5 Gaming Laptop', description: '15.6-inch, 16GB RAM, 512GB SSD', category: 'Laptop', price: 1299, brand: 'Acer', specs: { memory: '16GB RAM', display: '15.6-inch', feature: '512GB SSD' }, image: './assets/images/acer_nitro_5.png' },
    { id: 9, title: 'Samsung Odyssey G9', description: '49-inch Curved Gaming Monitor', category: 'Monitor', price: 1799, brand: 'Samsung', specs: { memory: '', display: '49-inch Curved', feature: '' }, image: './assets/images/odyssey_g9.avif' },
    { id: 10, title: 'Asus ROG Strix G15', description: 'Gaming Laptop, 32GB RAM, 1TB SSD', category: 'Laptop', price: 1999, brand: 'Asus', specs: { memory: '32GB RAM', display: '15.6-inch', feature: '1TB SSD' }, image: './assets/images/rog_strix_g15.png' },
    { id: 11, title: 'Corsair K70 RGB', description: 'Mechanical Gaming Keyboard, Cherry MX Red', category: 'Keyboards', price: 179, brand: 'Corsair', specs: { memory: '', display: '', feature: 'Mechanical' }, image: './assets/images/k70_rgb.png' },
    { id: 12, title: 'Sony WH-1000XM5', description: 'Wireless Noise Cancelling Headphones', category: 'Headphones', price: 399, brand: 'Sony', specs: { memory: '', display: '', feature: 'Noise Cancelling' }, image: './assets/images/wh_1000xm5.avif' }
  ];

  const categories = ['All', 'Laptop', 'Monitor', 'Games', 'Mouse', 'Smartphones', 'Keyboards', 'Headphones'];

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
    const isSpecsMatch = selectedSpecs.length === 0 || selectedSpecs.every(spec => Object.values(product.specs).includes(spec));
    return isWithinPriceRange && isCategoryMatch && isBrandMatch && isSpecsMatch;
  });

  return (
    <Box display="flex">
      {/* Sidebar for Filters */}
      <Box sx={{ width: '300px', backgroundColor: '#191919', color: 'white', padding: 2, position: 'sticky', top: 0, height: 'auto', marginBottom: '30px'}}>
        <Typography variant="h6">Filter</Typography>

        {/* Category Filter */}
        <FormControl fullWidth variant="outlined" margin="normal" sx={{ color: 'white' }}>
          <InputLabel sx={{ color: 'white' }}>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
            sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
          >
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Filter */}
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

        {/* Brand Filter */}
        <Typography sx={{ paddingTop: '20px' }}>Brand</Typography>
        <FormGroup>
          {['Apple', 'Samsung', 'Sony', 'Logitech', 'Razer', 'Asus', 'Corsair', 'Dell'].map((brand) => (
            <FormControlLabel
              key={brand}
              control={<Checkbox checked={selectedBrands.includes(brand)} onChange={handleBrandChange} value={brand} sx={{ color: 'white' }} />}
              label={brand}
            />
          ))}
        </FormGroup>

        {/* Memory Filter */}
        <Typography sx={{ paddingTop: '20px' }}>Memory</Typography>
        <FormGroup>
          {['8GB RAM', '16GB RAM', '32GB RAM'].map((spec) => (
            <FormControlLabel
              key={spec}
              control={<Checkbox checked={selectedSpecs.includes(spec)} onChange={handleSpecsChange} value={spec} sx={{ color: 'white' }} />}
              label={spec}
            />
          ))}
        </FormGroup>

        {/* Display Filter */}
        <Typography sx={{ paddingTop: '20px' }}>Display</Typography>
        <FormGroup>
          {['13-inch', '15.6-inch', '27-inch 4K', '49-inch Curved'].map((spec) => (
            <FormControlLabel
              key={spec}
              control={<Checkbox checked={selectedSpecs.includes(spec)} onChange={handleSpecsChange} value={spec} sx={{ color: 'white' }} />}
              label={spec}
            />
          ))}
        </FormGroup>

        {/* Features Filter */}
        <Typography sx={{ paddingTop: '20px' }}>Features</Typography>
        <FormGroup>
          {['108MP Camera', 'Mechanical', 'Wireless', 'Noise Cancelling', '512GB SSD', '1TB SSD'].map((spec) => (
            <FormControlLabel
              key={spec}
              control={<Checkbox checked={selectedSpecs.includes(spec)} onChange={handleSpecsChange} value={spec} sx={{ color: 'white' }} />}
              label={spec}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Main Content */}
      <Box sx={{ width: '400px', flexGrow: 1, paddingLeft: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
          Products Page
        </Typography>

        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ width: 265, height: 330, background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), linear-gradient(180deg, #E70002 0%, #000 50.07%, #FCD201 100%)', boxShadow: '0px 4px 4px 0px #000',  display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                  sx={{ objectFit: 'contain ', color: 'white', paddingTop: '5px' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" color='white' sx={{ fontSize: '1rem' }}>{product.title}</Typography>
                  <Typography sx={{ fontSize: '0.80rem', color: 'gray' }}>{product.description}</Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                  <Typography sx={{ fontWeight: 'bold' }}>{`€${product.price}`}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Product;
