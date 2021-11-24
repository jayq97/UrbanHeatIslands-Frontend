import "./Map.css";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
//import * as weatherStation from ""; Wetterstation

const Map = ({ state }) => {
  let styleState;

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
  }

  return (
    <div className="mapColor" style={{ backgroundColor: styleState }}>
      <MapContainer
        center={[48.210033, 16.363449]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          style={{ backgroundColor: styleState }}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
