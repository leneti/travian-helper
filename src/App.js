import React, { useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { Calculate } from "@mui/icons-material";

import "./App.css";
import { Romans } from "./config/Troops";
import wood from "./img/resources/lumber_tiny.png";
import clay from "./img/resources/clay_tiny.png";
import iron from "./img/resources/iron_tiny.png";
import crop from "./img/resources/crop_small.png";

const TrainingLength = [
  0, 1, 0.9, 0.81, 0.72875, 0.65625, 0.590625, 0.53125, 0.478125, 0.430625,
  0.3875, 0.34875, 0.31375, 0.2825, 0.254375, 0.22875, 0.205625, 0.185,
  0.166875, 0.15, 0.135,
];

function App() {
  const [showCalc, setShowCalc] = useState(false);
  const [troop, setTroop] = useState("");
  const [selectedTroop, setSelectedTroop] = useState(null);
  const handleTroopChange = (event) => {
    const troopName = event.target.value;
    setTroop(troopName);
    setSelectedTroop(Romans.find((t) => t.name === troopName));
    setShowCalc(false);
  };

  const [cavalry, setCavalry] = useState("");
  const [selectedCavalry, setSelectedCavalry] = useState(null);
  const handleCavalryChange = (event) => {
    const troopName = event.target.value;
    setCavalry(troopName);
    setSelectedCavalry(Romans.find((t) => t.name === troopName));
    setShowCalc(false);
  };

  const [siege, setSiege] = useState("");
  const [selectedSiege, setSelectedSiege] = useState(null);
  const handleSiegeChange = (event) => {
    const troopName = event.target.value;
    setSiege(troopName);
    setSelectedSiege(Romans.find((t) => t.name === troopName));
    setShowCalc(false);
  };

  const [barracksLevel, setBarracksLevel] = useState(0);
  const handleBLChange = (event) => {
    setBarracksLevel(event.target.value);
    setShowCalc(false);
  };

  const [stableLevel, setStableLevel] = useState(0);
  const handleSLChange = (event) => {
    setStableLevel(event.target.value);
    setShowCalc(false);
  };

  const [workshopLevel, setWorkshopLevel] = useState(0);
  const handleWLChange = (event) => {
    setWorkshopLevel(event.target.value);
    setShowCalc(false);
  };

  const [totalResources, setTotalResources] = useState(0);
  const [reserve, setReserve] = useState({
    wood: 0,
    clay: 0,
    iron: 0,
    crop: 0,
  });

  const HeaderCells = () => (
    <>
      <Grid item xs={10} />
      <Grid item xs={2}>
        <img src={wood} alt="lumber resource" />
      </Grid>
      <Grid item xs={2}>
        <img src={clay} alt="clay resource" />
      </Grid>
      <Grid item xs={2}>
        <img src={iron} alt="iron resource" />
      </Grid>
      <Grid item xs={2}>
        <img src={crop} alt="crop resource" />
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

  const [calculation, setCalculation] = useState(null);

  const calculateNPC = () => {
    let freeResources =
      totalResources -
      reserve.wood -
      reserve.clay -
      reserve.iron -
      reserve.crop;

    let usedResources = 0;

    let costArr = [
      {
        type: "inf",
        cost: selectedTroop?.cost?.total ?? Infinity,
        time: Math.ceil(
          TrainingLength[barracksLevel] *
            (selectedTroop?.training_duration ?? 0)
        ),
        res: selectedTroop?.cost,
      },
      {
        type: "cav",
        cost: selectedCavalry?.cost?.total ?? Infinity,
        time: Math.ceil(
          TrainingLength[stableLevel] *
            (selectedCavalry?.training_duration ?? 0)
        ),
        res: selectedCavalry?.cost,
      },
      {
        type: "siege",
        cost: selectedSiege?.cost?.total ?? Infinity,
        time: Math.ceil(
          TrainingLength[workshopLevel] *
            (selectedSiege?.training_duration ?? 0)
        ),
        res: selectedSiege?.cost,
      },
    ];
    costArr = costArr.filter((t) => t.cost !== Infinity);
    costArr.sort((a, b) => a.cost - b.cost);

    let totalTime = {
      inf: 0,
      cav: 0,
      siege: 0,
    };
    let totalTroops = {
      inf: 0,
      cav: 0,
      siege: 0,
    };
    let npcResult = { ...reserve };

    while (costArr[0].cost + usedResources <= freeResources) {
      usedResources += costArr[0].cost;
      totalTime[costArr[0].type] += costArr[0].time;
      totalTroops[costArr[0].type]++;

      if (
        costArr[1] === undefined ||
        costArr[1].cost + usedResources > freeResources ||
        costArr[1].time + totalTime[costArr[1].type] >
          totalTime[costArr[0].type]
      )
        continue;

      usedResources += costArr[1].cost;
      totalTime[costArr[1].type] += costArr[1].time;
      totalTroops[costArr[1].type]++;

      if (
        costArr[2] === undefined ||
        costArr[2].cost + usedResources > freeResources ||
        costArr[2].time + totalTime[costArr[2].type] >
          totalTime[costArr[1].type]
      )
        continue;

      usedResources += costArr[2]?.cost;
      totalTime[costArr[2].type] += costArr[2].time;
      totalTroops[costArr[2].type]++;
    }

    for (let i = 0; i < costArr.length; i++) {
      npcResult.wood +=
        totalTroops[costArr[i].type] * (costArr[i].res.wood ?? 0);
      npcResult.clay +=
        totalTroops[costArr[i].type] * (costArr[i].res.clay ?? 0);
      npcResult.iron +=
        totalTroops[costArr[i].type] * (costArr[i].res.iron ?? 0);
      npcResult.crop +=
        totalTroops[costArr[i].type] * (costArr[i].res.crop ?? 0);
    }

    if (usedResources < freeResources) {
      let thirdOfExcess = Math.floor((freeResources - usedResources) / 3);
      npcResult.wood += thirdOfExcess;
      npcResult.clay += thirdOfExcess;
      npcResult.iron += thirdOfExcess;
    }

    console.log("Troops to be made: ", totalTroops);
    console.log("Troop training duration: ", totalTime);
    console.log("Suggested NPC exchange: ", npcResult);
    setCalculation({
      npcResult,
      totalTroops,
      totalTime,
      excess: Math.floor((freeResources - usedResources) / 3),
    });
    setShowCalc(true);
  };

  const getTimeFromSeconds = (seconds) => {
    if (!seconds) return;
    let date = new Date(seconds * 1000);
    return `${date.getUTCHours()}h ${date.getUTCMinutes()}m ${date.getUTCSeconds()}s`;
  };
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
              <Grid item xs={20}>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    label="Total resources"
                    variant="standard"
                    onChange={(event) => {
                      setTotalResources(event.target.value);
                      setShowCalc(false);
                    }}
                    InputProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    color="secondary"
                  />
                </Box>
              </Grid>

              {/**********************************************************************************/}

              <HeaderCells />

              {/**********************************************************************************/}

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

              {/**********************************************************************************/}

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

              {/**********************************************************************************/}

              <LabelCell label="Reserve" mt={1.5} xs={2} />
              <Grid item xs={3}>
                <TextField
                  id="standard-basic"
                  label="Wood"
                  variant="standard"
                  InputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  color="secondary"
                  value={reserve.wood}
                  onChange={(event) => {
                    setReserve((p) => ({
                      ...p,
                      wood: parseInt(event.target.value)
                        ? parseInt(event.target.value)
                        : 0,
                    }));
                    setShowCalc(false);
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="standard-basic"
                  label="Clay"
                  variant="standard"
                  InputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  color="secondary"
                  value={reserve.clay}
                  onChange={(event) => {
                    setReserve((p) => ({
                      ...p,
                      clay: parseInt(event.target.value)
                        ? parseInt(event.target.value)
                        : 0,
                    }));
                    setShowCalc(false);
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="standard-basic"
                  label="Iron"
                  variant="standard"
                  InputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  color="secondary"
                  value={reserve.iron}
                  onChange={(event) => {
                    setReserve((p) => ({
                      ...p,
                      iron: parseInt(event.target.value)
                        ? parseInt(event.target.value)
                        : 0,
                    }));
                    setShowCalc(false);
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="standard-basic"
                  label="Crop"
                  variant="standard"
                  InputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  color="secondary"
                  value={reserve.crop}
                  onChange={(event) => {
                    setReserve((p) => ({
                      ...p,
                      crop: parseInt(event.target.value)
                        ? parseInt(event.target.value)
                        : 0,
                    }));
                    setShowCalc(false);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<Calculate />}
                  onClick={calculateNPC}
                >
                  Calculate
                </Button>
              </Grid>

              {/**********************************************************************************/}
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            display: showCalc ? undefined : "none",
            width: "65vw",
            height:
              [selectedTroop, selectedCavalry, selectedSiege].filter(Boolean)
                .length === 3
                ? "31vh"
                : [selectedTroop, selectedCavalry, selectedSiege].filter(
                    Boolean
                  ).length === 2
                ? "26vh"
                : "21vh",
            border: 1,
            borderColor: "grey.500",
            borderRadius: 5,
            padding: 4,
            my: 3,
          }}
        >
          <Box sx={{ flexGrow: 1, overflow: "auto", whiteSpace: "nowrap" }}>
            <Grid container spacing={2} columns={20} width={"65vw"}>
              <LabelCell label="Build plan" />
              <Grid
                item
                xs={16}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {!!selectedTroop && barracksLevel > 0 && (
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <img src={selectedTroop.img} alt="Selected Troop icon" />
                    <Typography ml={1} variant="body1" fontWeight="bold">
                      {calculation?.totalTroops?.inf}
                    </Typography>
                    <Typography
                      ml={1}
                      variant="body1"
                      sx={{ color: "grey.500" }}
                    >
                      Build time:{" "}
                      {getTimeFromSeconds(calculation?.totalTime?.inf)}
                    </Typography>
                  </Box>
                )}
                {!!selectedCavalry && stableLevel > 0 && (
                  <Box sx={{ display: "flex", flexDirection: "row" }} my={1}>
                    <img src={selectedCavalry.img} alt="Selected Troop icon" />
                    <Typography ml={1} variant="body1" fontWeight="bold">
                      {calculation?.totalTroops?.cav}
                    </Typography>
                    <Typography
                      ml={1}
                      variant="body1"
                      sx={{ color: "grey.500" }}
                    >
                      Build time:{" "}
                      {getTimeFromSeconds(calculation?.totalTime?.cav)}
                    </Typography>
                  </Box>
                )}
                {!!selectedSiege && workshopLevel > 0 && (
                  <Box sx={{ display: "flex", flexDirection: "row" }} my={1}>
                    <img src={selectedSiege.img} alt="Selected Troop icon" />
                    <Typography ml={1} variant="body1" fontWeight="bold">
                      {calculation?.totalTroops?.siege}
                    </Typography>
                    <Typography
                      ml={1}
                      variant="body1"
                      sx={{ color: "grey.500" }}
                    >
                      Build time:{" "}
                      {getTimeFromSeconds(calculation?.totalTime?.siege)}
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/**********************************************************************************/}

              <LabelCell label="Resource consumption" />
              <Grid
                item
                xs={16}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={wood} alt="Wood" />
                  <Typography ml={1} variant="body1" sx={{ color: "grey.500" }}>
                    {calculation?.npcResult.wood - calculation?.excess}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={clay} alt="Clay" />
                  <Typography ml={1} variant="body1" sx={{ color: "grey.500" }}>
                    {calculation?.npcResult.clay - calculation?.excess}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={iron} alt="Iron" />
                  <Typography ml={1} variant="body1" sx={{ color: "grey.500" }}>
                    {calculation?.npcResult.iron - calculation?.excess}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={crop} alt="Crop" />
                  <Typography ml={1} variant="body1" sx={{ color: "grey.500" }}>
                    {calculation?.npcResult.crop - calculation?.excess}
                  </Typography>
                </Box>
              </Grid>

              {/**********************************************************************************/}

              <LabelCell label="Excess resources" />
              <Grid
                item
                xs={16}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={wood} alt="Wood" />
                  <Typography ml={1} variant="body1" sx={{ color: "grey.500" }}>
                    {calculation?.excess}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={clay} alt="Clay" />
                  <Typography ml={1} variant="body1" sx={{ color: "grey.500" }}>
                    {calculation?.excess}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={iron} alt="Iron" />
                  <Typography ml={1} variant="body1" sx={{ color: "grey.500" }}>
                    {calculation?.excess}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={crop} alt="Crop" />
                  <Typography ml={1} variant="body1" sx={{ color: "grey.500" }}>
                    0
                  </Typography>
                </Box>
              </Grid>

              {/**********************************************************************************/}

              <LabelCell label="Suggested NPC exchange" />
              <Grid
                item
                xs={16}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={wood} alt="Wood" />
                  <Typography
                    ml={1}
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "greenyellow" }}
                  >
                    {calculation?.npcResult.wood}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={clay} alt="Clay" />
                  <Typography
                    ml={1}
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "greenyellow" }}
                  >
                    {calculation?.npcResult.clay}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={iron} alt="Iron" />
                  <Typography
                    ml={1}
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "greenyellow" }}
                  >
                    {calculation?.npcResult.iron}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "15px",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <img src={crop} alt="Crop" />
                  <Typography
                    ml={1}
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "greenyellow" }}
                  >
                    {calculation?.npcResult.crop}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default App;
