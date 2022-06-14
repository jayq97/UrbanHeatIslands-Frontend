import React from "react";
import Map from "../components/Map/Map";
import SelectDistrict from "../components/SelectDistrict/SelectDistrict";
import Sources from "../components/Sources/Sources";
import TemperatureData from "../components/TemperatureData/TemperatureData";
import { useEffect, useState } from "react";

// Die Startseite beinhaltet die Map mit der zugehörigen Heatmap und die Temperaturdaten

const Home = () => {
  // Der Bezirk wird als Zustand deklariert (useState: wenn der Wert geändert wird,
  // aktualisiert sich der Bezirk auch auf der Website) und wird beim Konstruieren
  // anfangs auf "loading" gesetzt (nach einer Sekunde wird der Bezirk von "loading" auf "all" gesetzt).
  const [district, setDistrict] = useState("loading");

  // useEffect: Timer, Logging und andere "side effects" sind in der Regel
  // im Main-Funktionskomponente nicht zulässig. Die Funktion setTimeOut wird
  // im Hintergrund laufen.
  useEffect(() => {
    const timer = setTimeout(() => {
      // Die Funktion setTimeOut läuft im Hintergrund.
      setDistrict("all"); // Der Bezirk wird auf "all" gesetzt (es werden alle Bezirke angezeigt)
    }, 1000); // Nachdem 1 Sekunde vergangen ist.
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Urban Heat Islands</h1>
        <h3>Wien</h3>
      </header>
      <div className="customContainer">
        {district && <Map district={district} />}{" "}
        {/* Wenn der Wert des Bezirkes legitim ist, wird die Map-Komponente angezeigt. */}
        <div className="subContainer">
          {district !== "loading" ? ( // Wenn der Wert nicht "loading" ist, werden die Temperaturdaten des jeweiligen Bezirkes angezeigt.
            <>
              <h2>Temperaturdaten in:</h2> {}
              <br />
              {/* SelectBox für Bezirke */}
              <SelectDistrict
                district={district}
                setDistrict={setDistrict}
              />{" "}
              {/* Temperaturdaten für Bezirke */}
              <TemperatureData district={district} /> <br />
              {/* GeoJSON-Quellen */}
              <Sources />
            </>
          ) : (
            /* ansonsten wird der Header "Wird geladen..."  angezeigt */ <h1>
              Wird geladen...
            </h1>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
