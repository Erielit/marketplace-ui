import React from "react";
import img from "../../assets/img/marketplace.png";
import { Button, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

export const NavBar = () => {
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
        <Link to={"/"} className="nav-link">
          Inicio
        </Link>
        <Link to={"/products"} className="nav-link">
          Productos
        </Link>
        <Link to={"/contact"} className="nav-link">
          Contacto
        </Link>
      </Nav>
      <Button variant="outline-light"><FeatherIcon icon={"log-in"}/>&nbsp; Iniciar sesión</Button>
    </Navbar>
  );
};
