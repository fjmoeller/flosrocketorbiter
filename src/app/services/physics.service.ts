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
        if (consumer.stationary) continue; // stationary objects don't get moved

        // First update the object position by half step
        consumer.object.position.add(consumer.velocity.clone().multiplyScalar(timeDelta / 2));

        const acceleration = new Vector3(0, 0, 0);
        if (consumer.activeControl) { //acceleration of the active control of spacecraft
          acceleration.add(consumer.acceleration.multiplyScalar(timeDelta));
          consumer.acceleration.copy(new Vector3(0, 0, 0)); //reset acceleration for this step
        }

        // Calculate the gravity flux
        for (const producer of producers) {
          if (consumer.id === producer.id) continue; // don't make objects add gravity forces onto themselves
          const producerAcceleration = producer.gravity / Math.pow(consumer.object.position.distanceTo(producer.object.position), 2);
          const producerDirection = producer.object.position.clone().sub(consumer.object.position);
          acceleration.add(producerDirection.normalize().multiplyScalar(producerAcceleration));
        }
        // update vessel velocity
        consumer.velocity.add(acceleration.multiplyScalar(timeDelta)); //update velocity

        // Lastly update the object position by half step
        consumer.object.position.add(consumer.velocity.clone().multiplyScalar(timeDelta / 2));

    }
  }
}
