import "./Map.css";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, GeoJSON } from "react-leaflet";
//import { Icon } from "leaflet";
import useSwr from "swr";
//import L from "leaflet";
import gew1 from "../data/gew1.json"; //später durch api aufruf ersetzen
import gew2 from "../data/gew2.json"; //später durch api aufruf ersetzen
import bezirke from "../data/bezirke.json"; //später durch api aufruf ersetzen
import ggruen from "../data/gruenGuertel.json"; //später durch api aufruf ersetzen
import ogruen from "../data/oeffentlichGruen.json"; //später durch api aufruf ersetzen

const fetcher = (...args) => fetch(...args).then(response => response.json());

const Map = ({ district }) => {
  
  var center = [48.210033, 16.363449];
  var url = "https://uhi.w3.cs.technikum-wien.at/nodejs/getData/" + district;
  const {data, error} = useSwr(url, {fetcher});
  const stations = data && !error ? data : [];

  return (
    
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
          <LayersControl.Overlay name="Heat map">
          </LayersControl.Overlay>
          <LayersControl.Overlay  name="Gewässerkarte">
            <LayerGroup>
              <GeoJSON data={gew1}/>
              <GeoJSON data={gew2}/>
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay  name="Heatmap">
  
          </LayersControl.Overlay>
          <LayersControl.Overlay  name="Bezirksgrenzen">
            <GeoJSON data={bezirke} style={{ color: 'purple' }}/>
          </LayersControl.Overlay>
          <LayersControl.Overlay  name="Grüngürtel">
            <LayerGroup>
              <GeoJSON data={ggruen} style={{ color: 'green' }}/>
              <GeoJSON data={ogruen} style={{ color: 'green' }}/>
            </LayerGroup> 
          </LayersControl.Overlay>
        </LayersControl>
        {stations.map(station => (station.lat && station.lon && district !== 0 ? 
          <Marker 
            key={station.station_id} position={[station.lat, station.lon]}
          >
            <Popup position={[station.lat, station.lon]}>
              <div>
                <h1>{station.neighborhood}</h1>
                <h2>{station.station_id}</h2>
                <p>Windgeschwindigkeit: {station.windspeed} km/h </p>
                <p>Luftdruck: {station.pressure} </p>
                <p>Temperatur: {station.temp} °C </p>
              </div>
            </Popup>
          </Marker>
          : ""))}
        </MapContainer>
  );
};

export default Map;
