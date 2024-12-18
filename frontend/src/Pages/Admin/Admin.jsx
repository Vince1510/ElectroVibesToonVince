import React, { useState } from "react";
import { AppBar, Tabs, Tab, Box, Typography } from "@mui/material";
import GamesPanel from "./GamesPanel";
import KeyboardsPanel from "./KeyboardsPanel";
import LaptopsPanel from "./LaptopsPanel";
import MonitorsPanel from "./MonitorsPanel";
import MicePanel from "./MicePanel";
import PhonesPanel from "./PhonesPanel";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="admin panel tabs"
          textColor="inherit"
          TabIndicatorProps={{
            sx: {
              backgroundImage:
                "linear-gradient(180deg, #E70002 0%, #FCD201 100%)",
              height: "2px",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              color: "inherit",
            },
          }}
        >
          <Tab label="Games" />
          <Tab label="Keyboards" />
          <Tab label="Laptops" />
          <Tab label="Monitors" />
          <Tab label="Mice" />
          <Tab label="Phones" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0}>
        <GamesPanel />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <KeyboardsPanel />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <LaptopsPanel />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <MonitorsPanel />
      </TabPanel>
      <TabPanel value={activeTab} index={4}>
        <MicePanel />
      </TabPanel>
      <TabPanel value={activeTab} index={5}>
        <PhonesPanel />
      </TabPanel>
    </div>
  );
};

export default Admin;
