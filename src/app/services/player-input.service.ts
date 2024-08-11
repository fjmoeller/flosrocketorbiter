import { Injectable } from '@angular/core';
import { PhysicsService } from './physics.service';
import { Vector3 } from 'three';
import { PhysicsConsumer } from '../model/gravityObject';

@Injectable({
  providedIn: 'root'
})
export class PlayerInputService {

  constructor(private physicsService: PhysicsService) { }

  public handlePlayerKeyboardInput(event: KeyboardEvent, activeVessel: PhysicsConsumer): void {
    switch(event.key){
      //case "W": 
      //case "A":
      //case "S":
      //case "D":
      case "h": activeVessel.acceleration.add(new Vector3(0.1,0,0)); break;
      case "n": activeVessel.acceleration.add(new Vector3(-0.1,0,0)); break;
      case "i": activeVessel.acceleration.add(new Vector3(0,-0.1,0)); break;
      case "j": activeVessel.acceleration.add(new Vector3(0,0,0.1)); break;
      case "k": activeVessel.acceleration.add(new Vector3(0,0.1,0)); break;
      case "l": activeVessel.acceleration.add(new Vector3(0,0,-0.1)); break;
    }
  }
}
