import React, { useState } from "react";
import { Paper, Typography, Divider, List, ListItem, ListItemText, Button, Box } from "@mui/material";

const MonitorDetails = ({ product }) => {
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
        Monitor-specific details
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Resolution" secondary={product.resolution || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Size" secondary={product.size || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Refresh Rate" secondary={product.refreshRate || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Panel Type" secondary={product.panelType || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Aspect Ratio" secondary={product.aspectRatio || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Brightness" secondary={product.brightness || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Contrast Ratio" secondary={product.contrastRatio || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Curved" secondary={product.curved ? "Yes" : "No"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Response Time" secondary={product.responseTime || "N/A"} />
        </ListItem>
        {showAllDetails && (
          <>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Advanced Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Color Gamut" secondary={product.colorGamut || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="HDR Support" secondary={product.hdrSupport ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="HDR Standard" secondary={product.hdrStandard || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Viewing Angle" secondary={product.viewingAngle || "N/A"} />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Connectivity
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Connectivity Ports" secondary={product.connectivityPorts?.join(", ") || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="USB Ports" secondary={product.usbPorts || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="HDMI Version" secondary={product.hdmiVersion || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="DisplayPort Version" secondary={product.displayPortVersion || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Audio Output" secondary={product.audioOutput ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Built-In Speakers" secondary={product.builtInSpeakers ? "Yes" : "No"} />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Additional Features
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Height Adjustable" secondary={product.heightAdjustable ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Swivel" secondary={product.swivel ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tilt" secondary={product.tilt ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Pivot" secondary={product.pivot ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="VESA Mount" secondary={product.vesaMount || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Blue Light Filter" secondary={product.blueLightFilter ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Flicker-Free" secondary={product.flickerFree ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Energy Rating" secondary={product.energyRating || "N/A"} />
              </ListItem>
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

export default MonitorDetails;