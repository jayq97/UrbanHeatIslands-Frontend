import "./App.css";
//import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import SelectDistrict from "./components/SelectDistrict/SelectDistrict";
//import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";

const App = () => {
  const [elementToDisplay, setElementToDisplay] = useState("Normal");
  const [district, setDistrict] = useState("1");

  return (
    <div className="container">
      <Header />
      <Map state={elementToDisplay} district={district} />
      <SelectDistrict district={district} setDistrict={setDistrict} />
    </div>
  );
};

export default App;
