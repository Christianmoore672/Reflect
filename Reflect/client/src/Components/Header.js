import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { logout } from '../Managers/UserProfileManger';
import Beige  from "../assets/Beige.png"
import { BiLogOut } from 'react-icons/bi'

export default function Header({isLoggedIn, setIsLoggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
          <article >
            
            {isLoggedIn &&
              <>
                <div className="logout_Icon"
                    style={{ cursor: "pointer" }} onClick={() => {
                      logout()
                      setIsLoggedIn(false)
                    }}> <BiLogOut />
                </div>
                
              </>
              //<div className="logout_Icon">  <BiLogOut /> </div>
            }
            {/* {!isLoggedIn &&
              <>
              </>
            } */}
          </article>
     
        
    
      
    </div>
  );
}