import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import "./App.css";
import { Romans } from "./config/Troops";

const TrainingLength = [
  0, 1, 0.9, 0.81, 0.72875, 0.65625, 0.590625, 0.53125, 0.478125, 0.430625,
  0.3875, 0.34875, 0.31375, 0.2825, 0.254375, 0.22875, 0.205625, 0.185,
  0.166875, 0.15, 0.135,
];

function App() {
  const [troop, setTroop] = useState("");
  const [selectedTroop, setSelectedTroop] = useState(null);
  const handleTroopChange = (event) => {
    const troopName = event.target.value;
    setTroop(troopName);
    setSelectedTroop(Romans.find((t) => t.name === troopName));
  };

  const [cavalry, setCavalry] = useState("");
  const [selectedCavalry, setSelectedCavalry] = useState(null);
  const handleCavalryChange = (event) => {
    const troopName = event.target.value;
    setCavalry(troopName);
    setSelectedCavalry(Romans.find((t) => t.name === troopName));
  };

  const [siege, setSiege] = useState("");
  const [selectedSiege, setSelectedSiege] = useState(null);
  const handleSiegeChange = (event) => {
    const troopName = event.target.value;
    setSiege(troopName);
    setSelectedSiege(Romans.find((t) => t.name === troopName));
  };

  const [barracksLevel, setBarracksLevel] = useState(0);
  const handleBLChange = (event) => setBarracksLevel(event.target.value);

  const [stableLevel, setStableLevel] = useState(0);
  const handleSLChange = (event) => setStableLevel(event.target.value);

  const [workshopLevel, setWorkshopLevel] = useState(0);
  const handleWLChange = (event) => setWorkshopLevel(event.target.value);

  const HeaderCells = () => (
    <>
      <Grid item xs={10} />
      <Grid item xs={2}>
        <Typography variant="body1">Wood</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">Clay</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">Iron</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">Crop</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">Time, s</Typography>
      </Grid>
    </>
  );

  const ResourceCells = ({ selectedValueState, buildingLevel }) => (
    <>
      <Grid item xs={2}>
        <Typography variant="body1">
          {selectedValueState?.cost.wood ?? 0}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">
          {selectedValueState?.cost.clay ?? 0}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">
          {selectedValueState?.cost.iron ?? 0}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">
          {selectedValueState?.cost.crop ?? 0}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">
          {Math.ceil(
            TrainingLength[buildingLevel] *
              (selectedValueState?.training_duration ?? 0)
          )}
        </Typography>
      </Grid>
    </>
  );

  const SelectionCell = ({ onChangeFn, valueState, building }) => (
    <Grid item xs={6}>
      <Select
        sx={{
          backgroundColor: "white",
          height: "38px",
          width: "100%",
        }}
        color="warning"
        value={valueState}
        onChange={onChangeFn}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Romans.filter((t) => t.building === building).map((t) => (
          <MenuItem key={t.name} value={t.name}>
            {t.name}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );

  const LabelCell = ({ label, ...props }) => (
    <Grid item xs={props.xs ?? 4} {...props}>
      <Typography fontStyle="italic" textAlign={"left"} mt={1} variant="body1">
        {label}
      </Typography>
    </Grid>
  );

  const LevelSelectCell = ({ levelState, handleFn, ...props }) => (
    <Grid item xs={props.xs ?? 4} mt={3} {...props}>
      <Select
        sx={{
          backgroundColor: "white",
          height: "38px",
          width: "100%",
        }}
        color="warning"
        value={levelState}
        onChange={handleFn}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {TrainingLength.map((_, index) => (
          <MenuItem value={index}>{index}</MenuItem>
        ))}
      </Select>
    </Grid>
  );

  return (
    <div className="App">
      <div className="App-header">
        <Typography variant="h3" component="div" gutterBottom>
          Travian Helper
        </Typography>
        <Box
          sx={{
            width: "65vw",
            height: "60vh",
            border: 1,
            borderColor: "grey.500",
            borderRadius: 5,
            padding: 4,
          }}
        >
          <Box sx={{ flexGrow: 1, overflow: "auto", whiteSpace: "nowrap" }}>
            <Grid container spacing={2} columns={20} width={"65vw"}>
              <HeaderCells />
              <LabelCell label="Barracks" />
              <SelectionCell
                onChangeFn={handleTroopChange}
                valueState={troop}
                building={"barracks"}
              />
              <ResourceCells
                selectedValueState={selectedTroop}
                buildingLevel={barracksLevel}
              />
              <LabelCell label="Stables" />
              <SelectionCell
                onChangeFn={handleCavalryChange}
                valueState={cavalry}
                building={"stables"}
              />
              <ResourceCells
                selectedValueState={selectedCavalry}
                buildingLevel={stableLevel}
              />
              <LabelCell label="Workshop" />
              <SelectionCell
                onChangeFn={handleSiegeChange}
                valueState={siege}
                building={"workshop"}
              />
              <ResourceCells
                selectedValueState={selectedSiege}
                buildingLevel={workshopLevel}
              />
              <LabelCell label="Barracks Level" mt={3} />
              <LevelSelectCell
                xs={3}
                handleFn={handleBLChange}
                levelState={barracksLevel}
              />
              <LabelCell label="Stable Level" mt={3} xs={3} />
              <LevelSelectCell
                xs={3}
                handleFn={handleSLChange}
                levelState={stableLevel}
              />
              <LabelCell label="Workshop Level" mt={3} />
              <LevelSelectCell
                xs={3}
                handleFn={handleWLChange}
                levelState={workshopLevel}
              />
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default App;
