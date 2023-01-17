import { useEffect } from "react";
import L from "leaflet";
import "./Legend.css";

// Die Legende bekommt die Map als Parameter
const Legend = ({ map }) => {
  useEffect(() => {
    // Binde die Legende im Hintergrund ein
    if (map) {
      // Falls Map vorhanden
      const legend = L.control({ position: "bottomright" }); // Die Legende wird unten rechts platziert

      legend.onAdd = () => {
        // Die Legende bekommt die Temperaturbereiche als HTML eingebunden
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML =
          "<h4>Legende (°C)</h4>" +
          "<p><i style='background-color:#DC4B42;'>⠀⠀</i>> 35</p>" +
          "<p><i style='background-color:#E37947;'>⠀⠀</i>30-35</p>" +
          "<p><i style='background-color:#EDA84F;'>⠀⠀</i>25-29</p>" +
          "<p><i style='background-color:#F7D65C;'>⠀⠀</i>20-24</p>" +
          "<p><i style='background-color:#F5EE61;'>⠀⠀</i>15-19</p>" +
          "<p><i style='background-color:#C9D968;'>⠀⠀</i>10-14</p>" +
          "<p><i style='background-color:#75B360;'>⠀⠀</i>5-9</p>" +
          "<p><i style='background-color:#83C18C;'>⠀⠀</i>1-4</p>" +
          "<p><i style='background-color:#8DD0F3;'>⠀⠀</i>< 1</p>";
        return div;
      };

      legend.addTo(map); // Schließlich wird dann bei der Map die Legende eingebunden
    }
    // Die Legende wird nur eingebunden, wenn der Wert im Array im zweiten Parameter von useEffect()) geändert wird.
  }, [map]);
  return null;
};

export default Legend;
