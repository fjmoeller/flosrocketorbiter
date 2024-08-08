import { Injectable } from '@angular/core';
import { GravityReceiver as GravityConsumer, GravityProducer } from '../model/gravityObject';

@Injectable({
  providedIn: 'root'
})
export class PhysicsService {

  private readonly GRAVITATIONAL_CONSTANT = 6.6743e-11; //REMOVE
  private readonly EARTH_MASS = 5.9722e24; //REMOVE

  constructor() { }

  public makeTimestep(producers: GravityProducer[], consumers: GravityConsumer[], timeDelta: number) {
    for (const consumer of consumers) {
      for (const producer of producers) {
        const force = producer.gravity / ((consumer.object.position.distanceTo(producer.object.position)) ^ 2);
        const forceVector = consumer.object.position.sub(producer.object.position); //TODO other funtion
        var oldLength = forceVector.length();
        if (oldLength !== 0)
          consumer.direction = consumer.direction.add(forceVector.multiplyScalar(1 + (force / oldLength))); //TODO other funtion
      }
      consumer.object.position.add(consumer.direction);
    }
  }
}
