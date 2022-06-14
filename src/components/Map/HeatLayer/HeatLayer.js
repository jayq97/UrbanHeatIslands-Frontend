import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet.heat";

// Die HeatLayer bekommt die Map und die Stationen als Parameter
const HeatLayer = ({ map, stations }) => {
  const didLoad = useRef(false); // didLoad wird benötigt, damit die Heatmap nur einmal eingebunden wird

  useEffect(() => {
    // Die Heatlayer wird nach 1 Sekunde erst eingebunden
    const timer = setTimeout(() => {
      // Falls Map & Stationen vorhanden, und die HeatLayer noch nicht geladen hat
      if (map && stations && !didLoad.current) {
        // Einstellungen für die Heatlayer
        const options = {
          minOpacity: 0.2,
          radius: 100,
          max: 10.0,
        };

        // Punkte für die Heatlayer (dabei beinhaltet diese nur die Positionen der Wetterstation und die Temperaturen)
        const points = stations
          ? stations
              .filter(
                (station) =>
                  station.lat &&
                  station.lon &&
                  station.temp !== null &&
                  station.humidity !== null &&
                  station.windspeed !== null &&
                  station.pressure !== null &&
                  station.time !== null
              )
              .map((station) => {
                return [station.lat, station.lon, station.temp];
              })
          : [];

        L.heatLayer(points, options).addTo(map); // Binde die Punkte in die Heatlayer ein und dann schließlich die Heatlayer in die Heatmap
        didLoad.current = true; // Fertig mit der Prozedur => es ist geladen
      }
    }, 1000); // nach 1 Sekunde
    return () => clearTimeout(timer);
    // Die Legende wird nur eingebunden, wenn der Wert im Array im zweiten Parameter von useEffect()) geändert wird.
  }, [map, stations]);
  return null;
};

export default HeatLayer;
