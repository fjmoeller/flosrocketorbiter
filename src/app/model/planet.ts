import { EllipseCurve, Object3D, Line } from "three";
import { GravityProducer } from "./gravityObject";

export interface Planet extends GravityProducer {
    path: EllipseCurve;
    pathGeometry: Line;
    orbitSpeed: number;
}

export interface ImportPlanet { //TODO rotation speed around axis && axis definition (can be tilted)
    id: number;
    name: string;
    radius: number;
    orbitSpeed: number;
    texture: string;
    startDelta: number;
    gravity: number; //mass * grav constant to make numbers smaller
    planetPath: EllipseCurve; //TODO change this to use parameters instead
}
