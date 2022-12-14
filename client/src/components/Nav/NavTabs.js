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
        element: ".home-link",
        intro: "Welcome to Artaholic! On this website, read all about us on the '<b>Home</b>' page",
        position: "right"
      },
      {
        element: ".gallery-link",
        intro: "Click on '<b>Gallery</b>' to view all of the lovely art pieces that we have for sale",
      },
      {
        element: ".sell-link",
        intro: "To sell your own art, click on '<b>Sell</b>' to access the '<b>Add new item</b>' form",
      },
      {
        element: ".cart-link",
        intro: "To view your cart and/or checkout with your purchases, click on the <b>cart icon</b>",
      },
      {
        element: ".logout-link",
        intro: 'If you are done visiting us, feel free to <b>logout</b>',
      },
      {
        element: ".home-link", 
        intro: '<iframe src="https://giphy.com/embed/1qhzTMk8mQzY0Bg7wg"</iframe>',
        title: "Congrats! You are done! Now go explore the site!"
      }
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
              <Nav.Link className="home-link" href="/">Home</Nav.Link>
              {/* <NavDropdown
              onClick={() => handlePageChange("Gallery")}
              title="Gallery"
              id="basic-nav-dropdown"
               > */}
              {/* <div className="gallery-link"><GalleryCategory inNavbar={true}/></div> */}
              <Nav.Link className="gallery-link" href="/arts">Gallery</Nav.Link>
              {AuthService.checkToken() && (
                <Nav.Link className="sell-link" href="/sell">Sell</Nav.Link>
              )}
              {!AuthService.checkToken() && <Nav.Link href="/login">Login</Nav.Link>
              }
              {AuthService.checkToken() && (
                <Nav.Link className="logout-link" href="/" onClick={() => AuthService.logout()}>Logout</Nav.Link>
              )}
              {AuthService.checkToken() && <Nav.Link className="cart-link" href="/cart">
                <img src={CartIcon} alt="cart-icon" width="20px" />
              </Nav.Link>}
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
