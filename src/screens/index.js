import React from "react";
import Map from "../components/Map/Map";
import SelectDistrict from "../components/SelectDistrict/SelectDistrict";
import Header from "../components/Header/Header";
import { useState } from "react";

const Home = () => {
  const [district, setDistrict] = useState("1");

  return (
    <div className="container">
      <Header />
      <Map district={district} />
      <br />
      <SelectDistrict district={district} setDistrict={setDistrict} />
    </div>
  );
};

export default Home;
