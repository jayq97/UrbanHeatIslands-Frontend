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
        var options = {
          radius: 70,
          opacity: 0.75,
          duration: 400,
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

        // Erstellt Hexbin-Layer mit Optionen und binde diese in die Map ein
        var hexLayer = L.hexbinLayer(options).addTo(map);

        // Füge Einstellungen der Radien, Farbe und Koordinatenpunkte hinzu
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

            /* 
            Falls ein Element die Temperatur unter 1 hat, setze diese auf 1, ansonsten bleibt sie
            => Somit können alle Elemente nicht unter 1 sein, da sonst ein Bug vom Library entstehen kann 
            */
            let adjustedArray = values.map((element) =>
              element <= 1 ? 1 : element
            ); //

            let sum = adjustedArray.reduce(
              (a, b) => a + Math.pow(b, 2), // falls der Wert < 0 ist
              0
            ); // Summe der Temperatur

            let avg = sum / d.length || 0; // Durchschnitt

            return avg;
          });

        // Füge Wetterstation-Daten hinzu
        hexLayer.data(points);

        // Füge Bezirksgrenzen in die Map hinzu
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
