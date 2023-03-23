import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000000
);
document.body.appendChild(renderer.domElement);
let cameraZ = 5;
const controls = new TrackballControls(camera, renderer.domElement);
const light = new THREE.AmbientLight(0xffffff);
light.position.set(0, 0, 5);
scene.add(light);
camera.position.copy(new THREE.Vector3(3, 10, 16));
// Create a sine wave - 2D Line
const pts = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(1, 1),
  new THREE.Vector2(2, 3),
  new THREE.Vector2(5, 1),
  new THREE.Vector2(7, 8),
];
const curve = new THREE.SplineCurve(pts);
const steps = 50;
const points = curve.getPoints(steps);

const geometry1 = new THREE.BufferGeometry().setFromPoints(points);
const material1 = new THREE.LineBasicMaterial({ color: 0xff0000 });
const splineObject = new THREE.Line(geometry1, material1);
scene.add(splineObject);
////// 2D- Line drawing end here//////////

// 3D - Extrude
const pts1 = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1, 1, 0),
  new THREE.Vector3(2, 3, 0),
  new THREE.Vector3(5, 1, 0),
  new THREE.Vector3(7, 8, 0),
];
const shape1 = new THREE.CatmullRomCurve3(pts1);
const w = 0.5;
const h = 0.0001;
const extrudePoints = [
  new THREE.Vector2(-w, -h),
  new THREE.Vector2(-w, h),
  new THREE.Vector2(w, h),
  new THREE.Vector2(w, -h),
  new THREE.Vector2(-w, -h),
];
const shape = new THREE.Shape(extrudePoints);
const extrudeSettings1 = {
  steps: steps,
  bevelEnabled: false,
  extrudePath: shape1,
};
const geometry2 = new THREE.ExtrudeGeometry(shape, extrudeSettings1);
const material2 = new THREE.MeshLambertMaterial({
  color: 0xb0f0ee,
  opacity: 0.8,
  transparent: true,
});
const material2wire = new THREE.MeshLambertMaterial({
  color: 0x000000,
  wireframe: true,
});
const mesh2 = new THREE.Mesh(geometry2, material2);
const mesh2wire = new THREE.Mesh(geometry2, material2wire);
mesh2.add(mesh2wire);
scene.add(mesh2);
const animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
};

animate();
