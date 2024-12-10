import React, { useState } from "react";
import { Paper, Typography, Divider, List, ListItem, ListItemText, Button, Box } from "@mui/material";

const KeyboardDetails = ({ product }) => {
  const [showAllDetails, setShowAllDetails] = useState(false);

  const toggleDetails = () => {
    setShowAllDetails((prev) => !prev);
  };

  return (
    <Paper sx={{ padding: 3, backgroundColor: "transparent", color: "#ffffff" }}>
      <Typography variant="h5" gutterBottom>
        Product Specs
      </Typography>
      <Divider sx={{ marginBottom: 2, backgroundColor: "#424242" }} />

      <Typography variant="h6" gutterBottom sx={{ color: "#bdbdbd" }}>
        Keyboard-specific details
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Layout" secondary={product.layout || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Connection Type" secondary={product.connectionType || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Switch Type" secondary={product.switchType || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Backlighting" secondary={product.backlighting || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="RGB Lighting" secondary={product.rgbLighting || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Keycap Material" secondary={product.keycapMaterial || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Size" secondary={product.size || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Macro Keys" secondary={product.macroKeys || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Hot Swappable" secondary={product.hotSwappable ? "Yes" : "No"} />
        </ListItem>
        {showAllDetails && (
          <>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Advanced Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Battery Life" secondary={product.batteryLife || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="NumPad" secondary={product.numPad ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Adjustable Feet" secondary={product.adjustableFeet ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Polling Rate" secondary={product.pollingRate || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Onboard Memory" secondary={product.onboardMemory ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Wireless Range" secondary={product.wirelessRange || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Compatibility" secondary={product.compatibility?.join(", ") || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Waterproof" secondary={product.waterproof ? "Yes" : "No"} />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Additional Features
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Weight" secondary={product.weight || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Dimensions" secondary={product.dimensions || "N/A"} />
              </ListItem>
            </List>
          </>
        )}
      </List>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="outlined"
          onClick={toggleDetails}
          sx={{
            color: "#ffffff",
            borderColor: "#ffffff",
            textAlign: "center",
            width: 150,
          }}
        >
          {showAllDetails ? "Show Less" : "Show More"}
        </Button>
      </Box>
    </Paper>
  );
};

export default KeyboardDetails;
