import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { logout } from '../Managers/UserProfileManger';
import { BiLogOut } from 'react-icons/bi'


export default function Logout({isLoggedIn, setIsLoggedIn}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
              
              {isLoggedIn &&
                <>
                    <a aria-current="page" className="nav-link"
                      style={{ cursor: "pointer" }} onClick={() => {
                        logout()
                        setIsLoggedIn(false)
                      }}></a>
                
                </>
              } 
        <BiLogOut /> 
      </div>
    );
  }