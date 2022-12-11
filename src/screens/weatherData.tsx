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
import { getStaticContextFromError } from "@remix-run/router";

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
  let url = "https://uhi.w3.cs.technikum-wien.at/nodejs/gethistory";
  /* Mit useSwr erhalten die Komponenten (stationData) konstant einen Stream von Daten 
  und die Benutzeroberfläche wird immer aktualisiert. */
  const { data: stationData, error: stationError } = useSwr(url, { fetcher });
  return stationData && !stationError ? stationData : []; // Falls die Daten nicht vorhanden sind, wird ein leeres Array zurückgegeben
};

export const options1 = {
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
    x: {
      display: true,
      title: {
        display: true,
        text: "Zeit",
      },
    },
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: "Temperatur (°C)",
      },
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: "Feuchtigkeit (%)",
      },
    },
  },
};

export const options2 = {
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
    x: {
      display: true,
      title: {
        display: true,
        text: "Zeit",
      },
    },
    y2: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: "Windgeschwindigkeit (km/h)",
      },
    },
    y3: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: "Luftdruck (mbar)",
      },
    },
  },
};

const Data1 = (stations: Array<any>) => {
  return {
    labels: [...new Set(stations.map((station: any) => station.timeString))],
    datasets: [
      {
        label: "Temperatur (°C)",
        data: stations.map((item: any) => item.temp),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
        tension: 0.4,
      },
      {
        label: "Feuchtigkeit (%)",
        data: stations.map((item: any) => item.humidity),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
        tension: 0.4,
      },
    ],
  };
};

const Data2 = (stations: Array<any>) => {
  return {
    labels: [...new Set(stations.map((station: any) => station.timeString))],
    datasets: [
      {
        label: "Windgeschwindigkeit (km/h)",
        data: stations.map((item: any) => item.windspeed),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        yAxisID: "y2",
        tension: 0.4,
      },
      {
        label: "Luftdruck (mbar)",
        data: stations.map((item: any) => item.pressure),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y3",
        tension: 0.4,
      },
    ],
  };
};

const timeStringFunction = (obj: any) => {
  var date = new Date(obj.time);
  var dd = date.getDate();
  var mm = date.getMonth();
  var yyyy = date.getFullYear();
  var hours = date.getHours();
  return dd + "." + mm + "." + yyyy + " " + hours + " Uhr";
};

const WeatherData = () => {
  const stations = Station()
    .filter(
      (station: any) =>
        station.temp !== null &&
        station.humidity !== null &&
        station.windspeed !== null &&
        station.pressure !== null &&
        station.time !== null
    )
    .map((obj: any) => ({
      ...obj,
      timeString: timeStringFunction(obj),
    }));

  return (
    <div
      style={{
        textAlign: "left",
      }}
      className="container"
    >
      <h1>Wetterdaten in Wien</h1>
      <Line options={options1} data={Data1(stations)} />
      <Line options={options2} data={Data2(stations)} />
    </div>
  );
};

export default WeatherData;
