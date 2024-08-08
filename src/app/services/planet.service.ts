import { Injectable } from '@angular/core';
import { Group } from 'three';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor() { }

  public createPlanets(): Group[]{
    return [];
  }
}
