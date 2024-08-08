import { Injectable } from '@angular/core';
import { Scene } from 'three';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  constructor() { }

  public createScene(): Scene{
    return new Scene();
  }
}
