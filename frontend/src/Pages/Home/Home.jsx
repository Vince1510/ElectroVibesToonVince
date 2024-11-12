import React from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import CardSlider from "./CardSlider";

import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import MonitorIcon from "@mui/icons-material/Monitor";
import MouseIcon from "@mui/icons-material/Mouse";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

const Home = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        <Button
          color="inherit"
          component={Link}
          to="/product?category=Games"
          startIcon={<VideogameAssetIcon sx={{ color: "white" }} />}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white",
          }}
        >
          Games
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/product?category=Keyboards"
          startIcon={<KeyboardIcon sx={{ color: "white" }} />}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white",
          }}
        >
          Keyboard
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/product?category=Laptop"
          startIcon={<LaptopMacIcon sx={{ color: "white" }} />}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white",
          }}
        >
          Laptop
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/product?category=Monitor"
          startIcon={<MonitorIcon sx={{ color: "white" }} />}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white",
          }}
        >
          Monitor
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/product?category=Mouse"
          startIcon={<MouseIcon sx={{ color: "white" }} />}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white",
          }}
        >
          Mouse
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/product?category=Smartphones"
          startIcon={<PhoneIphoneIcon sx={{ color: "white" }} />}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white",
          }}
        >
          SmartPhone
        </Button>
      </Box>

      {/* Card Slider */}
      <CardSlider />
    </Box>
  );
};

export default Home;
