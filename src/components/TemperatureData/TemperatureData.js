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
  let url = "https://uhi.w3.cs.technikum-wien.at/nodejs/getData/" + district;
  /* Mit useSwr erhalten die Komponenten (stationData) konstant einen Stream von Daten 
  und die Benutzeroberfläche wird immer aktualisiert. */
  const { data: stationData, error: stationError } = useSwr(url, { fetcher });
  return stationData && !stationError ? stationData : []; // Falls die Daten nicht vorhanden sind, wird ein leeres Array zurückgegeben
};

// Temperatur bekommt den Bezirk als Parameter
const TemperatureData = ({ district }) => {
  // Stationen mit unvollständigen Werten werden herausgefiltert (.filter()) und nur die Temperaturen der Stationen geholt (.map()).
  const stations = Station(district) // Stationen aus dem Bezirk werden geholt.
    .filter(
      (station) =>
        district !== 0 &&
        station.lat != null &&
        station.lon != null &&
        station.temp != null &&
        station.humidity != null &&
        station.windspeed != null &&
        station.pressure != null &&
        station.time != null
    );

  let temp = getMinMaxAvgValues(
    stations.map((station) => parseFloat(station.temp))
  );
  let humidity = getMinMaxAvgValues(
    stations.map((station) => parseFloat(station.humidity))
  );
  let windspeed = getMinMaxAvgValues(
    stations.map((station) => parseFloat(station.windspeed))
  );
  let pressure = getMinMaxAvgValues(
    stations.map((station) => parseFloat(station.pressure))
  );

  return (
    <>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr style={{ fontSize: "20px" }} key="MinMaxAvgTotal">
            <th
              style={{
                borderLeft: "1px solid white",
                borderTop: "1px solid white",
              }}
            ></th>
            <td>min</td>
            <td>Ø</td>
            <td>max</td>
          </tr>
          <tr style={{ fontSize: "16px" }} key="TempTotal">
            <th style={{ textAlign: "right" }}>Temperatur (°C):</th>
            <td>{temp.min != null ? temp.min : "keine Daten"}</td>
            <td>{temp.avg != null ? temp.avg : "keine Daten"}</td>
            <td>{temp.max != null ? temp.max : "keine Daten"}</td>
          </tr>
          <tr style={{ fontSize: "16px" }} key="HumidityTotal">
            <th style={{ textAlign: "right" }}>Feuchtigkeit (%):</th>
            <td>{humidity.min != null ? humidity.min : "keine Daten"}</td>
            <td>{humidity.avg != null ? humidity.avg : "keine Daten"}</td>
            <td>{humidity.max != null ? humidity.max : "keine Daten"}</td>
          </tr>
          <tr style={{ fontSize: "16px" }} key="WindspeedTotal">
            <th style={{ textAlign: "right" }}>Windgeschwindigkeit (km/h):</th>
            <td>{windspeed.min != null ? windspeed.min : "keine Daten"}</td>
            <td>{windspeed.avg != null ? windspeed.avg : "keine Daten"}</td>
            <td>{windspeed.max != null ? windspeed.max : "keine Daten"}</td>
          </tr>
          <tr style={{ fontSize: "16px" }} key="PressureTotal">
            <th style={{ textAlign: "right" }}>Luftdruck (hPa):</th>
            <td>{pressure.min != null ? pressure.min : "keine Daten"}</td>
            <td>{pressure.avg != null ? pressure.avg : "keine Daten"}</td>
            <td>{pressure.max != null ? pressure.max : "keine Daten"}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <h2>Durchschnittswerte Ø:</h2>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr style={{ fontSize: "20px" }} key="MinMaxAvgDistrict">
            <th
              style={{
                borderLeft: "1px solid white",
                borderTop: "1px solid white",
              }}
            ></th>
            <td>°C</td>
            <td>%</td>
            <td>km/h</td>
            <td>hPa</td>
          </tr>
          {getAllData().map((tableRow) => tableRow[0])}
        </tbody>
      </table>
    </>
  );
};

export default TemperatureData;

// getAllData: ALLE Wetterstationen werden geholt
const getAllData = () => {
  let tableRow = [];

  // Die for-Schleife wird 23 Mal (wegen 23 Bezirke) durchlaufen.
  for (let i = 0; i <= 22; i++) {
    const stations = Station(i + 1).filter(
      (station) =>
        station.lat != null &&
        station.lon != null &&
        station.temp != null &&
        station.humidity != null &&
        station.windspeed != null &&
        station.pressure != null &&
        station.time != null
    );

    let avgTemp = getAvgValues(
      stations.map((station) => parseFloat(station.temp))
    );
    let avgHumidity = getAvgValues(
      stations.map((station) => parseFloat(station.humidity))
    );
    let avgWindspeed = getAvgValues(
      stations.map((station) => parseFloat(station.windspeed))
    );
    let avgPressure = getAvgValues(
      stations.map((station) => parseFloat(station.pressure))
    );

    // Für den jeweiligen Bezirk werden die Temperaturdaten in einem Array abgespeichert.
    tableRow.push([
      <tr style={{ fontSize: "16px" }} key={i}>
        <th style={{ textAlign: "right" }}>
          ({i + 1}) {DistrictNameArray[i]}:{" "}
        </th>
        <td>{avgTemp != null ? avgTemp : "keine Daten"}</td>
        <td>{avgHumidity != null ? avgHumidity : "keine Daten"}</td>
        <td>{avgWindspeed != null ? avgWindspeed : "keine Daten"}</td>
        <td>{avgPressure != null ? avgPressure : "keine Daten"}</td>
      </tr>,
      avgTemp,
    ]);
  }

  // Das Array wird sortiert zurückgegeben.
  return tableRow.sort((a, b) => {
    const aHas = typeof a[1] !== "undefined";
    const bHas = typeof b[1] !== "undefined";
    return bHas - aHas || (aHas === true && b[1] - a[1]) || 0;
  });
};

const getMinMaxAvgValues = (array) => {
  let min, max, avg;
  if (array.length !== 0) {
    min = Math.min(...array); // Minimaler Wert
    max = Math.max(...array); // Maximaler Wert
    avg = getAvgValues(array); // Durchschnitt
  }
  return { min: min, max: max, avg: avg };
};

const getAvgValues = (array) => {
  let avg;
  if (array.length !== 0) {
    let sum = array.reduce((a, b) => a + b, 0);
    avg = parseFloat((sum / array.length || 0).toFixed(1));
  }
  return avg;
};
