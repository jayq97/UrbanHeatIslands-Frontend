import React from "react";
import Map from "../components/Map/Map";
import SelectDistrict from "../components/SelectDistrict/SelectDistrict";
import Header from "../components/Header/Header";
import TemperatureData from "../components/TemperatureData/TemperatureData";
import { useEffect, useState } from "react";

const Home = () => {
  const [district, setDistrict] = useState("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDistrict("all");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="customContainer">
        {district && <Map district={district} />}
        <div className="subContainer">
          {district !== "loading" ? (
            <>
              <SelectDistrict district={district} setDistrict={setDistrict} />
              <TemperatureData district={district} />
            </>
          ) : (
            <h1>Wird geladen...</h1>
          )}
          <br />

          <h2>Legende</h2>
          <p>
            <i style={{ backgroundColor: "#DC4B42" }}>{"⠀⠀"}</i>
            {" >"} 35°C
          </p>
          <p>
            <i style={{ backgroundColor: "#E37947" }}>{"⠀⠀"}</i> 30°C - 35°C
          </p>
          <p>
            <i style={{ backgroundColor: "#EDA84F" }}>{"⠀⠀"}</i> 25°C - 30°C
          </p>
          <p>
            <i style={{ backgroundColor: "#F7D65C" }}>{"⠀⠀"}</i> 20°C - 25°C
          </p>
          <p>
            <i style={{ backgroundColor: "#F5EE61" }}>{"⠀⠀"}</i> 15°C - 20°C
          </p>
          <p>
            <i style={{ backgroundColor: "#C9D968" }}>{"⠀⠀"}</i> 10°C - 15°C
          </p>
          <p>
            <i style={{ backgroundColor: "#75B360" }}>{"⠀⠀"}</i> 5°C - 10°C
          </p>
          <p>
            <i style={{ backgroundColor: "#83C18C" }}>{"⠀⠀"}</i> 0°C - 5°C
          </p>
          <p>
            <i style={{ backgroundColor: "#8DD0F3" }}>{"⠀⠀"}</i> {" <"} 0°C
          </p>
          <br />

          <h2>GeoJSON-Quellen</h2>
          <p>(1) Gewässerkarte</p>
          <a href="https://www.data.gv.at/katalog/dataset/ac4c2ac5-6be4-4471-bbf4-f09228f5db04">
            Gewässernetz Wien
          </a>
          <br />
          <a href="https://www.data.gv.at/katalog/dataset/ac478f32-3e3b-4c04-bc7d-aa75069b6367">
            Stehende Gewässer Wien
          </a>
          <br />
          <br />
          <p>(2) Grüngürteln</p>
          <a href="https://www.data.gv.at/katalog/dataset/10c7b88b-a708-4e17-a7ef-2c1ce0590377">
            Grüngürtel Wien
          </a>
          <br />
          <a href="https://www.data.gv.at/katalog/dataset/d0145df8-7f6d-46e1-9bc6-ee7897054104">
            Öffentlich zugängige Grünflächen Wien
          </a>
          <br />
          <br />
          <p>(3) Bezirksgrenzen</p>
          <a href="https://www.data.gv.at/katalog/dataset/2ee6b8bf-6292-413c-bb8b-bd22dbb2ad4b">
            Bezirksgrenzen
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
