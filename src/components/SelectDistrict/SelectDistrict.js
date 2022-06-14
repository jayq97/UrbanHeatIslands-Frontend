import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/* 
  SelectDistrict hat zwei Parameter,
  - district: der Zustandswert
  - setDistrict: die Funktion, welche den Zustand verändert
*/
const SelectDistrict = ({ district, setDistrict }) => {
  /* 
    Vom Select-Komponente wird die Event-Value geholt und 
    diese im setDistrict() übergeben (Der Zustandswert vom Bezirk wird geändert)
  */
  const handleChange = (event) => {
    setDistrict(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Bezirk</InputLabel>
        <Select
          labelId="district-select-label"
          id="district-select"
          // Daweil ausgewählter Bezirk
          value={district}
          label="Bezirk"
          // Sobald der Wert geändert wird, wird handleChange() ausgeführt
          onChange={handleChange}
        >
          <MenuItem disabled>Wähle ein Bezirk</MenuItem>
          <MenuItem value="all" style={{ fontWeight: "bold" }}>
            Alle Bezirke
          </MenuItem>
          <MenuItem value="1">(1) Innere Stadt</MenuItem>
          <MenuItem value="2">(2) Leopoldstadt</MenuItem>
          <MenuItem value="3">(3) Landstraße</MenuItem>
          <MenuItem value="4">(4) Wieden</MenuItem>
          <MenuItem value="5">(5) Margareten</MenuItem>
          <MenuItem value="6">(6) Mariahilf</MenuItem>
          <MenuItem value="7">(7) Neubau</MenuItem>
          <MenuItem value="8">(8) Josefstadt</MenuItem>
          <MenuItem value="9">(9) Alsergrund</MenuItem>
          <MenuItem value="10">(10) Favoriten</MenuItem>
          <MenuItem value="11">(11) Simmering</MenuItem>
          <MenuItem value="12">(12) Meidling</MenuItem>
          <MenuItem value="13">(13) Hietzing</MenuItem>
          <MenuItem value="14">(14) Penzing</MenuItem>
          <MenuItem value="15">(15) Rudolfsheim-Fünfhaus</MenuItem>
          <MenuItem value="16">(16) Ottakring</MenuItem>
          <MenuItem value="17">(17) Hernals</MenuItem>
          <MenuItem value="18">(18) Währing</MenuItem>
          <MenuItem value="19">(19) Döbling</MenuItem>
          <MenuItem value="20">(20) Brigittenau</MenuItem>
          <MenuItem value="21">(21) Floridsdorf</MenuItem>
          <MenuItem value="22">(22) Donaustadt</MenuItem>
          <MenuItem value="23">(23) Liesing</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectDistrict;
