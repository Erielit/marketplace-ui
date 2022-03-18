import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBarAdmin } from "../../shared/components/NavBarAdmin";
import { PublicNavbar } from "../../shared/components/PublicNavbar";
import { AuthContext } from "../auth/authContext";
import { LoginScreen } from "../auth/LoginScreen";
import { CategoryScreen } from "../category/CategoryScreen";
import { Contact } from "../contact/Contact";
import { ProductInfo } from "../home/components/ProductInfo";
import { HomeScreen } from "../home/HomeScreen";
import { ProductFormEdit } from "../product/components/ProductFormEdit";
import { Product } from "../product/Product";
import { SubcategoryScreen } from "../subcategory/SubcategoryScreen";
import "animate.css";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route
          path="/*"
          element={
            !user.logged ? (
              <>
                <PublicNavbar />
                <Container style={{ marginTop: "20px" }} className="mt5">
                  <Routes>
                    <Route path="more-info/:id" element={<ProductInfo />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="home" element={<HomeScreen />} />
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="*" element={<div>404F</div>} />
                  </Routes>
                </Container>{" "}
              </>
            ) : (
              <>
                <NavBarAdmin />
                <Container style={{ marginTop: "20px" }} className="mt5">
                  <Routes>
                    <Route path="products" element={<Product />} />
                    <Route path="category" element={<CategoryScreen />} />
                    <Route path="subcategory" element={<SubcategoryScreen />} />
                    <Route
                      path="update-product/:key"
                      element={<ProductFormEdit />}
                    />
                    <Route path="/home" element={<Product />} />
                    <Route index element={<Product />} />
                    <Route path="*" element={<div>404F</div>} />
                  </Routes>
                </Container>
              </>
            )
          }
        />
        <Route path="*" element={<div>404F</div>} />
      </Routes>
    </Router>
  );
};
