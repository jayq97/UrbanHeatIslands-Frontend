import { useEffect, useRef } from "react";
import AlleBezirke from "../../../data/bezirke/AlleBezirke.json";
import * as L from "leaflet";
import "leaflet.heat";
import "@asymmetrik/leaflet-d3";

// Die HeatLayer bekommt die Map und die Stationen als Parameter
const HeatLayer = ({ map, stations }) => {
  const didLoad = useRef(false); // didLoad wird benötigt, damit die Heatmap nur einmal eingebunden wird

  useEffect(() => {
    // Die Heatlayer wird nach 1 Sekunde erst eingebunden
    const timer = setTimeout(() => {
      // Falls Map & Stationen vorhanden, und die HeatLayer noch nicht geladen hat
      if (map && stations && !didLoad.current) {
        // Einstellungen für die Heatlayer
        /*const options = {
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

        L.heatLayer(points, options).addTo(map); // Binde die Punkte in die Heatlayer ein und dann schließlich die Heatlayer in die Heatmap*/

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

        var options = {
          radius: 70,
          opacity: 0.75,
          duration: 400,
        };

        var hexLayer = L.hexbinLayer(options).addTo(map);

        hexLayer
          .radiusRange(70)
          .lng(function (d) {
            return d[1];
          })
          .lat(function (d) {
            return d[0];
          })
          .colorRange([
            "#8DD0F3",
            "#83C18C",
            "#75B360",
            "#C9D968",
            "#F5EE61",
            "#F7D65C",
            "#EDA84F",
            "#E37947",
            "#DC4B42",
          ])
          .colorValue(function (d) {
            let values = d.map((element) => parseFloat(element.o[2])); // Auslesen der Temperaturwerte

            let minValue = Math.min(...values); // Minimum der Temperaturen im entsprechenden Bereich

            let minHexValue = // Hexbinwertes wird jenach Minimum der Temperaturen bestimmt (Referenz nach Legende)
              minValue < 1
                ? 0
                : minValue < 5
                ? 1
                : minValue < 10
                ? 2
                : minValue < 15
                ? 3
                : minValue < 20
                ? 4
                : minValue < 25
                ? 5
                : minValue < 30
                ? 6
                : minValue < 35
                ? 7
                : 8;

            /* 
            Werte werden angepasst, jenach Minimum des Hexbinwertes:

            Rechenbeispiel für etwas heißere Temperaturen: Minimumtemperatur = 25°C
            - => Hexbinwert = 6
            - Iteration für Minimumwert: 25°C - 25° + 6 = 6
            - Iteration für ein beliebiger Wert: 35°C - 25° + 6 = 16

            Das heißt, dass der Hexbinwert nur mindestens 6 betragen kann

            Rechenbeispiel für etwas niedrige Temperaturen: Minimumtemperatur = -5°C
            - => Hexbinwert = 0
            - Iteration für Minimumwert: -5°C - (-5)°C + 0 = 0
            - Iteration für ein beliebiger Wert: -1°C - (-5)°C + 0 = 4

            Das heißt, dass der Hexbinwert nur mindestens 0 betragen kann
            */
            let adjustedArray = values.map(
              (element) => element - minValue + minHexValue
            );

            /* Damit man eindeutig identifizieren kann, wo der höchste Wert liegt
            wird jeder Wert um 2 potenziert => exponentielle Proportion
            */
            let sum = adjustedArray.reduce(
              (a, b) => a + Math.pow(b, 2), // falls der Wert < 0 ist
              0
            ); // Summe der Temperatur

            return sum / d.length || 0; // Durchschnitt
          });

        hexLayer.data(points);

        L.geoJSON(AlleBezirke, {
          style: {
            fillColor: "#000000",
            fillOpacity: 0.1,
            color: "#000000",
            opacity: 1,
            weight: 2,
          },
        }).addTo(map);

        didLoad.current = true; // Fertig mit der Prozedur => es ist geladen
      }
    }, 1000); // nach 1 Sekunde
    return () => clearTimeout(timer);
    // Die Legende wird nur eingebunden, wenn der Wert im Array im zweiten Parameter von useEffect()) geändert wird.
  }, [map, stations]);
  return null;
};

export default HeatLayer;
