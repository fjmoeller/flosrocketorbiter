import { EllipseCurve, Vector3 } from "three";
import { ImportPlanet } from "../app/model/planet";

export const planets: ImportPlanet[] = [
    {
        id: 3,
        name: "Earth",
        radius: 5, //in meter
        gravity: 0, //TODO
        //startDelta: 0, //between 0 and 1
        texture: "", //TODO a link to the texure perhaps?
        initialMovement: new Vector3(0, 0, 300),
        initialPosition: new Vector3(100, 0, 0),
        stationary: false,
    },
    {
        id: 0,
        name: "Sun",
        radius: 10, //in meter
        gravity: 0.00001, //TODO
        //startDelta: 0, //between 0 and 1
        texture: "", //TODO a link to the texure perhaps?
        initialMovement: new Vector3(0, 0, 0),
        initialPosition: new Vector3(0, 0, 0),
        stationary: true,
    }
];