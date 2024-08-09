import { Component, OnInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AmbientLight, AxesHelper, Camera, Clock, DirectionalLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { PhysicsService } from '../../services/physics.service';
import { PlanetService } from '../../services/planet.service';

@Component({
  selector: 'app-orbiter',
  standalone: true,
  imports: [],
  templateUrl: './orbiter.component.html',
  styleUrl: './orbiter.component.sass'
})
export class OrbiterComponent implements OnInit {

  //public ENABLE_SHADOWS: boolean = false;

  private readonly fpsClock = new Clock();
  private readonly physicsClock = new Clock();
  private readonly timeClock = new Clock();

  private readonly MAX_FPS: number = 1 / 60;
  private readonly PHYSICS_FPS: number = 1 / 60;

  private paused: boolean = false;

  private scene?: Scene;
  private controls?: OrbitControls;
  private camera?: PerspectiveCamera;
  private renderer?: WebGLRenderer;

  public constructor(private physicsService: PhysicsService,private planetService: PlanetService) {
  }

  ngOnInit(): void {
    this.createScene();
  }

  createScene(): void {

    this.scene = new Scene();

    const pointLight = new DirectionalLight(0xffffff, 0.5);
    pointLight.position.set(100, 100, -100);
    /*if (this.ENABLE_SHADOWS) {
      pointLight.castShadow = true;
      pointLight.shadow.mapSize.width = 1024;
      pointLight.shadow.mapSize.height = 1024;
      pointLight.shadow.camera.near = 0.5;
      pointLight.shadow.camera.far = 2000;
      //const helper = new CameraHelper(pointLight.shadow.camera);
      //scene.add(helper);
    }*/
    this.scene.add(pointLight);
    const ambientLight = new AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    //scene.add( new Box3Helper( new Box3().setFromObject(mocGroup), new Color(0xffff00) ) );
    const axesHelper = new AxesHelper( 20 );
    this.scene.add( axesHelper );

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
    /*if (this.ENABLE_SHADOWS) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = BasicShadowMap;
    }*/
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    this.renderer.setClearColor("rgb(88,101,117)");

    window.addEventListener('resize', () => { //TODO doesnt work right yet
      if (!this.camera || !this.renderer || !this.scene) return;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      this.renderer.render(this.scene, this.camera);
    });

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target = new Vector3(0, 0, 0);
    this.controls.enablePan = false;
    this.controls.maxDistance = 500;
    this.controls.minDistance = 10;

    const planets = this.planetService.createPlanets();
    for(const planet of planets){
      this.scene.add(planet.object,planet.pathGeometry);
    }

    const update = () => {
      if (!this.controls || !this.renderer || !this.scene || !this.camera) return;
      if (this.fpsClock.getElapsedTime() > this.MAX_FPS) {
        this.fpsClock.start();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      }

      if (this.physicsClock.getElapsedTime() > this.PHYSICS_FPS) {
        this.physicsService.makePhysicsTimestep(planets, [], this.physicsClock.getElapsedTime()); //TODO
        this.physicsClock.start();
        this.planetService.movePlanets(planets,this.timeClock.getElapsedTime());
      }

      if (!this.paused)
        window.requestAnimationFrame(update);
      else
        this.timeClock.stop();
    }

    this.timeClock.start();
    update();
  }
}
