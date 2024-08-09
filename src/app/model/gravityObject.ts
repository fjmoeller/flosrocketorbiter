import { Object3D, Vector3 } from "three";

export interface GravityProducer {
    id: number;
    object: Object3D;
    gravity: number; //mass * grav constant to make numbers smaller
}

export interface GravityReceiver {
    id: number;
    object: Object3D;
}

export enum SolarSystemPlanet{
    EARTH,
    SUN,
    VENUS
}