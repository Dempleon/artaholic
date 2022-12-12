import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import AuthService from "../../utils/auth";
import Logo from "../assets/images/artaholic-r-2.png";
import CartIcon from "../assets/images/cart-icon.png";
import './NavTabs.css';



function NavTabs({ currentPage, handlePageChange }) {
  return (
    <div>
    <Navbar bg="white" expand="lg" className="navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <NavDropdown
              onClick={() => handlePageChange("Gallery")}
              title="Gallery"
              id="basic-nav-dropdown"
            > */}
              <NavDropdown title="Gallery" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Scenic</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Place</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Human</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Oil Painting
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">
                Water Colors
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6">Sketch</NavDropdown.Item>
            </NavDropdown>
            {AuthService.checkToken() && (
              <Nav.Link href="/sell">Sell</Nav.Link>
            )}
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/cart">
              <img src={CartIcon} alt="cart-icon" width="20px" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="logo-image">
        <Navbar.Brand href="/">
          <img src={Logo} className="art-logo" alt="logo" />
        </Navbar.Brand>
        </div>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavTabs;
