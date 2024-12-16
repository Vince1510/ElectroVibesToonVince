import React, { useState } from "react";
import { Paper, Typography, Divider, List, ListItem, ListItemText, Button, Box } from "@mui/material";

const MouseDetails = ({ product }) => {
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
        Mouse-specific details
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
          <ListItemText primary="DPI" secondary={product.dpi || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Wireless" secondary={product.wireless ? "Yes" : "No"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="RGB Lighting" secondary={product.rgb ? "Yes" : "No"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ergonomic Design" secondary={product.ergonomicDesign || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Programmable Buttons" secondary={product.programmableButtons || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Sensor Type" secondary={product.sensorType || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Polling Rate" secondary={product.pollingRate || "N/A"} />
        </ListItem>
        {showAllDetails && (
          <>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Advanced Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Weight Adjustment" secondary={product.weightAdjustment ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Battery Life" secondary={product.batteryLife || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Wireless Range" secondary={product.wirelessRange || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Drag Coefficient" secondary={product.dragCoefficient || "N/A"} />
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
              <ListItem>
                <ListItemText primary="Compatibility" secondary={product.compatibility?.join(", ") || "N/A"} />
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

export default MouseDetails;
