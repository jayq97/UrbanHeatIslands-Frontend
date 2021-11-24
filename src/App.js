import "./App.css";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";

const App = () => {
  const [elementToDisplay, setElementToDisplay] = useState("Normal");

  const showA = () => {
    setElementToDisplay("Normal");
  };
  const showB = () => {
    setElementToDisplay("Heat");
  };
  const showC = () => {
    setElementToDisplay("GreenArea");
  };
  const showD = () => {
    setElementToDisplay("WaterArea");
  };

  return (
    <div className="container">
      <Header />
      <Map state={elementToDisplay} />
      <Button onClick={showA} color="orange" text="Show Normal Map" />
      <Button onClick={showB} color="red" text="Show Heat Islands" />
      <Button onClick={showC} color="green" text="Show Public Green Spaces" />
      <Button onClick={showD} color="blue" text="Show Water Areas" />
    </div>
  );
};

export default App;
