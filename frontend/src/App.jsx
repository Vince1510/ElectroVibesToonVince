import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin/Admin";
import BreadCrumb from "./components/BreadCrumbs";
import SearchBar from "./components/SearchBar";

// Import from the category pages
import Product from './pages/Product'
import DetailPage from "./Pages/DetailPage"; // Import the DetailPage

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <BreadCrumb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<Product />} /> 

          {/* Dynamic Product Pages */}
          <Route path="/:category/:productId" element={<DetailPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
