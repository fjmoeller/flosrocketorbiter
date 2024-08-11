import { Injectable } from '@angular/core';
import { PhysicsConsumer } from '../model/gravityObject';
import { BufferGeometry, Color, Line, LineBasicMaterial, Points, PointsMaterial, Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class OrbitVisuService {

  constructor() { }

  public updateOrbitTrails(consumers: PhysicsConsumer[]): void {
    for (const consumer of consumers) {
      if (consumer.orbitalLine && consumer.previousPositions && !consumer.stationary) {
        if (consumer.previousPositions.length >= 1000)
          consumer.previousPositions.shift();
        //console.log(consumer.object.position);
        consumer.previousPositions.push(consumer.object.position.clone());
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

