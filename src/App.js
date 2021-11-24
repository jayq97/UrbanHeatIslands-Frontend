import "./App.css";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Map />
      <Button color="green" text="Show Heat Islands" />
      <Button color="blue" text="Show Public green spaces" />
      <Button color="green" text="Show water areas" />
    </div>
  );
};

export default App;
