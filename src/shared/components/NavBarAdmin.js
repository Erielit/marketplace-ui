import React, { useContext } from "react";
import img from "../../assets/img/marketplace.png";
import { Button, Image, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { AuthContext } from "../../components/auth/authContext";

export const NavBarAdmin = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth", {
      replace: true,
    });
  };
  return (
    <Navbar
      variant="dark"
      style={{ padding: "10px", backgroundColor: "#232F3E" }}
    >
      <Navbar.Brand>
        <Image
          className="ms-2"
          src={img}
          style={{ height: "auto", width: "40px" }}
        />
      </Navbar.Brand>
      <Nav className="me-auto">
        <Link to={"/category"} className="nav-link">
          Categorías
        </Link>
        <Link to={"/subcategory"} className="nav-link">
          Subcategorías
        </Link>
        <Link to={"/products"} className="nav-link">
          Productos
        </Link>
      </Nav>
      <Button variant="outline-light" onClick={handleLogout}>
        <FeatherIcon icon={"log-out"} />
        &nbsp; Cerrar sesión
      </Button>
    </Navbar>
  );
};
