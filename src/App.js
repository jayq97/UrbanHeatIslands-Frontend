import "./App.css";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import SelectDistrict from "./components/SelectDistrict/SelectDistrict";
import { useState } from "react";
import Navbar from "./components/Navbar";

const App = () => {
  const [district, setDistrict] = useState("1");

  return (
    <>
      <Navbar />
    </>
  );
};

export default App;
