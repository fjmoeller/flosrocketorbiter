import { Injectable } from '@angular/core';
import { BoxGeometry, Color, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { Rocket } from '../model/rocket';

@Injectable({
  providedIn: 'root'
})
export class RocketService {

  constructor() { }

  createRocket(): Rocket { //TODO change to use import
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: new Color().setHex(Math.random() * 0xffffff) });
    const mesh = new Mesh(geometry, material);

    mesh.position.x = 50;

    const r: Rocket = {
      id: 15,
      object: mesh,
      movement: new Vector3(0, 0, 0), //no initial movement
      stationary: false,
      activeControl: true,
      acceleration: new Vector3(0, 0, 0)
    };
    return r;
  }
}
