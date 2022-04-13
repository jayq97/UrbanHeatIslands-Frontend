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

//import { Icon } from "leaflet";

import useSwr from "swr";
import L from "leaflet";
import gew1 from "../data/gew1.json"; //später durch api aufruf ersetzen
import gew2 from "../data/gew2.json"; //später durch api aufruf ersetzen
import bezirke from "../data/bezirke.json"; //später durch api aufruf ersetzen
import ggruen from "../data/gruenGuertel.json"; //später durch api aufruf ersetzen
import ogruen from "../data/oeffentlichGruen.json"; //später durch api aufruf ersetzen
import {
  MarkerLower10,
  Marker10to20,
  Marker20to30,
  MarkerGreater30,
  MarkerNoTemp,
} from "./MapMarkerElements";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const Map = ({ district }) => {
  var center = [48.210033, 16.363449];
  //var url = "http://localhost:8000/getData/" + district;
  var url = "https://uhi.w3.cs.technikum-wien.at/nodejs/getData/" + district;
  const { data: stationData, error: stationError } = useSwr(url, { fetcher });
  const stations = stationData && !stationError ? stationData : [];

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={true}>
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
        <LayersControl.Overlay checked name="Heat Islands">
          <LayerGroup>
            {stations.map((station) =>
              station.lat &&
              station.lon &&
              district !== 0 &&
              (station.temp !== null ||
                station.windspeed !== null ||
                station.pressure !== null) ? (
                <Circle
                  center={[station.lat, station.lon]}
                  fillColor={
                    station.temp < 10 && station.temp !== null
                      ? "#1E90FF"
                      : station.temp >= 10 && station.temp < 20
                      ? "#FF8C69"
                      : station.temp >= 20 && station.temp < 30
                      ? "#FF3030"
                      : station.temp > 30
                      ? "#8B1A1A"
                      : ""
                  }
                  color={
                    station.temp < 10 && station.temp !== null
                      ? "#1E90FF"
                      : station.temp >= 10 && station.temp < 20
                      ? "#FF8C69"
                      : station.temp >= 20 && station.temp < 30
                      ? "#FF3030"
                      : station.temp > 30
                      ? "#8B1A1A"
                      : ""
                  }
                  radius={20 * station.temp}
                >
                  <Popup position={[station.lat, station.lon]} width="auto">
                    <div>
                      <h1>{station.neighborhood}</h1>
                      <h2>{station.station_id}</h2>
                      {station.windspeed !== null ? (
                        <p>Windgeschwindigkeit: {station.windspeed} km/h</p>
                      ) : (
                        ""
                      )}
                      {station.pressure !== null ? (
                        <p>Luftdruck: {station.pressure} mbar</p>
                      ) : (
                        ""
                      )}
                      {station.temp !== null ? (
                        <p>Temperatur: {station.temp} °C</p>
                      ) : (
                        ""
                      )}
                      {/*
                    Feuchtigkeit platzhalter station.windspeed !== null ? (
                      <p>Feuchtigkeit: {station.windspeed} %</p>
                    ) : (
                      ""
                    )
                  */}
                      {/*
                    Datum platzhalter station.windspeed !== null ? (
                      <p class="font">
                        Zuletzt aktualisiert am: {station.windspeed} %
                      </p>
                    ) : (
                      ""
                    )
                  */}
                    </div>
                  </Popup>
                </Circle>
              ) : (
                ""
              )
            )}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Gewässerkarte">
          <LayerGroup>
            <GeoJSON data={gew1} />
            <GeoJSON data={gew2} />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Bezirksgrenzen">
          <GeoJSON data={bezirke} style={{ color: "purple" }} />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Grüngürtel">
          <LayerGroup>
            <GeoJSON data={ggruen} style={{ color: "green" }} />
            <GeoJSON data={ogruen} style={{ color: "green" }} />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      {stations.map((station) =>
        station.lat &&
        station.lon &&
        district !== 0 &&
        (station.temp !== null ||
          station.windspeed !== null ||
          station.pressure !== null) ? (
          <Marker
            key={station.station_id}
            position={[station.lat, station.lon]}
            icon={L.divIcon({
              iconAnchor: [0, 24],
              labelAnchor: [-6, 0],
              popupAnchor: [0, -36],
              html: `<h2 style="${
                station.temp < 10 && station.temp !== null
                  ? MarkerLower10
                  : station.temp >= 10 && station.temp < 20
                  ? Marker10to20
                  : station.temp >= 20 && station.temp < 30
                  ? Marker20to30
                  : station.temp > 30
                  ? MarkerGreater30
                  : MarkerNoTemp
              }" />${
                station.temp !== null ? Math.round(station.temp) : ""
              }</h2>`,
            })}
          >
            <Popup position={[station.lat, station.lon]} width="auto">
              <div>
                <h1>{station.neighborhood}</h1>
                <h2>{station.station_id}</h2>
                {station.windspeed !== null ? (
                  <p>Windgeschwindigkeit: {station.windspeed} km/h</p>
                ) : (
                  ""
                )}
                {station.pressure !== null ? (
                  <p>Luftdruck: {station.pressure} mbar</p>
                ) : (
                  ""
                )}
                {station.temp !== null ? (
                  <p>Temperatur: {station.temp} °C</p>
                ) : (
                  ""
                )}
                {/*
                  Feuchtigkeit platzhalter station.windspeed !== null ? (
                    <p>Feuchtigkeit: {station.windspeed} %</p>
                  ) : (
                    ""
                  )
                */}
                {/*
                  Datum platzhalter station.windspeed !== null ? (
                    <p class="font">
                      Zuletzt aktualisiert am: {station.windspeed} %
                    </p>
                  ) : (
                    ""
                  )
                */}
              </div>
            </Popup>
          </Marker>
        ) : (
          ""
        )
      )}
    </MapContainer>
  );
};

export default Map;
