import { Component, OnInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AmbientLight, AxesHelper, Camera, Clock, DirectionalLight, Line, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { PhysicsService } from '../../services/physics.service';
import { PlanetService } from '../../services/planet.service';
import { OrbitVisuService } from '../../services/orbit-visu.service';

@Component({
  selector: 'app-orbiter',
  standalone: true,
  imports: [],
  templateUrl: './orbiter.component.html',
  styleUrl: './orbiter.component.sass'
})
export class OrbiterComponent implements OnInit {

  //public ENABLE_SHADOWS: boolean = false;
  private readonly SHOW_TRAILLINE: boolean = true;

  private readonly fpsClock = new Clock();
  private readonly physicsClock = new Clock();
  private readonly timeClock = new Clock();

  private readonly MAX_FPS: number = 1 / 60;
  private readonly PHYSICS_FPS: number = 1 / 60;

  private paused: boolean = false;

  private scene?: Scene;
  private cameraControls?: OrbitControls;
  private camera?: PerspectiveCamera;
  private renderer?: WebGLRenderer;

  public constructor(private physicsService: PhysicsService, private planetService: PlanetService, private orbitVisuService: OrbitVisuService) {
  }

  ngOnInit(): void {
    this.createScene();
  }

  createScene(): void {

    this.scene = new Scene();

    const ambientLight = new AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const axesHelper = new AxesHelper(20);
    this.scene.add(axesHelper);

    const canvas = document.getElementById('canvas-viewer');
    if (!canvas) {
      console.error("Error: no canvas found");
      return;
    }

    this.camera = new PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.5, 1000);
    this.camera.position.z = -100;
    this.camera.position.y = 0;
    this.camera.position.x = -50;
    this.scene.add(this.camera);

    this.renderer = new WebGLRenderer({ antialias: true, canvas: canvas });
    this.renderer.setClearColor(0x19212D, 1);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    this.renderer.setClearColor("rgb(0,0,0)");

    window.addEventListener('resize', () => { //TODO doesnt work right yet
      if (!this.camera || !this.renderer || !this.scene) return;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      this.renderer.render(this.scene, this.camera);
    });

    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.cameraControls.target = new Vector3(0, 0, 0);
    this.cameraControls.enablePan = false;
    this.cameraControls.maxDistance = 1000000;
    this.cameraControls.minDistance = 10;

    const planets = this.planetService.createPlanets();
    for (const planet of planets) {
      this.scene.add(planet.object);
      if(planet.orbitalLine){
        this.scene.add(planet.orbitalLine);
      }
    }

    const update = () => {
      if (!this.cameraControls || !this.renderer || !this.scene || !this.camera) return;

      //generate frame
      if (this.fpsClock.getElapsedTime() > this.MAX_FPS) {
        this.fpsClock.start();
        this.cameraControls.update();
        this.renderer.render(this.scene, this.camera);
      }

      //make physics tick
      if (this.physicsClock.getElapsedTime() > this.PHYSICS_FPS) {
        this.physicsService.makePhysicsTimestep(planets, planets, this.physicsClock.getElapsedTime());
        this.physicsClock.start();
        this.orbitVisuService.updateOrbitTrails(planets);
      }

      //next
      if (!this.paused)
        window.requestAnimationFrame(update);
      else
        this.timeClock.stop();
    }

    this.timeClock.start();
    this.physicsClock.start();
    this.fpsClock.start();
    update();
  }
}
