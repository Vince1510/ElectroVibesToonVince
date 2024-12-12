import React from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import CardSlider from "../components/CardSlider.jsx";
import '../app.css'

import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import MonitorIcon from "@mui/icons-material/Monitor";
import MouseIcon from "@mui/icons-material/Mouse";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

const Home = () => {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        gap={2}
        sx={{
          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {[
          { label: "Games", icon: <VideogameAssetIcon /> },
          { label: "Keyboards", icon: <KeyboardIcon /> },
          { label: "Laptops", icon: <LaptopMacIcon /> },
          { label: "Monitors", icon: <MonitorIcon /> },
          { label: "Mice", icon: <MouseIcon /> },
          { label: "Phones", icon: <PhoneIphoneIcon /> },
        ].map(({ label, icon }) => (
          <Button
            key={label}
            color="inherit"
            component={Link}
            to={`/product?category=${label}`}
            startIcon={React.cloneElement(icon, { sx: { color: "white" } })}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textTransform: "none",
              color: "white",
              minWidth: "100px",
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
      <CardSlider />
    </Box>
  );
};

export default Home;