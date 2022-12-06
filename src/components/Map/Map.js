import "./Map.css";

// Leaflet React Components
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  LayersControl,
  LayerGroup,
  GeoJSON,
} from "react-leaflet";

// Leaflet Custom Components
import Legend from "./Legend/Legend.js";
import HeatLayer from "./HeatLayer/HeatLayer.js";

import { React, useState } from "react";

import useSwr from "swr";
import L from "leaflet";

// Gewässer GeoJSON
import Gew1 from "../../data/gewässer/FLIESSGEWOGD.json";
import Gew2 from "../../data/gewässer/STEHENDEGEWOGD.json";

// Grünflächen GeoJSON
import Grün1 from "../../data/grünflächen/GRUENFREIFLOGD_GRUENGEWOGD.json";
import Grün2 from "../../data/grünflächen/OEFFGRUENFLOGD.json";

// Bezirke GeoJSON
import InnereStadt from "../../data/bezirke/InnereStadt.json";
import Leopoldstadt from "../../data/bezirke/Leopoldstadt.json";
import Landstraße from "../../data/bezirke/Landstraße.json";
import Wieden from "../../data/bezirke/Wieden.json";
import Margareten from "../../data/bezirke/Margareten.json";
import Mariahilf from "../../data/bezirke/Mariahilf.json";
import Neubau from "../../data/bezirke/Neubau.json";
import Josefstadt from "../../data/bezirke/Josefstadt.json";
import Alsergrund from "../../data/bezirke/Alsergrund.json";
import Favoriten from "../../data/bezirke/Favoriten.json";
import Simmering from "../../data/bezirke/Simmering.json";
import Meidling from "../../data/bezirke/Meidling.json";
import Hietzing from "../../data/bezirke/Hietzing.json";
import Penzing from "../../data/bezirke/Penzing.json";
import RudolfsheimFünfhaus from "../../data/bezirke/RudolfsheimFünfhaus.json";
import Ottakring from "../../data/bezirke/Ottakring.json";
import Hernals from "../../data/bezirke/Hernals.json";
import Währing from "../../data/bezirke/Währing.json";
import Döbling from "../../data/bezirke/Döbling.json";
import Brigittenau from "../../data/bezirke/Brigittenau.json";
import Floridsdorf from "../../data/bezirke/Floridsdorf.json";
import Donaustadt from "../../data/bezirke/Donaustadt.json";
import Liesing from "../../data/bezirke/Liesing.json";

// Temperaturbereiche Styles
import {
  MarkerLower0,
  Marker0to5,
  Marker5to10,
  Marker10to15,
  Marker15to20,
  Marker20to25,
  Marker25to30,
  Marker30to35,
  MarkerGreater35,
  MarkerNoTemp,
} from "./MarkerElements/MarkerElements";

// Zeitformatierung
import Moment from "moment";
import "moment/locale/de-at";
Moment.locale("de-at");

// Die Daten aus dem Backend werden als Json-Datei ausgelesen
const fetcher = (...args) => fetch(...args).then((response) => response.json());

// Wetterstationen werden vom Backend geholt
const Station = (district) => {
  var url = "https://uhi.w3.cs.technikum-wien.at/nodejs/getData/" + district;
  /* Mit useSwr erhalten die Komponenten (stationData) konstant einen Stream von Daten 
  und die Benutzeroberfläche wird immer aktualisiert. */
  const { data: stationData, error: stationError } = useSwr(
    district !== "loading" ? url : null,
    { fetcher }
  );
  return stationData && !stationError ? stationData : []; // Falls die Daten nicht vorhanden sind, wird ein leeres Array zurückgegeben
};

// Bezirke GeoJSON im Array
const GeoJSONDataArray = [
  InnereStadt,
  Leopoldstadt,
  Landstraße,
  Wieden,
  Margareten,
  Mariahilf,
  Neubau,
  Josefstadt,
  Alsergrund,
  Favoriten,
  Simmering,
  Meidling,
  Hietzing,
  Penzing,
  RudolfsheimFünfhaus,
  Ottakring,
  Hernals,
  Währing,
  Döbling,
  Brigittenau,
  Floridsdorf,
  Donaustadt,
  Liesing,
];

// Bezirksnamen im Array
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

// Die Map bekommt den Bezirk als Parameter
const Map = ({ district }) => {
  const [map, setMap] = useState(null); // Die normale Map
  const [map2, setMap2] = useState(null); // Die Heatmap

  // Stationen mit unvollständigen Werten werden herausgefiltert (.filter()).
  const stations = Station(district).filter(
    (station) =>
      district !== 0 &&
      station.lat &&
      station.lon &&
      station.temp !== null &&
      station.humidity !== null &&
      station.windspeed !== null &&
      station.pressure !== null &&
      station.time !== null
  );

  return (
    <>
      <table style={{ width: "100%" }}>
        <tr>
          <th>
            {/* Die normale Map */}
            <MapContainer
              center={[48.210033, 16.363449]}
              zoom={12}
              scrollWheelZoom={true}
              ref={(ref) => {
                setMap(ref);
              }}
            >
              {/* Layer-Controls
                Baselayer: Mapauswahl (Radiobuttons)
                Overlay: GeoJSON-Anzeige (Checkboxes)
              */}
              <LayersControl position="topright">
                {/* Standardmap */}
                <LayersControl.BaseLayer checked name="Standardeinstellung">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>
                {/* Satellitenmap */}
                <LayersControl.BaseLayer name="Satellit">
                  <TileLayer
                    url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    maxZoom={20}
                    subdomains={["mt1", "mt2", "mt3"]}
                  />
                </LayersControl.BaseLayer>

                {/* Wetterstationen */}
                <LayersControl.Overlay checked name="Wetterstationen">
                  <LayerGroup>
                    {/* Marker der Wetterstationen werden gesetzt mit einem Popup (wenn man auf den Marker drückt) mit den zugehörigen Daten */}
                    {district
                      ? stations.map((station) => (
                          <Marker
                            key={station.station_id}
                            position={[station.lat, station.lon]}
                            // Das Icon hängt von dem Temperaturbereich ab (siehe renderStationColor() Funktion)
                            icon={L.divIcon({
                              iconAnchor: [0, 24],
                              labelAnchor: [-6, 0],
                              popupAnchor: [0, -36],
                              html: `<h2 style="${renderStationColor(
                                station.temp
                              )}" />${
                                station.temp !== null
                                  ? Math.trunc(station.temp) // Die Nachkommastellen der Temperatur werden gestutzt
                                  : ""
                              }</h2>`,
                            })}
                          >
                            {/* Wenn man auf den Marker drückt, wird ein Popup mit den zugehörigen Daten angezeigt */}
                            <Popup
                              position={[station.lat, station.lon]}
                              width="auto"
                            >
                              <div>
                                <h1>{station.neighborhood}</h1>
                                <h2>{station.station_id}</h2>
                                <hr width="auto" />
                                <br />
                                <table style={{ width: "100%" }}>
                                  <tr>
                                    <th style={{ textAlign: "right" }}>
                                      Temperatur:{" "}
                                    </th>
                                    <td>{station.temp} °C</td>
                                  </tr>
                                  <tr>
                                    <th style={{ textAlign: "right" }}>
                                      Feuchtigkeit:{" "}
                                    </th>
                                    <td>{station.humidity} %</td>
                                  </tr>
                                  <tr>
                                    <th style={{ textAlign: "right" }}>
                                      Windgeschwindigkeit:{" "}
                                    </th>
                                    <td>{station.windspeed} km/h</td>
                                  </tr>
                                  <tr>
                                    <th style={{ textAlign: "right" }}>
                                      Luftdruck:{" "}
                                    </th>
                                    <td>{station.pressure} mbar</td>
                                  </tr>
                                  <tr>
                                    <th style={{ textAlign: "right" }}>
                                      Höhe über dem Meeresspiegel:{" "}
                                    </th>
                                    <td>{station.elevation} m</td>
                                  </tr>
                                </table>
                                <p className="font">
                                  Zuletzt aktualisiert am:{" "}
                                  {Moment(station.time).format("LLLL")}
                                </p>
                              </div>
                            </Popup>
                          </Marker>
                        ))
                      : ""}
                  </LayerGroup>
                </LayersControl.Overlay>
                {/* Bezirke GeoJSON */}
                <LayersControl.Overlay checked name="Bezirksgrenzen">
                  <LayerGroup>
                    {/* Bezirks-GeoJSON wird je nach Bezirk eingebunden*/}
                    {district ? renderGeoJSON(district) : ""}
                  </LayerGroup>
                </LayersControl.Overlay>
                {/* Gewässer GeoJSON */}
                <LayersControl.Overlay name="Gewässernetz Wien">
                  <LayerGroup>
                    <GeoJSON data={Gew1} />
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Stehende Gewässer Wien">
                  <LayerGroup>
                    <GeoJSON data={Gew2} />
                  </LayerGroup>
                </LayersControl.Overlay>
                {/* Grünflächen GeoJSON */}
                <LayersControl.Overlay name="Grüngürtel Wien">
                  <LayerGroup>
                    <GeoJSON data={Grün1} style={{ color: "green" }} />
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Öffentlich zugängige Grünflächen Wien">
                  <LayerGroup>
                    <GeoJSON data={Grün2} style={{ color: "green" }} />
                  </LayerGroup>
                </LayersControl.Overlay>
              </LayersControl>

              {/* Die Legende wird in der Map eingebunden */}
              <Legend map={map} />
            </MapContainer>
          </th>
        </tr>
        <tr>
          <th>
            {/* Die Heatmap */}
            <MapContainer
              center={[48.210033, 16.363449]}
              zoom={12}
              minZoom={10}
              maxZoom={12}
              scrollWheelZoom={true}
              ref={(ref) => {
                setMap2(ref);
              }}
            >
              <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Standardeinstellung">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Satellit">
                  <TileLayer
                    url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    maxZoom={20}
                    subdomains={["mt1", "mt2", "mt3"]}
                  />
                </LayersControl.BaseLayer>
              </LayersControl>

              {/* Die Heatlayer wird in der Heatmap eingebunden mit allen Wetterstationen */}
              <HeatLayer map={map2} stations={stations} />
            </MapContainer>
          </th>
        </tr>
      </table>
    </>
  );
};

export default Map;

// Die Daten für den jeweiligen Bezirk werden in das jeweilige Bezirks-GeoJSON eingebunden
const renderGeoJSON = (district) => {
  var tempArray = []; // Array Temperatur
  var humidityArray = []; // Array Temperatur
  var windspeedArray = []; // Array Temperatur
  var pressureArray = []; // Array Temperatur

  // Für jeden Bezirk (23 Mal - 23 Bezirke) werden die Temperaturdaten geholt
  for (var i = 0; i <= 22; i++) {
    // Stationen aus dem Bezirk werden herausgefiltert (.filter()) und nur die Temperaturen der Stationen geholt (.map()).
    const stations = Station(i + 1).filter(
      (station) =>
        district !== 0 &&
        station.lat &&
        station.lon &&
        station.temp !== null &&
        station.humidity !== null &&
        station.windspeed !== null &&
        station.pressure !== null &&
        station.time !== null
    );

    tempArray.push(
      getMinMaxAvgValues(stations.map((station) => parseFloat(station.temp)))
    );
    humidityArray.push(
      getMinMaxAvgValues(
        stations.map((station) => parseFloat(station.humidity))
      )
    );
    windspeedArray.push(
      getMinMaxAvgValues(
        stations.map((station) => parseFloat(station.windspeed))
      )
    );
    pressureArray.push(
      getMinMaxAvgValues(
        stations.map((station) => parseFloat(station.pressure))
      )
    );
  }

  var GeoJSONOutput = []; // Das Array, was als GeoJSON ausgegeben wird

  // Wenn der Zustandswert auf "all" ist, füge für jeden Bezirk ein GeoJSON hinzu
  if (district === "all") {
    for (let j = 0; j < GeoJSONDataArray.length; j++) {
      GeoJSONOutput.push(
        getGeoJSONComponent(
          tempArray,
          humidityArray,
          windspeedArray,
          pressureArray,
          j
        )
      );
    }
    // ansonsten nur für den ausgewählten Bezirk
  } else {
    let index = parseInt(district) - 1;
    GeoJSONOutput.push(
      getGeoJSONComponent(
        tempArray,
        humidityArray,
        windspeedArray,
        pressureArray,
        index
      )
    );
  }

  return <LayerGroup>{GeoJSONOutput}</LayerGroup>; // GeoJSON(s) werden zurückgegeben
};

const getGeoJSONComponent = (
  tempArray,
  humidityArray,
  windspeedArray,
  pressureArray,
  index
) => {
  return (
    <GeoJSON
      key={index + 1}
      data={GeoJSONDataArray[index]}
      // Das Style hängt von dem Temperaturbereich ab (siehe renderGeoJSONColor() Funktion)
      style={{
        fillColor: renderGeoJSONColor(tempArray[index]?.avg),
        fillOpacity: 0.6,
        color: "#000000",
        opacity: 1,
        weight: 2,
      }}
      // Eventhandler mit dem Maus über das GeoJSON
      onEachFeature={function (feature, layer) {
        layer.on("mouseover", function () {
          this.setStyle({
            fillColor: "#FFFFFF",
            fillOpacity: 0.3,
          });
        });
        layer.on("mouseout", function () {
          this.setStyle({
            fillColor: this.defaultOptions.style.fillColor,
            fillOpacity: this.defaultOptions.style.fillOpacity,
          });
        });
      }}
    >
      <Tooltip width="auto">
        <p>
          ({index + 1}) {DistrictNameArray[index]}
        </p>
      </Tooltip>
      <Popup width="auto">
        <div>
          <h1>{DistrictNameArray[index]}</h1>
          <h2>
            1{index + 1 < 10 ? "0" + parseInt(index + 1) : index + 1}0 Wien
          </h2>
          <hr width="auto" />
          <br />
          <table>
            <tr>
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
            <tr>
              <th style={{ textAlign: "right" }}>Temperatur (°C):</th>
              <td>
                {tempArray[index]?.min !== null
                  ? tempArray[index]?.min
                  : "keine Daten"}
              </td>
              <td>
                {tempArray[index]?.avg !== null
                  ? tempArray[index]?.avg
                  : "keine Daten"}
              </td>
              <td>
                {tempArray[index]?.max !== null
                  ? tempArray[index]?.max
                  : "keine Daten"}
              </td>
            </tr>
            <tr>
              <th style={{ textAlign: "right" }}>Feuchtigkeit (%):</th>
              <td>
                {humidityArray[index]?.min !== null
                  ? humidityArray[index]?.min
                  : "keine Daten"}
              </td>
              <td>
                {humidityArray[index]?.avg !== null
                  ? humidityArray[index]?.avg
                  : "keine Daten"}
              </td>
              <td>
                {humidityArray[index]?.max !== null
                  ? humidityArray[index]?.max
                  : "keine Daten"}
              </td>
            </tr>
            <tr>
              <th style={{ textAlign: "right" }}>
                Windgeschwindigkeit (km/h):
              </th>
              <td>
                {windspeedArray[index]?.min !== null
                  ? windspeedArray[index]?.min
                  : "keine Daten"}
              </td>
              <td>
                {windspeedArray[index]?.avg !== null
                  ? windspeedArray[index]?.avg
                  : "keine Daten"}
              </td>
              <td>
                {windspeedArray[index]?.max !== null
                  ? windspeedArray[index]?.max
                  : "keine Daten"}
              </td>
            </tr>
            <tr>
              <th style={{ textAlign: "right" }}>Luftdruck (mbar):</th>
              <td>
                {pressureArray[index]?.min !== null
                  ? pressureArray[index]?.min
                  : "keine Daten"}
              </td>
              <td>
                {pressureArray[index]?.avg !== null
                  ? pressureArray[index]?.avg
                  : "keine Daten"}
              </td>
              <td>
                {pressureArray[index]?.max !== null
                  ? pressureArray[index]?.max
                  : "keine Daten"}
              </td>
            </tr>
          </table>
        </div>
      </Popup>
    </GeoJSON>
  );
};

// Style der Station wird nach Temperaturbereich zurückgegeben
const renderStationColor = (temp) => {
  if (temp === null) return "#FFFFFF"; // keine Temperatur
  else if (temp < 0) return MarkerLower0; // < 0°C
  else if (temp >= 0 && temp < 5) return Marker0to5; // 0-5°C
  else if (temp >= 5 && temp < 10) return Marker5to10; // 5-10°C
  else if (temp >= 10 && temp < 15) return Marker10to15; // 10-15°C
  else if (temp >= 15 && temp < 20) return Marker15to20; // 15-20°C
  else if (temp >= 20 && temp < 25) return Marker20to25; // 20-25°C
  else if (temp >= 25 && temp < 30) return Marker25to30; // 25-30°C
  else if (temp >= 30 && temp < 35) return Marker30to35; // 30-35°C
  else if (temp >= 35) return MarkerGreater35; // > 35°C
  else return MarkerNoTemp; // keine Temperatur
};

// Farbe der Bezirks-GeoJSON wird nach Temperaturbereich zurückgegeben
const renderGeoJSONColor = (temp) => {
  if (temp === null) return "#FFFFFF";
  else if (temp < 0.0) return "#8DD0F3"; // < 0°C
  else if (temp >= 0.0 && temp < 5.0) return "#83C18C"; // 0-5°C
  else if (temp >= 5.0 && temp < 10.0) return "#75B360"; // 5-10°C
  else if (temp >= 10.0 && temp < 15.0) return "#C9D968"; // 10-15°C
  else if (temp >= 15.0 && temp < 20.0) return "#F5EE61"; // 15-20°C
  else if (temp >= 20.0 && temp < 25.0) return "#F7D65C"; // 20-25°C
  else if (temp >= 25.0 && temp < 30.0) return "#EDA84F"; // 25-30°C
  else if (temp >= 30.0 && temp < 35.0) return "#E37947"; // 30-35°C
  else if (temp >= 35.0) return "#DC4B42"; // > 35°C
  else return "#FFFFFF"; // keine Temperatur
};

const getMinMaxAvgValues = (array) => {
  let min, max, avg;
  if (array.length !== 0) {
    min = Math.min(...array); // Minimaler Wert
    max = Math.max(...array); // Maximaler Wert

    let sum = array.reduce((a, b) => a + b, 0); // Summe

    /* Der Wert wird auf eine Nachkommastelle gerundet */
    avg = parseFloat((sum / array.length || 0).toFixed(1)); // Durchschnitt
  }
  return { min: min, max: max, avg: avg };
};
