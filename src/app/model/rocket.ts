import { Object3D, Vector3 } from "three";
import { GravityConsumer } from "./gravityObject";

export interface Rocket extends GravityConsumer {
   
}

export interface SpawnRocket {
    rocket:Rocket,
    spawnPoint:Vector3,
    initalMovement: Vector3
}