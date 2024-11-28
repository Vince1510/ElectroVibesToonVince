import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Admin() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [games, setGames] = useState([]);
  const [keyboards, setKeyboards] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [monitors, setMonitors] = useState([]);
  const [mice, setMice] = useState([]);
  const [phones, setPhones] = useState([]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        switch (selectedTab) {
          case 0:
            const gamesResponse = await axios.get(
              "http://localhost:4000/api/games/"
            );
            setGames(gamesResponse.data);
            break;
          case 1:
            const keyboardsResponse = await axios.get(
              "http://localhost:4000/api/keyboards/"
            );
            setKeyboards(keyboardsResponse.data);
            break;
          case 2:
            const laptopsResponse = await axios.get(
              "http://localhost:4000/api/laptops/"
            );
            setLaptops(laptopsResponse.data);
            break;
          case 3:
            const monitorsResponse = await axios.get(
              "http://localhost:4000/api/monitors/"
            );
            setMonitors(monitorsResponse.data);
            break;
          case 4:
            const miceResponse = await axios.get(
              "http://localhost:4000/api/mice/"
            );
            setMice(miceResponse.data);
            break;
          case 5:
            const phonesResponse = await axios.get(
              "http://localhost:4000/api/phones/"
            );
            setPhones(phonesResponse.data);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(`Error fetching data for tab ${selectedTab}:`, error);
      }
    };

    fetchData();
  }, [selectedTab]);

  const renderTable = (data, columns) => (
    <Table sx={{ mt: 2 }}>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column} sx={{ color: "white" }}>
              {column}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
            {columns.map((column) => (
              <TableCell key={column} sx={{ color: "white" }}>
                {item[column.toLowerCase()] || item._id}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#121212",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="admin page tabs"
        centered
        textColor="inherit"
        TabIndicatorProps={{
          style: { backgroundColor: "white" },
        }}
      >
        <Tab label="Games" sx={{ color: "white" }} />
        <Tab label="Keyboard" sx={{ color: "white" }} />
        <Tab label="Laptop" sx={{ color: "white" }} />
        <Tab label="Monitor" sx={{ color: "white" }} />
        <Tab label="Mouse" sx={{ color: "white" }} />
        <Tab label="Phone" sx={{ color: "white" }} />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <Typography variant="h6">Manage Games</Typography>
        {games.length > 0 ? (
          renderTable(games, ["_id", "Name", "Genre", "Price"])
        ) : (
          <Typography>No games available or loading...</Typography>
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Typography variant="h6">Manage Keyboards</Typography>
        {keyboards.length > 0 ? (
          renderTable(keyboards, ["_id", "Name", "Brand", "Price"])
        ) : (
          <Typography>No keyboards available or loading...</Typography>
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <Typography variant="h6">Manage Laptops</Typography>
        {laptops.length > 0 ? (
          renderTable(laptops, ["_id", "Name", "Brand", "Price"])
        ) : (
          <Typography>No laptops available or loading...</Typography>
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
        <Typography variant="h6">Manage Monitors</Typography>
        {monitors.length > 0 ? (
          renderTable(monitors, ["_id", "Name", "Brand", "Price"])
        ) : (
          <Typography>No monitors available or loading...</Typography>
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={4}>
        <Typography variant="h6">Manage Mice</Typography>
        {mice.length > 0 ? (
          renderTable(mice, ["_id", "Name", "Brand", "Price"])
        ) : (
          <Typography>No mice available or loading...</Typography>
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={5}>
        <Typography variant="h6">Manage Phones</Typography>
        {phones.length > 0 ? (
          renderTable(phones, ["_id", "Name", "Brand", "Price"])
        ) : (
          <Typography>No phones available or loading...</Typography>
        )}
      </TabPanel>
    </Box>
  );
}

export default Admin;
