import { Injectable } from '@angular/core';
import { PhysicsConsumer, PhysicsProducer } from '../model/gravityObject';
import { Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class PhysicsService {

  private readonly GRAVITATIONAL_CONSTANT = 6.6743e-11; //REMOVE
  private readonly EARTH_MASS = 5.9722e24; //REMOVE

  constructor() {}

  public makePhysicsTimestep(producers: PhysicsProducer[], consumers: PhysicsConsumer[], timeDelta: number) {
    for (const consumer of consumers) {
      if (consumer.stationary) continue; //stationary objects dont get moved
      consumer.object.position.add(consumer.movement.clone().multiplyScalar(timeDelta / 2));

      const totalForce = new Vector3(0, 0, 0);
      if (consumer.activeControl) {
        totalForce.add(consumer.acceleration);
        consumer.acceleration.copy(new Vector3(0, 0, 0));
      }
      for (const producer of producers) {
        if (consumer.id === producer.id) continue; //dont make objects add gravity forces onto themself
        const force = producer.gravity / ((consumer.object.position.distanceTo(producer.object.position)) ^ 2);
        const direction = producer.object.position.clone().sub(consumer.object.position);
        var distance = direction.length();
        if (distance !== 0) //only if the things arent on the exact same point
          totalForce.add(direction.multiplyScalar(1 + (force / distance))); //TODO check calc, what it should do: scale the direction vector to the force length
      }

      
      consumer.object.position.add(consumer.movement.add(totalForce).clone().multiplyScalar(timeDelta / 2)); //TODO multiply correct?
    }
  }
}
