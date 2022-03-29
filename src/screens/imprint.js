import React from "react";

const Imprint = () => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Impressum</h1>
      <h3>Angaben gemäß § 5 TMG</h3>
      <p>
        <br />
        FH-Technikum Wien
        <br />
        Höchstädtplatz 6<br />
        1200 Wien
        <br />
        Österreich
      </p>
      <h3>Kontakt & Redaktioneller Verantwortlicher</h3>
      <p>
        <br />
        FH-Technikum Wien:{" "}
        <a href="mailto:if20b144@technikum-wien.at">info@technikum-wien.at</a>
        <br />
      </p>
      <br />
      <h3>Verbraucherstreitbeilegung/ Universalschlichtungsstelle</h3>
      <p>
        <br />
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>
  );
};

export default Imprint;
