import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { HomeScreen } from "./components/home/HomeScreen";
import { NavBar } from "./shared/components/NavBar";
import { Contact } from "./components/contact/Contact";
import { Product } from "./components/product/Product";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Container style={{ marginTop: "20px" }} className="mt5">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
