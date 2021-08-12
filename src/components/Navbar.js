import React from "react";
// bootstrap import
import {
  Navbar as BSNavbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import ConnectMetamask from "./ConnectMetamask/ConnectMetamask";

export default function Navbar(props) {
  return (
    <BSNavbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <BSNavbar.Brand>NFT-Market</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BSNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/nft-market" className="nav-link">
                NFT Market
              </Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <Link to="/my-token" className="nav-link">
                My Token
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/query" className="nav-link">
                Query
              </Link>
            </Nav.Item>
            <Nav.Item>
              <ConnectMetamask connectToMetamask={props.connectToMetamask} />
            </Nav.Item>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
