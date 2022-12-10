import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavTabs({ currentPage, handlePageChange }) {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => handlePageChange("Home")}>Home</Nav.Link>
              <NavDropdown onClick={() => handlePageChange("Gallery")} title="Gallery" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Scenic</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Place</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Human</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Oil Painting</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5">Water Colors</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.6">Sketch</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link onClick={() => handlePageChange("Sell")}>Sell</Nav.Link>
              <Nav.Link onClick={() => handlePageChange("Login")}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Brand onClick={() => handlePageChange("Home")}>Artaholic logo</Navbar.Brand>
        </Container>
      </Navbar>
    );
}

export default NavTabs;