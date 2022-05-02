import React from "react";
import Map from "../components/Map/Map";
import SelectDistrict from "../components/SelectDistrict/SelectDistrict";
import Header from "../components/Header/Header";
import TemperatureData from "../components/TemperatureData/TemperatureData";
import { useState } from "react";

const Home = () => {
  const [district, setDistrict] = useState("5");

  return (
    <div className="container">
      <Header />
      <div className="customContainer">
        {district && <Map district={district} />}
        <div className="container">
          {district && (
            <SelectDistrict district={district} setDistrict={setDistrict} />
          )}
          {district && <TemperatureData district={district} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
