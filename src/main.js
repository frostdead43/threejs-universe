import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from "gsap";
import "./style.css"


function createScene() {

//Scene
const scene = new THREE.Scene();
console.log(scene);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 300);  // pov, aspect, near, far
camera.position.z = 50;
scene.add(camera);

 // Light
const light = new THREE.PointLight("white",100, 1000); // color, density, range
light.position.set(10,20,20);  // x,y,z
scene.add(light);

const sunlight = new THREE.DirectionalLight("white", 1.5)
sunlight.position.set(5,15,5)
scene.add(sunlight);

// const sunlight2 = new THREE.DirectionalLight("white", 1.5)
// sunlight2.position.set(60,50,50)
// scene.add(sunlight2);

//Render
const canvas = document.querySelector(".webgl");
const render = new THREE.WebGLRenderer({canvas});
render.setSize(sizes.width,sizes.height);
render.setPixelRatio(2);
render.render(scene,camera)

//Controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = false;
controls.autoRotate = false;
controls.autoRotateSpeed = 1




//Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  console.log(sizes.width, sizes.height);
  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.projectionMatrix();
  render.setSize(sizes.width, sizes.height);
})

return { scene, camera, render, controls };
};

  

  function createPlanets(scene) {


      const sunGeometry = new THREE.SphereGeometry(15,32,32);
      const sunMaterial = new THREE.MeshStandardMaterial(
        {
        color:"white",
        emissive:"white",
        emissiveIntensity: 0,
        roughness: 0.2,
        metalness: 0.1,

      });
      const sunMesh = new THREE.Mesh(sunGeometry,sunMaterial);
    scene.add(sunMesh);

      const sunGeometry2 = new THREE.SphereGeometry(3,32,32);
      const sunMaterial2 = new THREE.MeshStandardMaterial({color:"blue"});
      const sunMesh2 = new THREE.Mesh(sunGeometry2,sunMaterial2);
    sunMesh2.position.x = 20;
    scene.add(sunMesh2);
    
    const serpenGeometry = new THREE.TorusKnotGeometry(10,3,100,16);
    const serpenMaterial = new THREE.MeshStandardMaterial( { 
      color: "white",
      emissive: "white",
      emissiveIntensity: 0,
      roughness: 0.2,
      metalness: 0.1

    } );
    const serpenMesh = new THREE.Mesh(serpenGeometry,serpenMaterial);
    serpenMesh.position.x = 60;
    scene.add(serpenMesh);

    const geometry = new THREE.OctahedronGeometry(15,5);
  const material = new THREE.MeshBasicMaterial( { color: "gray" } );
  const octahedron = new THREE.Mesh( geometry, material );
  octahedron.position.x = 100;
  octahedron.position.z = 96;
    scene.add( octahedron );

    gsap.to(sunMesh.rotation, {
      y: Math.PI * 10,
      duration: 8,
      repeat:-1,
      ease: "none"
    })

  //   gsap.to(sunMesh2.position, {
  //   z: "+=120", // ileri geri hareket
  //   duration: 4,
  //   repeat: -1,
  //   yoyo: true,
  //   ease: "power1.inOut"
  // });
 
  }

 



function loop(render, scene, camera, controls) {
  controls.update();
  render.render(scene,camera);
  requestAnimationFrame(() => loop(render, scene, camera, controls));
}



function init() {
  const { scene, camera, render, controls } = createScene();
  createPlanets(scene);
  loop(render, scene, camera, controls);
}

init();


