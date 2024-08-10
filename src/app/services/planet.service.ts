import { Injectable } from '@angular/core';
import { BufferGeometry, Color, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, SphereGeometry, Vector2, Vector3 } from 'three';
import { ImportPlanet, Planet } from '../model/planet';
import { planets } from '../../assets/planetData';
import { OrbitVisuService } from './orbit-visu.service';


@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private importPlanets: ImportPlanet[] = [];

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

      const line = this.orbitVisuService.createOrbitLine(orbitColor);

      planets.push({
        id: importPlanet.id,
        object: sphere,
        gravity: 6,
        movement: importPlanet.initialMovement,
        stationary: importPlanet.stationary,
        orbitalLine: line,
        previousPositions: []
      } as Planet);
    }
    return planets;
  }
}
