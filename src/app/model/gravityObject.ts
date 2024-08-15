import { Line, Object3D, Vector3 } from "three";

export interface PhysicsProducer {
    id: number; //TODO change this id stuff or maybe have a global id counter?
    object: Object3D;
    gravity: number; //mass * grav constant to make numbers smaller
}

export interface PhysicsConsumer {
    id: number;
    object: Object3D;
    velocity: Vector3;
    stationary: boolean;
    orbitalLine?: Line;
    previousPositions?: Vector3[];
    activeControl: boolean;
    acceleration: Vector3;
    //TODO rotation & rotation accel
}

export enum SolarSystemPlanet {
    EARTH,
    SUN,
    VENUS
}
