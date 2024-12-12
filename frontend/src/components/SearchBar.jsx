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
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

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

          // Merge all the results from different APIs and assign a category
          const results = [
            ...miceData.map((item) => ({ ...item, category: "mice" })),
            ...laptopsData.map((item) => ({ ...item, category: "laptops" })),
            ...gamesData.map((item) => ({ ...item, category: "games" })),
            ...keyboardsData.map((item) => ({
              ...item,
              category: "keyboards",
            })),
            ...monitorsData.map((item) => ({ ...item, category: "monitors" })),
            ...phonesData.map((item) => ({ ...item, category: "phones" })),
          ].filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

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

  const handleItemClick = (category, id) => {
    navigate(`/detail/${category}/${id}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        marginRight: 1,
      }}
    >
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

      {filteredResults.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#111111",
            borderRadius: "5px",
            color: "white",
            overflowY: "auto",
            zIndex: 10,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            maxWidth: "400px",
            width: "100%",
            "@media (max-width: 600px)": {
              maxWidth: "100%",
            },
          }}
        >
          <List>
            {filteredResults.map((item) => (
              <ListItem
                key={item._id}
                button
                onClick={() => handleItemClick(item.category, item._id)}
              >
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
