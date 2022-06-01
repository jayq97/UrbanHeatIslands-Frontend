import * as React from "react";
import useSwr from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const DistrictNameArray = [
  "Innere Stadt",
  "Leopoldstadt",
  "Landstraße",
  "Wieden",
  "Margareten",
  "Mariahilf",
  "Neubau",
  "Josefstadt",
  "Alsergrund",
  "Favoriten",
  "Simmering",
  "Meidling",
  "Hietzing",
  "Penzing",
  "Rudolfsheim-Fünfhaus",
  "Ottakring",
  "Hernals",
  "Währing",
  "Döbling",
  "Brigittenau",
  "Floridsdorf",
  "Donaustadt",
  "Liesing",
];

const Station = (district) => {
  var url = "https://uhi.w3.cs.technikum-wien.at/nodejs/getData/" + district;
  const { data: stationData, error: stationError } = useSwr(url, { fetcher });
  return stationData && !stationError ? stationData : [];
};

const TemperatureData = ({ district }) => {
  const stations = Station(district);

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
      <br />
      <h2>Durchschnitt Temperaturen:</h2>
      <table style={{ width: "100%" }}>
        {getAllData().map((tableRow) => tableRow[0])}
      </table>
    </>
  );
};

export default TemperatureData;

const getAllData = () => {
  var tableRow = [];

  for (var i = 0; i <= 22; i++) {
    const stations = Station(i + 1).filter(
      (station) =>
        station.lat &&
        station.lon &&
        station.temp !== null &&
        station.humidity !== null &&
        station.windspeed !== null &&
        station.pressure !== null &&
        station.time !== null
    );

    var temp = stations.map((station) => parseFloat(station.temp));

    var sum = temp.reduce((a, b) => a + b, 0);
    var avg = sum / temp.length || 0;

    tableRow.push([
      <tr>
        {" "}
        <th>
          ({i + 1}) {DistrictNameArray[i]}:{" "}
        </th>
        <td style={{ textAlign: "right" }}>{parseFloat(avg.toFixed(1))} °C</td>
      </tr>,
      parseFloat(avg.toFixed(1)),
    ]);
  }

  return tableRow.sort(function (a, b) {
    return b[1] - a[1];
  });
};
