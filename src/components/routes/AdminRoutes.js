import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { NavBarAdmin } from "../../shared/components/NavBarAdmin";
import { ProductFormEdit } from "../product/components/ProductFormEdit";
import { Product } from "../product/Product";

export const AdminRoutes = () => {
  return (
    <>
      <NavBarAdmin />
      <Container style={{ marginTop: "20px" }} className="mt5">
        <Routes>
          <Route path="products" element={<Product />} />
          <Route path="update-product/:key" element={<ProductFormEdit />} />
        </Routes>
      </Container>
    </>
  );
};
