import { EllipseCurve, Vector3 } from "three";
import { ImportPlanet } from "../app/model/planet";

export const planets: ImportPlanet[] = [
    /*{
        id: 3,
        name: "Earth",
        radius: 2, //in meter
        gravity: 0, //TODO
        //planetPath: new EllipseCurve(0, 5, 20, 30), //describes the ellipse the planet orbits 0,1 are the midpoint of the ellipse, 2,3 are the radiy in x/y direction
        //startDelta: 0, //between 0 and 1
        texture: "", //TODO a link to the texure perhaps?
        //orbitSpeed: 0.1 //in meter per second
        initialMovement: new Vector3(0, 0, 300),
        initialPosition: new Vector3(100, 0, 0),
        stationary: false,
    },*/
    {
        id: 0,
        name: "Sun",
        radius: 10, //in meter
        gravity: 0.00001, //TODO
        //planetPath: new EllipseCurve(0, 0, 0, 0), //describes the ellipse the planet orbits
        //startDelta: 0, //between 0 and 1
        texture: "", //TODO a link to the texure perhaps?
        //orbitSpeed: 0.03 //in meter per second
        initialMovement: new Vector3(0, 0, 0),
        initialPosition: new Vector3(0, 0, 0),
        stationary: true,
    }
];