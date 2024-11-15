import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import logo from "/assets/images/ElectroVibe.png";
import responsiveLogo from "/assets/images/EV.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    // List of recognized brands
    const recognizedBrands = [
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

    // Check if the search query matches any recognized brand
    if (recognizedBrands.includes(searchQuery.trim())) {
      navigate(`/Product?brand=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    } else {
      setShowNotification(true); // Show notification for "not found"
    }
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#111111",
        height: "100%",
        color: "white",
      }}
      onClick={handleDrawerToggle}
    >
      <List>
        <ListItem component={Link} to="./" sx={{ color: "white" }} button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="./Product" sx={{ color: "white" }} button>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem component={Link} to="./Deals" sx={{ color: "white" }} button>
          <ListItemText primary="Deals" />
        </ListItem>
        <ListItem component={Link} to="./Compare" sx={{ color: "white" }} button>
          <ListItemText primary="Compare" />
        </ListItem>
        <ListItem component={Link} to="./About" sx={{ color: "white" }} button>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem component={Link} to="./Admin" sx={{ color: "white" }} button>
          <ListItemText primary="Admin" />
        </ListItem>
      </List>
    </Box>
  );
  

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo and Hamburger Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: isTabletOrMobile ? "block" : "none" }}
            >
              <MenuIcon />
            </IconButton>
            <Button
              color="inherit"
              component={Link}
              to="./"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                component="img"
                src={isTabletOrMobile ? responsiveLogo : logo}
                alt="ElectroVibe"
                sx={{ height: 40, marginRight: 2 }}
              />
            </Button>
            {!isTabletOrMobile && (
              <Box sx={{ display: "flex" }}>
                <Button color="inherit" component={Link} to="/Product">
                  Products
                </Button>
                <Button color="inherit" component={Link} to="/Deals">
                  Deals
                </Button>
                <Button color="inherit" component={Link} to="/Compare">
                  Compare
                </Button>
                <Button color="inherit" component={Link} to="/About">
                  About
                </Button>
                <Button color="inherit" component={Link} to="/Admin">
                  Admin
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Search Bar */}
            {!isTabletOrMobile && (
              <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    padding: "2px 8px",
                    marginRight: 2,
                  }}
                >
                  <SearchIcon />
                  <InputBase
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ color: "inherit", marginLeft: 1 }}
                  />
                </Box>
              </form>
            )}

            {/* Login Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                marginRight: 1,
              }}
              component={Link}
              to="/Login"
            >
              Login
            </Button>

            {/* Shopping Cart Icon */}
            <IconButton
              color="inherit"
              component={Link}
              to="/Cart"
              sx={{ borderRadius: "10px" }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {isTabletOrMobile && (
          <Box
            sx={{
              backgroundColor: "#111111",
              padding: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <form onSubmit={handleSearch} style={{ width: "90%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "10px",
                  padding: "2px 8px",
                }}
              >
                <SearchIcon />
                <InputBase
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ color: "inherit", marginLeft: 1, width: "100%" }}
                />
              </Box>
            </form>
          </Box>
        )}
      </AppBar>

      {/* Drawer for Mobile View */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Brand not found!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Navbar;