import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import AuthService from "../../utils/auth";
import Logo from "../assets/images/artaholic-r-2.png";
import CartIcon from "../assets/images/cart-icon.png";
import "./NavTabs.css";
import GalleryCategory from "../GalleryCategory/GalleryCategory";
import "intro.js/introjs.css";
import { Steps } from "intro.js-react";

function NavTabs({ currentPage, handlePageChange }) {
  const tutorial_enabled = localStorage.getItem("tutorial_enabled");

  const [state, setState] = useState({
    stepsEnabled: !!AuthService.checkToken(),
    initialStep: 0,
    steps: [
      {
        element: ".selector1",
        intro: "test 1",
        position: "right",
        tooltipClass: "myTooltipClass",
        highlightClass: "myHighlightClass",
      },
      {
        element: ".selector2",
        intro: "test 2",
      },
      {
        element: ".selector3",
        intro: "test 3",
      },
    ],
  });

  const onExit = () => {
    setState(() => ({ stepsEnabled: false }));
    localStorage.setItem("tutorial_enabled", false);
  };

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
              <GalleryCategory inNavbar={true}/>
              {AuthService.checkToken() && (
                <Nav.Link href="/sell">Sell</Nav.Link>
              )}
              {!AuthService.checkToken() && <Nav.Link href="/login">Login</Nav.Link>
              }
              {AuthService.checkToken() && (
                <Nav.Link href="/" onClick={() => AuthService.logout()}>Logout</Nav.Link>
              )}
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
      {state.stepsEnabled && !tutorial_enabled && (
        <Steps
          enabled={state.stepsEnabled}
          steps={state.steps}
          initialStep={state.initialStep}
          onExit={onExit}
        />
      )}
    </div>
  );
}

export default NavTabs;
