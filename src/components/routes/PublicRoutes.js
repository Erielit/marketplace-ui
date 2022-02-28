import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { PublicNavbar } from "../../shared/components/PublicNavbar";
import { Contact } from "../contact/Contact";
import { ProductInfo } from "../home/components/ProductInfo";
import { HomeScreen } from "../home/HomeScreen";

export const PublicRoutes = () => {
  return (
    <>
      <PublicNavbar />
      <Container style={{ marginTop: "20px" }} className="mt5">
        <Routes>
          <Route path="/more-info/:id" element={<ProductInfo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Container>
    </>
  );
};
