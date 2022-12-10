import React from 'react';
import Nav from 'react-bootstrap/Nav';

function NavTabs({ currentPage, handlePageChange }) {
    return (
        <Nav>
            <Nav.Item>
                <Nav.Link onClick={() => handlePageChange("Home")}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => handlePageChange("Gallery")}>Gallery</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => handlePageChange("Login")}>Login</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default NavTabs;