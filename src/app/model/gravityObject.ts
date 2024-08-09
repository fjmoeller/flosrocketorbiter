import { Object3D, Vector3 } from "three";

export interface GravityProducer {
    id: number; //TODO change this id stuff or maybe have a global id counter?
    object: Object3D;
    gravity: number; //mass * grav constant to make numbers smaller
}

export interface GravityConsumer {
    id: number;
    object: Object3D;
    movement: Vector3;
    stationary : boolean;
}

export enum SolarSystemPlanet{
    EARTH,
    SUN,
    VENUS
}