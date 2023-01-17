import { Nav, NavLink, NavMenu } from "./NavbarElements";
import { Routes, Route } from "react-router-dom";

import Home from "../../screens";
import LegalNotice from "../../screens/legalNotice";
import WeatherData from "../../screens/weatherData";

import React from "react";
import Logo from "../../images/logo.png";

// Navbar

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          {/* Das Logo führt zur Startseite */}
          <NavLink to="/">
            <img src={Logo} width="80" alt="Logo"></img>
          </NavLink>
          {/* "/" ist die Startseite */}
          <NavLink to="/" activeStyle>
            Map
          </NavLink>
          {/* "/weatherData" sind die Wetterdaten */}
          <NavLink to="/weatherData" activeStyle>
            Wetterdaten
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
        {/* "/weatherData" -> Wetterdaten */}
        <Route path="/weatherData" element={<WeatherData />} />
        {/* "/legalNotice" -> Impressum */}
        <Route path="/legalNotice" element={<LegalNotice />} />
      </Routes>
    </>
  );
};

export default Navbar;
