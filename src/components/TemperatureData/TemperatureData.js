import * as React from "react";
import useSwr from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const TemperatureData = ({ district }) => {
  //var url = "http://localhost:8000/getData/" + district;
  var url = "https://uhi.w3.cs.technikum-wien.at/nodejs/getData/" + district;
  const { data: stationData, error: stationError } = useSwr(url, { fetcher });
  const stations = stationData && !stationError ? stationData : [];

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

  var sum = temp.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  var avgTemp = sum / temp.length || 0;

  return (
    <>
      <table style={{ width: "100%" }}>
        <tr>
          <th>Maximale Temperatur: </th>
          <td style={{ textAlign: "right" }}>{maxTemp} °C</td>
        </tr>
        <tr>
          <th>Durchschnitt Temperatur: </th>
          <td style={{ textAlign: "right" }}>
            {parseFloat(avgTemp.toFixed(1))} °C
          </td>
        </tr>
        <tr>
          <th>Minimale Temperatur: </th>
          <td style={{ textAlign: "right" }}>{minTemp} °C</td>
        </tr>
      </table>
    </>
  );
};

export default TemperatureData;
