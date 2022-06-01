import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

function HeatLayer({ map, stations }) {
  useEffect(() => {
    if (map && stations) {
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

      L.heatLayer(points).remove().addTo(map);
    }
  }, [map, stations]);
  return null;
}

export default HeatLayer;
