import "./Map.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  GeoJSON,
  Circle,
} from "react-leaflet";

import React from "react";
import { useState } from "react";

import useSwr from "swr";
import L from "leaflet";

import Gew1 from "../../data/gewässer/FLIESSGEWOGD.json";
import Gew2 from "../../data/gewässer/STEHENDEGEWOGD.json";

import Grün1 from "../../data/grünflächen/GRUENFREIFLOGD_GRUENGEWOGD.json";
import Grün2 from "../../data/grünflächen/OEFFGRUENFLOGD.json";

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
  MarkerLower10,
  Marker10to20,
  Marker20to30,
  MarkerGreater30,
  MarkerNoTemp,
} from "./MapMarkerElements";

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
  const stations = Station(district);

  return (
    <MapContainer
      center={[48.210033, 16.363449]}
      zoom={14}
      scrollWheelZoom={true}
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
        <LayersControl.Overlay checked name="Bezirksgrenzen">
          <LayerGroup>{district ? renderGeoJSON(district) : ""}</LayerGroup>
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

      {district
        ? stations
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
            .map((station) => (
              <Marker
                key={station.station_id}
                position={[station.lat, station.lon]}
                icon={L.divIcon({
                  iconAnchor: [0, 24],
                  labelAnchor: [-6, 0],
                  popupAnchor: [0, -36],
                  html: `<h2 style="${
                    station.temp < 10
                      ? MarkerLower10
                      : station.temp >= 10 && station.temp < 20
                      ? Marker10to20
                      : station.temp >= 20 && station.temp < 30
                      ? Marker20to30
                      : station.temp >= 30
                      ? MarkerGreater30
                      : MarkerNoTemp
                  }" />${
                    station.temp !== null ? Math.trunc(station.temp) : ""
                  }</h2>`,
                })}
              >
                <Popup position={[station.lat, station.lon]} width="auto">
                  <div>
                    <h1>{station.neighborhood}</h1>
                    <h2>{station.station_id}</h2>
                    <p>Temperatur: {station.temp} °C</p>
                    <p>Feuchtigkeit: {station.humidity} %</p>
                    <p>Windgeschwindigkeit: {station.windspeed} km/h</p>
                    <p>Luftdruck: {station.pressure} mbar</p>
                    <p class="font">
                      Zuletzt aktualisiert am:{" "}
                      {Moment(station.time).format("LLLL")}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))
        : ""}
    </MapContainer>
  );
};

export default Map;

const renderGeoJSON = (district) => {
  var MinTempArray = [];
  var MaxTempArray = [];
  var AvgTempArray = [];

  for (var i = 0; i <= 22; i++) {
    const stations = Station(i + 1);

    var temp = stations
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
      .map((station) => parseFloat(station.temp));

    MinTempArray.push(Math.min(...temp));
    MaxTempArray.push(Math.max(...temp));

    var sum = temp.reduce((a, b) => a + b, 0);
    var avg = sum / temp.length || 0;

    AvgTempArray.push(parseFloat(avg.toFixed(2)));
  }

  var GeoJSONOutput = [];

  if (district === "all") {
    for (var j = 0; j <= 22; j++) {
      GeoJSONOutput.push(
        <GeoJSON
          key={j + 1}
          data={GeoJSONDataArray[j]}
          color={
            AvgTempArray[j] < 10.0
              ? "#1E90FF"
              : AvgTempArray[j] >= 10.0 && AvgTempArray[j] < 20.0
              ? "#FFFF00"
              : AvgTempArray[j] >= 20.0 && AvgTempArray[j] < 30.0
              ? "#FF3030"
              : AvgTempArray[j] >= 30.0
              ? "#8B1A1A"
              : ""
          }
        >
          <Popup width="auto">
            <div>
              <h1>{DistrictNameArray[j]}</h1>
              <h4>Avg. Temperatur: {AvgTempArray[j]} °C</h4>
              <h4>Min. Temperatur: {MinTempArray[j]} °C</h4>
              <h4>Max. Temperatur: {MaxTempArray[j]} °C</h4>
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
        color={
          AvgTempArray[parseInt(district) - 1] < 10.0
            ? "#1E90FF"
            : AvgTempArray[parseInt(district) - 1] >= 10.0 &&
              AvgTempArray[parseInt(district) - 1] < 20.0
            ? "#FFFF00"
            : AvgTempArray[parseInt(district) - 1] >= 20.0 &&
              AvgTempArray[parseInt(district) - 1] < 30.0
            ? "#FF3030"
            : AvgTempArray[parseInt(district) - 1] >= 30.0
            ? "#8B1A1A"
            : ""
        }
      >
        <Popup width="auto">
          <div>
            <h1>{DistrictNameArray[parseInt(district) - 1]}</h1>
            <h4>Avg. Temperatur: {AvgTempArray[parseInt(district) - 1]} °C</h4>
            <h4>Min. Temperatur: {MinTempArray[parseInt(district) - 1]} °C</h4>
            <h4>Max. Temperatur: {MaxTempArray[parseInt(district) - 1]} °C</h4>
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
