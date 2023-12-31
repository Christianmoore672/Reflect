import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { logout } from '../Managers/UserProfileManger';

export default function MyNavbar ({isLoggedIn, setIsLoggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

    return (
      <div>
        <Navbar className="navBar" light expand="md">
          <NavbarBrand tag={RRNavLink} to="/">REFLECT</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              { /* When isLoggedIn === true, we will render the Home link */ }
              {isLoggedIn &&
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
              }
            </Nav>
            <Nav navbar>
              {isLoggedIn &&
                <>
                  <NavItem>
                    <a aria-current="page" className="nav-link"
                      style={{ cursor: "pointer" }} onClick={() => {
                        logout()
                        setIsLoggedIn(false)
                      }}>Logout</a>
                  </NavItem>
                </>
              }
              {!isLoggedIn &&
                <>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                  </NavItem>
                </>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }