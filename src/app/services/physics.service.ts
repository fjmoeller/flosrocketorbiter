import {Injectable} from '@angular/core';
import {PhysicsConsumer, PhysicsProducer} from '../model/gravityObject';
import {Vector3} from 'three';

@Injectable({
  providedIn: 'root'
})
export class PhysicsService {

  private readonly GRAVITATIONAL_CONSTANT = 6.6743e-11; //REMOVE
  private readonly EARTH_MASS = 5.9722e24; //REMOVE

  constructor() {
  }

  public makePhysicsTimestep(producers: PhysicsProducer[], consumers: PhysicsConsumer[], timeDelta: number) {
    for (const consumer of consumers) {
      if (consumer.stationary) continue; //stationary objects dont get moved

      const acceleration = new Vector3(0, 0, 0);
      /*if (consumer.activeControl) { //add active control of spacecraft
        acceleration.add(consumer.acceleration.multiplyScalar(timeDelta));
        consumer.acceleration.copy(new Vector3(0, 0, 0)); //reset acceleration for this step
      }*/
      for (const producer of producers) {
        if (consumer.id === producer.id) continue; //dont make objects add gravity forces onto themself
        const producerAcceleration = producer.gravity / (consumer.object.position.clone().distanceTo(producer.object.position.clone()) ^ 2);
        const producerDirection = producer.object.position.clone().sub(consumer.object.position.clone());
        const producerDistance = producerDirection.length();
        if (producerDistance !== 0) { //only if the objects arent on the exact same point
          const normalizedProducerDirection = producerDirection.multiplyScalar(1 / producerDistance);
          acceleration.add(normalizedProducerDirection.multiplyScalar(producerAcceleration));
        }
      }
      //add average of acceleration of timestep
      consumer.object.position.add(consumer.velocity.clone().multiplyScalar(timeDelta / 2));
      consumer.velocity.add(acceleration); //update velocity
      consumer.object.position.add(consumer.velocity.clone().multiplyScalar(timeDelta / 2)); //TODO multiply correct?
    }
  }
}
