import { Injectable } from '@angular/core';
import { Color, Euler, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three';
import { ImportPlanet, Planet } from '../model/planet';
import { planets } from '../../assets/planetData';
import { OrbitVisuService } from './orbit-visu.service';


@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private readonly importPlanets: ImportPlanet[] = [];

  constructor(private orbitVisuService: OrbitVisuService) {
    this.importPlanets = planets;
  }

  public createPlanets(): Planet[] {
    const planets: Planet[] = [];

    for (const importPlanet of this.importPlanets) {

      const geometry = new SphereGeometry(importPlanet.radius);
      const orbitColor = new Color().setHex(Math.random() * 0xffffff)
      const material = new MeshBasicMaterial({ color: orbitColor });
      const sphere = new Mesh(geometry, material);
      sphere.position.copy(importPlanet.initialPosition);
      sphere.rotation.copy(importPlanet.initialRotation);

      const line = this.orbitVisuService.createOrbitLine(orbitColor);

      planets.push({
        id: importPlanet.id,
        
        object: sphere,
        
        velocity: importPlanet.initialMovement,
        rotationVelocity: importPlanet.initialRotationVelocity ?? new Euler(),
        acceleration: new Vector3(0, 0, 0),
        rotationacceleration: new Euler(),

        previousPositions: [],

        orbitalLine: line,

        stationary: importPlanet.stationary,
        activeControl: false,

        gravity: importPlanet.gravity,
      } as Planet);
    }
    return planets;
  }
}
