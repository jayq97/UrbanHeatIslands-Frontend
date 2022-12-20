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
      text: "Durchschnitt in den letzten 14 Tagen",
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
      text: "Durchschnitt in den letzten 14 Tagen",
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
        text: "Luftdruck (hPa)",
      },
    },
  },
};

const Data1 = (stations: Array<any>) => {
  return {
    labels: Object.keys(stations).slice(
      Math.max(Object.keys(stations).length - 14, 1)
    ),
    datasets: [
      {
        label: "Temperatur (°C)",
        data: Object.values(groupAverageData(stations, "temp")).slice(
          Math.max(Object.values(stations).length - 14, 1)
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
        tension: 0.5,
      },
      {
        label: "Feuchtigkeit (%)",
        data: Object.values(groupAverageData(stations, "humidity")).slice(
          Math.max(Object.values(stations).length - 14, 1)
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
        tension: 0.5,
      },
    ],
  };
};

const Data2 = (stations: Array<any>) => {
  return {
    labels: Object.keys(stations).slice(
      Math.max(Object.keys(stations).length - 14, 1)
    ),
    datasets: [
      {
        label: "Windgeschwindigkeit (km/h)",
        data: Object.values(groupAverageData(stations, "windspeed")).slice(
          Math.max(Object.values(stations).length - 14, 1)
        ),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        yAxisID: "y2",
        tension: 0.5,
      },
      {
        label: "Luftdruck (hPa)",
        data: Object.values(groupAverageData(stations, "pressure")).slice(
          Math.max(Object.values(stations).length - 14, 1)
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y3",
        tension: 0.5,
      },
    ],
  };
};

const groupData = (array: any) => {
  return array.reduce((memo: any, item: any) => {
    if (!memo[item.timeString]) {
      memo[item.timeString] = {
        temp: 0,
        humidity: 0,
        windspeed: 0,
        pressure: 0,
        count: 0,
      };
    }

    memo[item.timeString].temp += Number(item.temp);
    memo[item.timeString].humidity += Number(item.humidity);
    memo[item.timeString].windspeed += Number(item.windspeed);
    memo[item.timeString].pressure += Number(item.pressure);
    memo[item.timeString].count += 1;
    return memo;
  }, {});
};

const groupAverageData = (array: any, element: any) => {
  return Object.keys(array).reduce(function (memo: any, key: any) {
    if (element === "temp") {
      memo[key] = array[key].temp / array[key].count;
    } else if (element === "humidity") {
      memo[key] = array[key].humidity / array[key].count;
    } else if (element === "windspeed") {
      memo[key] = array[key].windspeed / array[key].count;
    } else {
      memo[key] = array[key].pressure / array[key].count;
    }
    return memo;
  }, {});
};

const timeStringFunction = (time: any) => {
  var date = new Date(time);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  var hh = date.getHours();
  return dd + "." + mm + "." + yyyy;
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
    .sort(function (a: any, b: any) {
      return a.time.localeCompare(b.time);
    })
    .map((obj: any) => ({
      ...obj,
      timeString: timeStringFunction(obj.time),
    }));

  let array = groupData(stations);

  return (
    <div
      style={{
        textAlign: "left",
      }}
      className="container"
    >
      <h1>Wetterdaten in Wien</h1>
      <h2 style={{ textAlign: "center" }}>Temperatur & Feuchtigkeit</h2>
      <Line options={options1} data={Data1(array)} />
      <br />
      <br />
      <br />
      <h2 style={{ textAlign: "center" }}>Windgeschwindigkeit & Luftdruck</h2>
      <Line options={options2} data={Data2(array)} />
    </div>
  );
};

export default WeatherData;
