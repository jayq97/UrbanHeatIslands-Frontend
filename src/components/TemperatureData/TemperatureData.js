import * as React from "react";
import useSwr from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const TemperatureData = ({ district }) => {
  //var url = "http://localhost:8000/getData/" + district + "/temp";
  var url =
    "https://uhi.w3.cs.technikum-wien.at/nodejs/getData/" + district + "/temp";
  const { data: avgTempData, error: avgTempError } = useSwr(url, { fetcher });
  const avgTemp = avgTempData && !avgTempError ? avgTempData.toFixed(2) : [];

  //var url2 = "http://localhost:8000/getData/" + district;
  var url2 = "https://uhi.w3.cs.technikum-wien.at/nodejs/getData/" + district;
  const { data: stationData, error: stationError } = useSwr(url2, { fetcher });
  const stations = stationData && !stationError ? stationData : [];

  console.log(avgTemp);

  var temp = stations
    .filter(
      (station) =>
        district !== 0 &&
        station.lat &&
        station.lon &&
        station.temp !== null &&
        station.humidity !== null &&
        station.windspeed !== null &&
        station.pressure !== null &&
        station.time !== null
    )
    .map((station) => station.temp);

  console.log(temp);

  var minTemp = Math.min(...temp);
  var maxTemp = Math.max(...temp);

  return (
    <div>
      <h4>Avg. Temperatur: {avgTemp} °C</h4>
      <h4>Min. Temperatur: {minTemp} °C</h4>
      <h4>Max. Temperatur: {maxTemp} °C</h4>
    </div>
  );
};

export default TemperatureData;
