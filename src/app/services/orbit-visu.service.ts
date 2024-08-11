import { Injectable } from '@angular/core';
import { PhysicsConsumer } from '../model/gravityObject';
import { BufferGeometry, Color, Line, LineBasicMaterial, Points, PointsMaterial, Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class OrbitVisuService {

  constructor() { }

  public updateOrbitTrails(vessels: PhysicsConsumer[]): void {
    for (const vessel of vessels) {
      if (vessel.orbitalLine && vessel.previousPositions && !vessel.stationary) {
        if (vessel.previousPositions.length >= 100)
          vessel.previousPositions.shift();
        vessel.previousPositions.push(vessel.object.position);
        vessel.orbitalLine.geometry.setFromPoints(vessel.previousPositions);
        vessel.orbitalLine.geometry.getAttribute("position").needsUpdate = true;
      }
    }
  }

  public createOrbitLine(color: Color): Line {
    const lineGeometry = new BufferGeometry().setFromPoints([new Vector3(0,0,0),new Vector3(10,10,10),new Vector3(50,0,0)]);
    const lineMaterial = new LineBasicMaterial({ color: color });
    return new Line(lineGeometry, lineMaterial);
  }
}

