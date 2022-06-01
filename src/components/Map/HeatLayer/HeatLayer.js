import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet.heat";

function HeatLayer({ map, stations }) {
  const didLoad = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (map && stations && !didLoad.current) {
        /*map.on("overlayremove", () => {
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
          map.removeLayer(L.heatLayer(points));
        });*/

        const options = {
          minOpacity: 0.2,
          radius: 100,
          max: 10.0,
        };

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

        console.log(points);

        L.heatLayer(points, options).addTo(map);
        didLoad.current = true;
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [map, stations]);
  return null;
}

export default HeatLayer;
