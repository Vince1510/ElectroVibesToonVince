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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import logo from "/assets/images/ElectroVibe.png";
import responsiveLogo from "/assets/images/EV.png";
import SearchBar from "./SearchBar"; // Import SearchBar component

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleSearch = (event) => {
    event.preventDefault();

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

    if (recognizedBrands.includes(searchQuery.trim())) {
      navigate(`/Product?brand=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    } else {
      setShowNotification(true);
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
      onClick={() => setMobileOpen(false)}
    >
      <List>
        <ListItem component={Link} to="./" sx={{ color: "white" }}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="./Product" sx={{ color: "white" }}>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem component={Link} to="./Deals" sx={{ color: "white" }}>
          <ListItemText primary="Deals" />
        </ListItem>
        <ListItem component={Link} to="./Compare" sx={{ color: "white" }}>
          <ListItemText primary="Compare" />
        </ListItem>
        <ListItem component={Link} to="./About" sx={{ color: "white" }}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem component={Link} to="./Admin" sx={{ color: "white" }}>
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
            <SearchBar />
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
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>

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
