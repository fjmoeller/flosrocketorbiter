import { Injectable } from '@angular/core';
import { GravityConsumer } from '../model/gravityObject';
import { BufferGeometry, Color, Line, LineBasicMaterial, Points, PointsMaterial, Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class OrbitVisuService {

  constructor() { }

  public updateOrbitTrails(consumers: GravityConsumer[]): void {
    for (const consumer of consumers) {
      if (consumer.orbitalLine && consumer.previousPositions && !consumer.stationary) {
        if (consumer.previousPositions.length >= 100)
          consumer.previousPositions.shift();
        consumer.previousPositions.push(consumer.object.position);
        consumer.orbitalLine.geometry.setFromPoints(consumer.previousPositions);
        consumer.orbitalLine.geometry.getAttribute("position").needsUpdate = true;
      }
    }
  }

  public createOrbitLine(color: Color): Line {
    const lineGeometry = new BufferGeometry().setFromPoints([new Vector3(0,0,0),new Vector3(10,10,10),new Vector3(50,0,0)]);
    const lineMaterial = new LineBasicMaterial({ color: color });
    return new Line(lineGeometry, lineMaterial);
  }
}

