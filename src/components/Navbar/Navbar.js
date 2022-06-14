import { Nav, NavLink, NavMenu } from "./NavbarElements";
import { Routes, Route } from "react-router-dom";
import Home from "../../screens";
import LegalNotice from "../../screens/LegalNotice";
import React from "react";

// Navbar

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          {/* "/" ist die Startseite */}
          <NavLink to="/" activeStyle>
            Map
          </NavLink>
          {/* "/legalNotice" ist das Impressum */}
          <NavLink to="/legalNotice" activeStyle>
            Impressum
          </NavLink>
        </NavMenu>
      </Nav>
      {/* Routing*/}
      <Routes>
        {/* "/" -> Startseite */}
        <Route path="/" exact element={<Home />} />
        {/* "/legalNotice" -> Impressum */}
        <Route path="/legalNotice" element={<LegalNotice />} />
      </Routes>
    </>
  );
};

export default Navbar;
