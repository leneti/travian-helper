import battering_ram from "../img/romans/battering_ram.png";
import equites_caesaris from "../img/romans/equites_caesaris.png";
import equites_imperatoris from "../img/romans/equites_imperatoris.png";
import equites_legati from "../img/romans/equites_legati.png";
import fire_catapult from "../img/romans/fire_catapult.png";
import imperian from "../img/romans/imperian.png";
import legionnaire from "../img/romans/legionnaire.png";
import pretorian from "../img/romans/pretorian.png";
import senator from "../img/romans/senator.png";
import settler from "../img/romans/settler.png";

export const Romans = [
  {
    name: "Legionnaire",
    cost: {
      wood: 120,
      clay: 100,
      iron: 150,
      crop: 30,
      total: 120 + 100 + 150 + 30,
    },
    stats: {
      attack: 40,
      infantry_defense: 35,
      cavalry_defense: 50,
    },
    velocity: 6,
    carry: 50,
    upkeep: 1,
    training_duration: 1600,
    building: "barracks",
    img: legionnaire,
  },
  {
    name: "Pretorian",
    cost: {
      wood: 100,
      clay: 130,
      iron: 160,
      crop: 70,
      total: 100 + 130 + 160 + 70,
    },
    stats: {
      attack: 30,
      infantry_defense: 65,
      cavalry_defense: 35,
    },
    velocity: 5,
    carry: 20,
    upkeep: 1,
    training_duration: 1760,
    building: "barracks",
    img: pretorian,
  },
  {
    name: "Imperian",
    cost: {
      wood: 150,
      clay: 160,
      iron: 210,
      crop: 80,
      total: 150 + 160 + 210 + 80,
    },
    stats: {
      attack: 70,
      infantry_defense: 40,
      cavalry_defense: 25,
    },
    velocity: 7,
    carry: 50,
    upkeep: 1,
    training_duration: 1920,
    building: "barracks",
    img: imperian,
  },
  {
    name: "Equites Legati",
    cost: {
      wood: 140,
      clay: 160,
      iron: 20,
      crop: 40,
      total: 140 + 160 + 20 + 40,
    },
    stats: {
      attack: 0,
      infantry_defense: 20,
      cavalry_defense: 10,
    },
    velocity: 16,
    carry: 0,
    upkeep: 2,
    training_duration: 1360,
    building: "stables",
    img: equites_legati,
  },
  {
    name: "Equites Imperatoris",
    cost: {
      wood: 550,
      clay: 440,
      iron: 320,
      crop: 100,
      total: 550 + 440 + 320 + 100,
    },
    stats: {
      attack: 120,
      infantry_defense: 65,
      cavalry_defense: 50,
    },
    velocity: 14,
    carry: 100,
    upkeep: 3,
    training_duration: 2640,
    building: "stables",
    img: equites_imperatoris,
  },
  {
    name: "Equites Caesaris",
    cost: {
      wood: 550,
      clay: 640,
      iron: 800,
      crop: 180,
      total: 550 + 640 + 800 + 180,
    },
    stats: {
      attack: 180,
      infantry_defense: 80,
      cavalry_defense: 105,
    },
    velocity: 10,
    carry: 70,
    upkeep: 4,
    training_duration: 3520,
    building: "stables",
    img: equites_caesaris,
  },
  {
    name: "Battering Ram",
    cost: {
      wood: 900,
      clay: 360,
      iron: 500,
      crop: 70,
      total: 900 + 360 + 500 + 70,
    },
    stats: {
      attack: 60,
      infantry_defense: 30,
      cavalry_defense: 75,
    },
    velocity: 4,
    carry: 0,
    upkeep: 3,
    training_duration: 4600,
    building: "workshop",
    img: battering_ram,
  },
  {
    name: "Fire Catapult",
    cost: {
      wood: 950,
      clay: 1350,
      iron: 600,
      crop: 90,
      total: 950 + 1350 + 600 + 90,
    },
    stats: {
      attack: 75,
      infantry_defense: 60,
      cavalry_defense: 10,
    },
    velocity: 3,
    carry: 0,
    upkeep: 6,
    training_duration: 9000,
    building: "workshop",
    img: fire_catapult,
  },
  {
    name: "Senator",
    cost: {
      wood: 30750,
      clay: 27200,
      iron: 45000,
      crop: 37500,
      total: 30750 + 27200 + 45000 + 37500,
    },
    stats: {
      attack: 50,
      infantry_defense: 40,
      cavalry_defense: 30,
    },
    velocity: 4,
    carry: 0,
    upkeep: 5,
    training_duration: 90700,
    building: "residence",
    img: senator,
  },
  {
    name: "Settler",
    cost: {
      wood: 4600,
      clay: 4200,
      iron: 5800,
      crop: 4400,
      total: 4600 + 4200 + 5800 + 4400,
    },
    stats: {
      attack: 0,
      infantry_defense: 80,
      cavalry_defense: 80,
    },
    velocity: 5,
    carry: 3000,
    upkeep: 1,
    training_duration: 26900,
    building: "residence",
    img: settler,
  },
];
