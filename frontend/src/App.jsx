import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography, Box } from '@mui/material';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Login/Login';
import Admin from './Pages/Admin/Admin';
import BreadCrumb from './components/BreadCrumbs/BreadCrumbs';
import SearchBar from './components/SearchBar/SearchBar'; // Import the SearchBar

// Import from the category pages
import Games from './Pages/Category/Games/Games';
import Keyboard from './Pages/Category/Keyboard/Keyboard';
import Laptop from './Pages/Category/Laptop/Laptop';
import Monitor from './Pages/Category/Monitor/Monitor';
import Mouse from './Pages/Category/Mouse/Mouse';
import SmartPhone from './Pages/Category/SmartPhone/SmartPhone';

// Importing icons
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MonitorIcon from '@mui/icons-material/Monitor';
import MouseIcon from '@mui/icons-material/Mouse';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Home = () => {
    return (
      <div>
        <Typography variant="h3" gutterBottom>Welcome to Our Tech Store!</Typography>
        <Typography variant="body1">
          Explore a variety of tech products, including laptops, smartphones, keyboards, and more.
          Navigate through the categories using the navigation bar above to discover more about each product.
        </Typography>
        <Button color="inherit" component={Link} to="/games" startIcon={<VideogameAssetIcon />}>
          Games
        </Button>
        <Button color="inherit" component={Link} to="/keyboard" startIcon={<KeyboardIcon />}>
          Keyboard
        </Button>
        <Button color="inherit" component={Link} to="/laptop" startIcon={<LaptopMacIcon />}>
          Laptop
        </Button>
        <Button color="inherit" component={Link} to="/monitor" startIcon={<MonitorIcon />}>
          Monitor
        </Button>
        <Button color="inherit" component={Link} to="/mouse" startIcon={<MouseIcon />}>
          Mouse
        </Button>
        <Button color="inherit" component={Link} to="/smartphone" startIcon={<PhoneIphoneIcon />}>
          SmartPhone
        </Button>
      </div>
    );
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search Bar */}
          <SearchBar /> 

          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>

          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <BreadCrumb /> {/* Use the new BreadCrumb component here */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/games" element={<Games />} /> {/* Direct route for Games */}
          <Route path="/keyboard" element={<Keyboard />} />
          <Route path="/laptop" element={<Laptop />} />
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/mouse" element={<Mouse />} />
          <Route path="/smartphone" element={<SmartPhone />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
