import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: 'white' }} /> {/* Change icon color to white */}
          </InputAdornment>
        ),
        style: { color: 'white' }, // Set text color to white
      }}
      sx={{
        marginLeft: 2,
        width: '300px', // Adjust width as needed
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white', // Set border color to white
          },
          '&:hover fieldset': {
            borderColor: 'white', // Keep border white on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white', // Keep border white when focused
          },
        },
      }}
    />
  );
};

export default SearchBar;
