import { Injectable } from '@angular/core';
import { GravityReceiver as GravityConsumer, GravityProducer } from '../model/gravityObject';
import { Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class PhysicsService {

  private readonly GRAVITATIONAL_CONSTANT = 6.6743e-11; //REMOVE
  private readonly EARTH_MASS = 5.9722e24; //REMOVE

  constructor() { }

  public makePhysicsTimestep(producers: GravityProducer[], consumers: GravityConsumer[], timeDelta: number) {
    for (const consumer of consumers) {
      let gravityForce = new Vector3(0,0,0);
      for (const producer of producers) {
        if(consumer.id === producer.id) continue;
        const force = producer.gravity / ((consumer.object.position.distanceTo(producer.object.position)) ^ 2);
        const forceVector = consumer.object.position.sub(producer.object.position); //TODO correct like this?
        var oldLength = forceVector.length();
        if (oldLength !== 0)
          gravityForce.add(forceVector.multiplyScalar(1 + (force / oldLength))); //TODO put into other funtion?
      }
      consumer.object.position.add(gravityForce);
    }
  }
}
