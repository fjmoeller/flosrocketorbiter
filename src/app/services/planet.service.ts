import { Injectable } from '@angular/core';
import { BufferGeometry, Color, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, SphereGeometry, Vector2, Vector3 } from 'three';
import { ImportPlanet, Planet } from '../model/planet';
import { planets } from '../../assets/planetData';


@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private importPlanets: ImportPlanet[] = [];

  constructor() {
    this.importPlanets = planets;
  }

  public createPlanets(): Planet[] {
    const planets: Planet[] = [];

    for (const importPlanet of this.importPlanets) {

      const geometry = new SphereGeometry(importPlanet.radius);
      const material = new MeshBasicMaterial({ color: new Color().setHex(Math.random() * 0xffffff) }); //TODO replace with texture
      const sphere = new Mesh(geometry, material);
      sphere.position.copy(importPlanet.initialPosition);

      planets.push({ id: importPlanet.id, object: sphere, gravity: 6, movement: importPlanet.initialMovement, stationary: importPlanet.stationary } as Planet);
    }
    return planets;
  }
}
