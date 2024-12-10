import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]); // State to store filtered results

  useEffect(() => {
    if (searchQuery.trim()) {
      const fetchData = async () => {
        try {
          // Fetch data from all the APIs simultaneously
          const [
            miceResponse,
            laptopsResponse,
            gamesResponse,
            keyboardsResponse,
            monitorsResponse,
            phonesResponse,
          ] = await Promise.all([
            fetch(
              `http://localhost:4000/api/mice?query=${encodeURIComponent(
                searchQuery
              )}`
            ),
            fetch(
              `http://localhost:4000/api/laptops?query=${encodeURIComponent(
                searchQuery
              )}`
            ),
            fetch(
              `http://localhost:4000/api/games?query=${encodeURIComponent(
                searchQuery
              )}`
            ),
            fetch(
              `http://localhost:4000/api/keyboards?query=${encodeURIComponent(
                searchQuery
              )}`
            ),
            fetch(
              `http://localhost:4000/api/monitors?query=${encodeURIComponent(
                searchQuery
              )}`
            ),
            fetch(
              `http://localhost:4000/api/phones?query=${encodeURIComponent(
                searchQuery
              )}`
            ),
          ]);

          const [
            miceData,
            laptopsData,
            gamesData,
            keyboardsData,
            monitorsData,
            phonesData,
          ] = await Promise.all([
            miceResponse.json(),
            laptopsResponse.json(),
            gamesResponse.json(),
            keyboardsResponse.json(),
            monitorsResponse.json(),
            phonesResponse.json(),
          ]);

          // Merge all the results from different APIs
          const results = [
            ...miceData.filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
            ...laptopsData.filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
            ...gamesData.filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
            ...keyboardsData.filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
            ...monitorsData.filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
            ...phonesData.filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          ];

          setFilteredResults(results); // Update state with filtered results
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      setFilteredResults([]); // Clear results if the search query is empty
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query on change
  };

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: "400px" }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "white" }} />
            </InputAdornment>
          ),
          style: { color: "white" },
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />

      {/* Displaying filtered results as an overlay */}
      {filteredResults.length > 0 && (
        <Box
          sx={{
            position: "absolute", // Position overlay over the input
            top: "100%", // Place the overlay directly below the search bar
            left: 0,
            right: 0,
            backgroundColor: "#111111",
            borderRadius: "5px",
            color: "white",
            overflowY: "auto",
            zIndex: 10, // Ensure it appears above other content
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Add some shadow to make it pop
            maxWidth: "400px",
            width: "100%",
            "@media (max-width: 600px)": {
              maxWidth: "100%", // Ensure the overlay doesn't go beyond the search bar width on smaller screens
            },
          }}
        >
          <List>
            {filteredResults.map((item) => (
              <ListItem key={item._id}>
                {/* Assuming _id is unique */}
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
