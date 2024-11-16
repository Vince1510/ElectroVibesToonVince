import React, { useState } from "react";
import { Paper, Typography, Divider, List, ListItem, ListItemText, Button, Box } from "@mui/material";

const PhoneDetails = ({ product }) => {
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
        Phone-specific details
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Operating System" secondary={product.operatingSystem || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Screen Size" secondary={product.screenSize || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Screen Resolution" secondary={product.screenResolution || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Screen Technology" secondary={product.screenTechnology || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Refresh Rate" secondary={product.refreshRate || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Processor" secondary={product.processor || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ram" secondary={product.ram || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Storage" secondary={product.storage || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Expandable Storage" secondary={product.expandableStorage || "N/A"} />
        </ListItem>
        {showAllDetails && (
          <>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Camera
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Rear Camera" secondary={product.rearCamera || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Front Camera" secondary={product.frontCamera || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Camera Features" secondary={product.cameraFeatures?.join(", ") || "N/A"} />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Battery
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Battery Capacity" secondary={product.batteryCapacity || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Charging Speed" secondary={product.chargingSpeed || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Wireless Charging" secondary={product.wirelessCharging || "N/A"} />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Connectivity
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="SIM Type" secondary={product.simType || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Network" secondary={product.network || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Connectivity Features" secondary={product.connectivityFeatures?.join(", ") || "N/A"} />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Additional features
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Waterproof" secondary={product.waterproof || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Fingerprint Sensor" secondary={product.fingerprintSensor || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Face Recognition" secondary={product.faceRecognition || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Color Options" secondary={product.colorOptions?.join(", ") || "N/A"} />
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

export default PhoneDetails;