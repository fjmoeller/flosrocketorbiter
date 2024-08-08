import { Object3D, Vector3 } from "three";

export interface GravityProducer {
    object: Object3D;
    gravity: number; //mass * grav constant to make numbers smaller
}

export interface GravityReceiver {
    direction: Vector3;
    object: Object3D;
}

export enum SolarSystemPlanet{
    EARTH,
    SUN,
    VENUS
}