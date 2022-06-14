import * as React from "react";
import useSwr from "swr";

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

// Die Daten aus dem Backend werden als Json-Datei ausgelesen
const fetcher = (...args) => fetch(...args).then((response) => response.json());

// Wetterstationen werden vom Backend geholt
const Station = (district) => {
  var url = "https://uhi.w3.cs.technikum-wien.at/nodejs/getData/" + district;
  /* Mit useSwr erhalten die Komponenten (stationData) konstant einen Stream von Daten 
  und die Benutzeroberfläche wird immer aktualisiert. */
  const { data: stationData, error: stationError } = useSwr(url, { fetcher });
  return stationData && !stationError ? stationData : []; // Falls die Daten nicht vorhanden sind, wird ein leeres Array zurückgegeben
};

// Temperatur bekommt den Bezirk als Parameter
const TemperatureData = ({ district }) => {
  const stations = Station(district); // Stationen aus dem Bezirk werden geholt.

  // Stationen mit unvollständigen Werten werden herausgefiltert (.filter()) und nur die Temperaturen der Stationen geholt (.map()).
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

  var minTemp = Math.min(...temp); // Minimale Temperatur
  var maxTemp = Math.max(...temp); // Maximale Temperatur

  var sum = temp.reduce((a, b) => parseFloat(a) + parseFloat(b), 0); // Summe der Temperatur
  var avgTemp = sum / temp.length || 0; // Durchschnittstemperatur

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
            {/* Der Wert wird auf eine Nachkommastelle gerundet */}
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

// getAllData: ALLE Wetterstationen werden geholt
const getAllData = () => {
  var tableRow = [];

  // Die for-Schleife wird 23 Mal (wegen 23 Bezirke) durchlaufen.
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

    // Für den jeweiligen Bezirk werden die Temperaturdaten in einem Array abgespeichert.
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

  // Das Array wird sortiert zurückgegeben.
  return tableRow.sort(function (a, b) {
    return b[1] - a[1];
  });
};
