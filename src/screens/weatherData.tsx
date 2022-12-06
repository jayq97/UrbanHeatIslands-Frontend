import React from "react";
import useSwr from "swr";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

// Wetterstationen werden vom Backend geholt
const Station = () => {
  let url = "http://localhost:8000/gethistory";
  /* Mit useSwr erhalten die Komponenten (stationData) konstant einen Stream von Daten 
  und die Benutzeroberfläche wird immer aktualisiert. */
  const { data: stationData, error: stationError } = useSwr(url, { fetcher });
  return stationData && !stationError ? stationData : []; // Falls die Daten nicht vorhanden sind, wird ein leeres Array zurückgegeben
};

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: true,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
    y2: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
    y3: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const Data = (stations: Array<any>) => {
  return {
    labels: [
      ...new Set(
        stations.map((station: any) => {
          var date = new Date(station.time);
          var dd = date.getDate();
          var mm = date.getMonth();
          var yyyy = date.getFullYear();
          var hours = date.getHours();
          return dd + "." + mm + "." + yyyy + " " + hours + "Uhr";
        })
      ),
    ],
    datasets: [
      {
        label: "Temperatur (°C)",
        data: stations.map((item: any) => item.temp),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Feuchtigkeit (%)",
        data: stations.map((item: any) => item.humidity),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Windgeschwindigkeit (km/h)",
        data: stations.map((item: any) => item.windspeed),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        yAxisID: "y2",
      },
      {
        label: "Luftdruck (mbar)",
        data: stations.map((item: any) => item.pressure),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y3",
      },
    ],
  };
};

const WeatherData = () => {
  const stations = Station().filter(
    (station: any) =>
      station.temp !== null &&
      station.humidity !== null &&
      station.windspeed !== null &&
      station.pressure !== null &&
      station.time !== null
  );

  return (
    <div
      style={{
        textAlign: "left",
      }}
      className="container"
    >
      <h1>Wetterdaten in Wien</h1>
      <Line options={options} data={Data(stations)} />
    </div>
  );
};

export default WeatherData;
