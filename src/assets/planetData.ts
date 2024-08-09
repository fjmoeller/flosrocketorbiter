import { EllipseCurve } from "three";
import { ImportPlanet } from "../app/model/planet";

export const planets: ImportPlanet[] = [
    {
        id: 3,
        name: "Earth",
        radius: 2, //in meter
        gravity: 5, //TODO
        planetPath: new EllipseCurve(0, 5, 20, 30), //describes the ellipse the planet orbits 0,1 are the midpoint of the ellipse, 2,3 are the radiy in x/y direction
        startDelta: 0, //between 0 and 1
        texture: "", //TODO a link to the texure perhaps?
        orbitSpeed: 0.1 //in meter per second
    },{
        id: 1,
        name: "Mercury",
        radius: 0.5, //in meter
        gravity: 5, //TODO
        planetPath: new EllipseCurve(0, 0, 11, 11), //describes the ellipse the planet orbits 0,1 are the midpoint of the ellipse, 2,3 are the radiy in x/y direction
        startDelta: 0, //between 0 and 1
        texture: "", //TODO a link to the texure perhaps?
        orbitSpeed: 0.3 //in meter per second
    },
    {
        id: 0,
        name: "Sun",
        radius: 10, //in meter
        gravity: 3, //TODO
        planetPath: new EllipseCurve(0, 0, 0, 0), //describes the ellipse the planet orbits
        startDelta: 0, //between 0 and 1
        texture: "", //TODO a link to the texure perhaps?
        orbitSpeed: 0.03 //in meter per second
    }
];