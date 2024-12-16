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
  Snackbar,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "/assets/images/ElectroVibe.png";
import responsiveLogo from "/assets/images/EV.png";
import SearchBar from "./SearchBar";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
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
        {[
          { label: "Home", path: "./" },
          { label: "Products", path: "./Product" },
          { label: "Deals", path: "./Deals" },
          { label: "Compare", path: "./Compare" },
          { label: "About", path: "./About" },
          { label: "Admin", path: "./Admin" },
        ].map((item) => (
          <ListItem key={item.label} component={Link} to={item.path} sx={{ color: "white" }}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
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
                sx={{ height: { xs: 40, md: 40 }, marginRight: 2 }}
              />
            </Button>
            <Box sx={{ display: { xs: "none", md: "flex" }, fontSize: { md: "1.3rem" } }}>
              {[
                { label: "Products", path: "/Product" },
                { label: "Deals", path: "/Deals" },
                { label: "Compare", path: "/Compare" },
                { label: "About", path: "/About" },
                { label: "Admin", path: "/Admin" },
              ].map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{ textTransform: "none", fontSize: "1.1rem" }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, marginRight: 2 }}>
              <SearchBar />
            </Box>
            <Button
              variant="outlined"
              sx={{
                border: "1px solid white",
                color: "white",
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

          <Box
            sx={{
              width: { xs: "100%", md: "auto" },
              mt: { xs: 2, md: 0 },
              ml: { md: 2 },
              display: { md: "none" },
            }}
          >
            <SearchBar />
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
