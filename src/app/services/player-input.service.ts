import { Injectable } from '@angular/core';
import { Euler, Vector3 } from 'three';
import { PhysicsConsumer } from '../model/gravityObject';

@Injectable({
  providedIn: 'root'
})
export class PlayerInputService {

  constructor() { }

  public handlePlayerKeyboardInput(event: KeyboardEvent, activeVessel: PhysicsConsumer, isDown: boolean): void {
    switch (event.key) {
      case "q": activeVessel.rotationacceleration.x = -1; break; //todo maybe 180 or math.pi?
      case "e": activeVessel.rotationacceleration.x = 1; break;
      case "w": activeVessel.rotationacceleration.z = -1; break;
      case "a": activeVessel.rotationacceleration.z = 1; break;
      case "s": activeVessel.rotationacceleration.y = -1; break;
      case "d": activeVessel.rotationacceleration.y = 1; break;
      case "h": activeVessel.acceleration.add(new Vector3(0.1, 0, 0)); break;
      case "n": activeVessel.acceleration.add(new Vector3(-0.1, 0, 0)); break;
      case "i": activeVessel.acceleration.add(new Vector3(0, -0.1, 0)); break;
      case "j": activeVessel.acceleration.add(new Vector3(0, 0, 0.1)); break;
      case "k": activeVessel.acceleration.add(new Vector3(0, 0.1, 0)); break;
      case "l": activeVessel.acceleration.add(new Vector3(0, 0, -0.1)); break;
    }
  }
}
