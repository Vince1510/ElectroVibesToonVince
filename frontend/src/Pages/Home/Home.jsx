import React from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import CardSlider from "./CardSlider"; // Import the CardSlider component

// Importing icons
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
          to="/games"
          startIcon={<VideogameAssetIcon sx={{ color: "white" }} />} // Set icon color to white
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white", // Set text color to white
          }}
        >
          Games
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/keyboard"
          startIcon={<KeyboardIcon sx={{ color: "white" }} />} // Set icon color to white
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white", // Set text color to white
          }}
        >
          Keyboard
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/laptop"
          startIcon={<LaptopMacIcon sx={{ color: "white" }} />} // Set icon color to white
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white", // Set text color to white
          }}
        >
          Laptop
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/monitor"
          startIcon={<MonitorIcon sx={{ color: "white" }} />} // Set icon color to white
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white", // Set text color to white
          }}
        >
          Monitor
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/mouse"
          startIcon={<MouseIcon sx={{ color: "white" }} />} // Set icon color to white
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white", // Set text color to white
          }}
        >
          Mouse
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/smartphone"
          startIcon={<PhoneIphoneIcon sx={{ color: "white" }} />} // Set icon color to white
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "none",
            color: "white", // Set text color to white
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
