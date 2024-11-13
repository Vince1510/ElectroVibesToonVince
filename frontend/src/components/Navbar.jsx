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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import logo from "/public/assets/images/ElectroVibe.png";
import responsiveLogo from "/public/assets/images/EV.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
        <ListItem button component={Link} to="./" sx={{ color: "white" }}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="./Product" sx={{ color: "white" }}>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="./Deals" sx={{ color: "white" }}>
          <ListItemText primary="Deals" />
        </ListItem>
        <ListItem button component={Link} to="./Compare" sx={{ color: "white" }}>
          <ListItemText primary="Compare" />
        </ListItem>
        <ListItem button component={Link} to="./About" sx={{ color: "white" }}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="./Admin" sx={{ color: "white" }}>
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
                  sx={{ color: "inherit", marginLeft: 1 }}
                />
              </Box>
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "10px",
                padding: "2px 8px",
                width: "90%",
              }}
            >
              <SearchIcon />
              <InputBase
                placeholder="Search..."
                sx={{ color: "inherit", marginLeft: 1, width: "100%" }}
              />
            </Box>
          </Box>
        )}
      </AppBar>

      {/* Drawer for Mobile View */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better performance on mobile
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;
