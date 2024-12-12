import React, { useState } from "react";
import { Paper, Typography, Divider, List, ListItem, ListItemText, Button, Box } from "@mui/material";

const LaptopDetails = ({ product }) => {
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
        Laptop-specific details
      </Typography>
            <List
              sx={{
                "& .MuiListItemText-root": {
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 0,
                  paddingBottom: 0,
                  margin: 0,
                },
                "& .MuiListItem-root:nth-of-type(odd)": {
                  backgroundColor: "#2d2d2d",
                },
                "& .MuiListItem-root:nth-of-type(even)": {
                  backgroundColor: "transparent",
                },
              }}
            >
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
              Graphics and Display
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Graphics card" secondary={product.gpu || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Refresh Rate" secondary={product.refreshRate || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Touch Screen" secondary={product.touchScreen || "N/A"} />
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
                <ListItemText primary="Battery Life" secondary={product.batteryLife || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Charging Speed" secondary={product.chargingSpeed || "N/A"} />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Connectivity
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Connectivity Ports" secondary={product.connectivityPorts || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Wifi Support" secondary={product.wifiSupport || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Bluetooth Version" secondary={product.bluetoothVersion || "N/A"} />
              </ListItem>
            </List>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Additional features
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Weight" secondary={product.weight || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Dimensions" secondary={product.Dimensions || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Color Options" secondary={product.colorOptions || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Fingerprint Sensor" secondary={product.fingerprintSensor || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Webcam" secondary={product.webcam || "N/A"} />
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

export default LaptopDetails;
