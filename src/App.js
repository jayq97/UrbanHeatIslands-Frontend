import "./App.css";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";

function App() {
  return (
    <div className="container">
      <Header />
      <Map />
      <Button color="green" text="Show Heat Islands"></Button>
      <Button color="blue" text="Show Public green spaces"></Button>
      <Button color="green" text="Show water areas"></Button>
    </div>
  );
}

export default App;
