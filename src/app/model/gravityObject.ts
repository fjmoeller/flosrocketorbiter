import { Euler, Line, Object3D, Quaternion, Vector3 } from "three";

export interface PhysicsProducer {
    id: number; //TODO change this id stuff or maybe have a global id counter?
    object: Object3D;
    gravity: number; //mass * grav constant to make numbers smaller
}

export interface PhysicsConsumer {
    id: number;
    object: Object3D;

    velocity: Vector3;
    acceleration: Vector3;

    rotationVelocity: Euler;
    rotationacceleration: Euler;

    previousPositions?: Vector3[];

    orbitalLine?: Line;

    stationary: boolean;
    activeControl: boolean;
    //TODO rotation & rotation accel
}

export enum SolarSystemPlanet {
    EARTH,
    SUN,
    VENUS
}