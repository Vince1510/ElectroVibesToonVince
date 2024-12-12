import React, { useState } from "react";
import { Paper, Typography, Divider, List, ListItem, ListItemText, Button, Box } from "@mui/material";

const GameDetails = ({ product }) => {
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
        Game-specific details
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
          <ListItemText primary="Release Date" secondary={product.releaseDate || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Genre" secondary={product.genre || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Platform" secondary={product.platform?.join(", ") || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Brand" secondary={product.brand || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Age Rating" secondary={product.ageRating || "N/A"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Languages" secondary={product.languages?.join(", ") || "N/A"} />
        </ListItem>
        {showAllDetails && (
          <>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Features
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Multiplayer Support" secondary={product.multiplayerSupport ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Multiplayer Modes" secondary={product.multiplayerModes?.join(", ") || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="DLC Available" secondary={product.dlcAvailable ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Achievements" secondary={product.achievements ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="In-App Purchases" secondary={product.inAppPurchases ? "Yes" : "No"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Special Editions" secondary={product.specialEditions?.join(", ") || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Exclusive Content" secondary={product.exclusiveContent?.join(", ") || "N/A"} />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Technical Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="File Size" secondary={product.fileSize || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="System Requirements (Minimum)" secondary={product.systemRequirements?.minimum || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="System Requirements (Recommended)" secondary={product.systemRequirements?.recommended || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="VR Support" secondary={product.vrSupport ? "Yes" : "No"} />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 3, color: "#bdbdbd" }}>
              Additional Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Publisher" secondary={product.publisher || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Developer" secondary={product.developer || "N/A"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Release Region" secondary={product.releaseRegion?.join(", ") || "N/A"} />
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

export default GameDetails;
