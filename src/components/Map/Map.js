import "./Map.css";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, Polygon } from "react-leaflet";
import { Icon } from "leaflet";
import L from "leaflet";
import gew1 from "../data/gew1.json";
import gew2 from "../data/gew2.json";
//import * as weatherStation from ""; Wetterstationen importieren

const Map = ({ state }) => {
  let styleState;

  var center = [48.210033, 16.363449];

  switch (state) {
    case "Normal":
      break;
    case "Heat":
      styleState = "red";
      break;
    case "GreenArea":
      styleState = "green";
      break;
    case "WaterArea":
      styleState = "blue";
      break;
      default:
        break;
  }

  return (
    <div className="mapColor" style={{ backgroundColor: styleState }}>
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={true}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Show normal map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Show map in black and white">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Show weather-stations">
            <Marker position={center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Layer group with circles">
            
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default Map;
