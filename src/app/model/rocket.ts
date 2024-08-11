import { Object3D, Vector3 } from "three";
import { PhysicsConsumer } from "./gravityObject";

export interface Rocket extends PhysicsConsumer {

}

export interface SpawnRocket {
    rocket: Rocket,
    spawnPoint: Vector3,
    initalAccelaration: Vector3
}