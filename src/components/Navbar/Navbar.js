import { Nav, NavLink, NavMenu } from "./NavbarElements";
import { Routes, Route } from "react-router-dom";
import Home from "../../screens";
import Imprint from "../../screens/imprint";
import React from "react";

export default class Navbar extends React.Component {
  render() {
    return (
      <>
        <Nav>
          <NavMenu>
            <NavLink to="/" activeStyle>
              Map
            </NavLink>
            <NavLink to="/imprint" activeStyle>
              Impressum
            </NavLink>
          </NavMenu>
        </Nav>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/imprint" element={<Imprint />} />
        </Routes>
      </>
    );
  }
}
