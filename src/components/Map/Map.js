import "./Map.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  GeoJSON,
} from "react-leaflet";

import Legend from "./Legend/Legend.js";
import HeatLayer from "./HeatLayer/HeatLayer.js";
import React, { useState } from "react";
import "leaflet.heat";

import useSwr from "swr";
import L from "leaflet";

import Gew1 from "../../data/gewässer/FLIESSGEWOGD.json";
import Gew2 from "../../data/gewässer/STEHENDEGEWOGD.json";

import Grün1 from "../../data/grünflächen/GRUENFREIFLOGD_GRUENGEWOGD.json";
import Grün2 from "../../data/grünflächen/OEFFGRUENFLOGD.json";

import AlleBezirke from "../../data/bezirke/AlleBezirke.json";
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

import Moment from "moment";
import "moment/locale/de-at";
Moment.locale("de-at");

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const Station = (district) => {
  var url = "https://uhi.w3.cs.technikum-wien.at/nodejs/getData/" + district;
  const { data: stationData, error: stationError } = useSwr(url, { fetcher });
  return stationData && !stationError ? stationData : [];
};

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

const Map = ({ district }) => {
  const [map, setMap] = useState(null);
  const [map2, setMap2] = useState(null);

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
            <MapContainer
              center={[48.210033, 16.363449]}
              zoom={12}
              scrollWheelZoom={true}
              whenCreated={(map) => {
                setMap(map);
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

                <LayersControl.Overlay checked name="Wetterstationen">
                  <LayerGroup>
                    {district
                      ? stations.map((station) => (
                          <Marker
                            key={station.station_id}
                            position={[station.lat, station.lon]}
                            icon={L.divIcon({
                              iconAnchor: [0, 24],
                              labelAnchor: [-6, 0],
                              popupAnchor: [0, -36],
                              html: `<h2 style="${renderStationColor(
                                station.temp
                              )}" />${
                                station.temp !== null
                                  ? Math.trunc(station.temp)
                                  : ""
                              }</h2>`,
                            })}
                          >
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
                                    <th>Temperatur: </th>
                                    <td style={{ textAlign: "right" }}>
                                      {station.temp} °C
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Feuchtigkeit: </th>
                                    <td style={{ textAlign: "right" }}>
                                      {station.humidity} %
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Windgeschwindigkeit: </th>
                                    <td style={{ textAlign: "right" }}>
                                      {station.windspeed} km/h
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Luftdruck: </th>
                                    <td style={{ textAlign: "right" }}>
                                      {station.pressure} mbar
                                    </td>
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
                <LayersControl.Overlay checked name="Bezirksgrenzen">
                  <LayerGroup>
                    {district ? renderGeoJSON(district) : ""}
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Gewässerkarte">
                  <LayerGroup>
                    <GeoJSON data={Gew1} />
                    <GeoJSON data={Gew2} />
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Grüngürtel">
                  <LayerGroup>
                    <GeoJSON data={Grün1} style={{ color: "green" }} />
                    <GeoJSON data={Grün2} style={{ color: "green" }} />
                  </LayerGroup>
                </LayersControl.Overlay>
              </LayersControl>

              <Legend map={map} />
            </MapContainer>
          </th>
        </tr>
        <tr>
          <th>
            <MapContainer
              center={[48.210033, 16.363449]}
              zoom={12}
              scrollWheelZoom={true}
              whenCreated={(map) => {
                setMap2(map);
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

              <GeoJSON
                data={AlleBezirke}
                style={{
                  fillColor: "#000000",
                  fillOpacity: 0.1,
                  color: "#000000",
                  opacity: 1,
                  weight: 2,
                }}
              ></GeoJSON>
              <HeatLayer map={map2} stations={stations} />
            </MapContainer>
          </th>
        </tr>
      </table>
    </>
  );
};

export default Map;

const renderGeoJSON = (district) => {
  var MinTempArray = [];
  var MaxTempArray = [];
  var AvgTempArray = [];

  for (var i = 0; i <= 22; i++) {
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

    var temp = stations.map((station) => parseFloat(station.temp));

    MinTempArray.push(Math.min(...temp));
    MaxTempArray.push(Math.max(...temp));

    var sum = temp.reduce((a, b) => a + b, 0);
    var avg = sum / temp.length || 0;

    AvgTempArray.push(parseFloat(avg.toFixed(1)));
  }

  var GeoJSONOutput = [];

  if (district === "all") {
    for (var j = 0; j < GeoJSONDataArray.length; j++) {
      GeoJSONOutput.push(
        <GeoJSON
          key={j + 1}
          data={GeoJSONDataArray[j]}
          style={{
            fillColor: renderGeoJSONColor(AvgTempArray[j]),
            fillOpacity: 0.6,
            color: "#000000",
            opacity: 1,
            weight: 2,
          }}
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
          <Popup width="auto">
            <div>
              <h1>{DistrictNameArray[j]}</h1>
              <h2>1{j + 1 < 10 ? "0" + parseInt(j + 1) : j + 1}0 Wien</h2>
              <hr width="auto" />
              <br />
              <table style={{ width: "100%" }}>
                <tr>
                  <th>Maximale Temperatur: </th>
                  <td style={{ textAlign: "right" }}>{MaxTempArray[j]} °C</td>
                </tr>
                <tr>
                  <th>Durchschnitt Temperatur: </th>
                  <td style={{ textAlign: "right" }}>{AvgTempArray[j]} °C</td>
                </tr>
                <tr>
                  <th>Minimale Temperatur: </th>
                  <td style={{ textAlign: "right" }}>{MinTempArray[j]} °C</td>
                </tr>
              </table>
            </div>
          </Popup>
        </GeoJSON>
      );
    }
  } else {
    GeoJSONOutput.push(
      <GeoJSON
        key={district}
        data={GeoJSONDataArray[parseInt(district) - 1]}
        style={{
          fillColor: renderGeoJSONColor(AvgTempArray[parseInt(district) - 1]),
          fillOpacity: 0.6,
          color: "#000000",
          opacity: 1,
          weight: 2,
        }}
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
        <Popup width="auto">
          <div>
            <h1>{DistrictNameArray[parseInt(district) - 1]}</h1>
            <h2>1{district < 10 ? "0" + district : district}0 Wien</h2>
            <hr width="auto" />
            <br />
            <table style={{ width: "100%" }}>
              <tr>
                <th>Maximale Temperatur: </th>
                <td style={{ textAlign: "right" }}>
                  {MaxTempArray[parseInt(district) - 1]} °C
                </td>
              </tr>
              <tr>
                <th>Durchschnitt Temperatur: </th>
                <td style={{ textAlign: "right" }}>
                  {AvgTempArray[parseInt(district) - 1]} °C
                </td>
              </tr>
              <tr>
                <th>Minimale Temperatur: </th>
                <td style={{ textAlign: "right" }}>
                  {MinTempArray[parseInt(district) - 1]} °C
                </td>
              </tr>
            </table>
          </div>
        </Popup>
      </GeoJSON>
    );
    console.log(MinTempArray[parseInt(district) - 1]);
    console.log(MaxTempArray[parseInt(district) - 1]);
    console.log(AvgTempArray[parseInt(district) - 1]);
  }

  return <LayerGroup>{GeoJSONOutput}</LayerGroup>;
};

const renderStationColor = (temp) => {
  if (temp < 0) return MarkerLower0;
  else if (temp >= 0 && temp < 5) return Marker0to5;
  else if (temp >= 5 && temp < 10) return Marker5to10;
  else if (temp >= 10 && temp < 15) return Marker10to15;
  else if (temp >= 15 && temp < 20) return Marker15to20;
  else if (temp >= 20 && temp < 25) return Marker20to25;
  else if (temp >= 25 && temp < 30) return Marker25to30;
  else if (temp >= 30 && temp < 35) return Marker30to35;
  else if (temp >= 35) return MarkerGreater35;
  else return MarkerNoTemp;
};

const renderGeoJSONColor = (temp) => {
  if (temp < 0.0) return "#8DD0F3";
  else if (temp >= 0.0 && temp < 5.0) return "#83C18C";
  else if (temp >= 5.0 && temp < 10.0) return "#75B360";
  else if (temp >= 10.0 && temp < 15.0) return "#C9D968";
  else if (temp >= 15.0 && temp < 20.0) return "#F5EE61";
  else if (temp >= 20.0 && temp < 25.0) return "#F7D65C";
  else if (temp >= 25.0 && temp < 30.0) return "#EDA84F";
  else if (temp >= 30.0 && temp < 35.0) return "#E37947";
  else if (temp >= 35.0) return "#DC4B42";
  else return "#FFFFFF";
};
