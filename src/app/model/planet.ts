import { Euler, Vector3 } from "three";
import { PhysicsConsumer, PhysicsProducer } from "./gravityObject";

export interface Planet extends PhysicsProducer,PhysicsConsumer {
    //path: EllipseCurve;
    //pathGeometry: Line;
    //orbitSpeed: number;
}

export interface ImportPlanet { //TODO rotation speed around axis && axis definition (can be tilted)
    id: number;
    name: string;
    radius: number;
    initialMovement: Vector3;
    initialPosition: Vector3;
    texture: string;
    stationary: boolean,
    gravity: number; //mass * grav constant to make numbers smaller
    initialRotation: Euler
    initialRotationVelocity: Euler
    //planetPath: EllipseCurve; //TODO change this to use parameters instead
}
