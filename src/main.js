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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 600);  // pov, aspect, near, far
camera.position.z = 150;
scene.add(camera);

 // Light
const light = new THREE.PointLight("white",100, 500); // color, density, range
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
    
    const serpenGeometry = new THREE.TorusKnotGeometry(10,1.9701,205,13,6,3);
    const serpenMaterial = new THREE.MeshPhongMaterial( { 
      color: "#17ec13",
      emissive: "#000000",
      specular: "#c61010",

      emissiveIntensity: 0,
      roughness: 0.2,
      metalness: 0.1

    } );

    //Serpen
    const serpenMesh = new THREE.Mesh(serpenGeometry,serpenMaterial);
    serpenMesh.position.x = 60;
    serpenMesh.rotation.y = (Math.PI / 2)-135;
    scene.add(serpenMesh);

  const geometry = new THREE.OctahedronGeometry(15,5);
  const material = new THREE.MeshBasicMaterial( { color: "gray" } );
  const octahedronMesh = new THREE.Mesh( geometry, material );
  octahedronMesh.position.x = 100;
  scene.add( octahedronMesh );

  const water = new THREE.SphereGeometry(9,32,32);
  const waterMaterial = new THREE.MeshToonMaterial({color:"#00a2ff"});
  const waterMesh = new THREE.Mesh(water,waterMaterial);
  waterMesh.position.x = 150;
 
  scene.add(waterMesh);




    gsap.to(sunMesh.rotation, {
      y: Math.PI * 10,
      duration: 8,
      repeat:-1,
      ease: "none"
    })

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


