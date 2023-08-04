import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from "react";
// import logo from "..assets/img/logo.svg";

export const NavBar = () => {
    const {activeLink, setActiveLink} = useState('home');
    const {scrolled, setScrolled} = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    // const onUpdateActiveLink = (value) => {
    //     setActiveLink{value};
    // }

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled": ""}>
      <Container>
        <Navbar.Brand href="#home">
            {/* <img src={logo} alt="Logo" /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle> 
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#journals" className={activeLink === 'journals' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('journals')}>My Journals</Nav.Link>
            <Nav.Link href="#trends" className={activeLink === 'trends' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('trends')}>My Trends</Nav.Link>   */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}