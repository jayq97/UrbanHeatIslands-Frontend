import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectDistrict = ({ district, setDistrict }) => {
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
          value={district}
          label="Bezirk"
          onChange={handleChange}
        >
          <MenuItem value="all">Alle Bezirke</MenuItem>
          <MenuItem value="1">Innere Stadt</MenuItem>
          <MenuItem value="2">Leopoldstadt</MenuItem>
          <MenuItem value="3">Landstraße</MenuItem>
          <MenuItem value="4">Wieden</MenuItem>
          <MenuItem value="5">Margareten</MenuItem>
          <MenuItem value="6">Mariahilf</MenuItem>
          <MenuItem value="7">Neubau</MenuItem>
          <MenuItem value="8">Josefstadt</MenuItem>
          <MenuItem value="9">Alsergrund</MenuItem>
          <MenuItem value="10">Favoriten</MenuItem>
          <MenuItem value="11">Simmering</MenuItem>
          <MenuItem value="12">Meidling</MenuItem>
          <MenuItem value="13">Hietzing</MenuItem>
          <MenuItem value="14">Penzing</MenuItem>
          <MenuItem value="15">Rudolfsheim-Fünfhaus</MenuItem>
          <MenuItem value="16">Ottakring</MenuItem>
          <MenuItem value="17">Hernals</MenuItem>
          <MenuItem value="18">Währing</MenuItem>
          <MenuItem value="19">Döbling</MenuItem>
          <MenuItem value="20">Brigittenau</MenuItem>
          <MenuItem value="21">Floridsdorf</MenuItem>
          <MenuItem value="22">Donaustadt</MenuItem>
          <MenuItem value="23">Liesing</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectDistrict;
