import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const school = new URL("../images/school.png", import.meta.url);
const NavigationBar = () => {
  return (
    <>
      <Navbar expand="lg" className="navbar-custom sticky-top nav-back">
        <Container>
          <Navbar.Brand href="#home">
            <img src={school} alt="school" className="school-logo"></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navLink">
              <LinkContainer to="/">
                <Nav.Link>HOME</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/facilities">
                <Nav.Link>FACILITIES</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/activities">
              <Nav.Link >ACTIVITIES</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/careers'>
              <Nav.Link>CAREERS</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
              <Nav.Link href="#link">CONTACT</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/about'>
              <Nav.Link>ABOUT DIS</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/academics'>
              <Nav.Link>ACADEMICS</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/admission'>
              <Nav.Link>ADMISSION</Nav.Link>
              </LinkContainer>               
{/*               
              <Nav.Link href="#link">GALLERY</Nav.Link>
              <Nav.Link href="#link">FAQS</Nav.Link>  */}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="nav3"></div>
    </>
  );
};

export default NavigationBar;
