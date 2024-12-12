import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin/Admin";
import BreadCrumb from "./components/BreadCrumbs";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Checkout from "./pages/Checkout"
import DetailPage from "./Pages/DetailPage";
import Deals from './Pages/deals'
import Compare from "./Pages/Compare";


function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <BreadCrumb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/detail/:category/:productId" element={<DetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
