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
      const path = importPlanet.planetPath;


      const line = new Line(new BufferGeometry().setFromPoints(path.getSpacedPoints(100).map(p => new Vector3(p.x, 0, p.y))), new LineBasicMaterial({
        color: new Color().setHex(Math.random() * 0xffffff)
      }));

      //TODO make point to rotate around changeable and add support  for inclination

      planets.push({ id: importPlanet.id, object: sphere, gravity: 6, path: path, pathGeometry: line, orbitSpeed: importPlanet.orbitSpeed } as Planet);
    }
    return planets;
  }

  public movePlanets(planets: Planet[], timeDelta: number): void {
    for (const planet of planets) {
      let v = new Vector2();
      planet.path.getPointAt((timeDelta * planet.orbitSpeed) - Math.floor(timeDelta * planet.orbitSpeed), v);
      planet.object.position.copy(new Vector3(v.x, 0, v.y)); //TODO change to transform v to make elipse tiltable
    }
  }
}
