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
controls.autoRotate = true;
controls.autoRotateSpeed = 2;




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

      //Sun
      const sunGeometry = new THREE.SphereGeometry(15,32,32);
      const sunMaterial = new THREE.MeshStandardMaterial(
        {
        color:"white",
        emissive:"white",
        emissiveIntensity: 1,
        roughness: 0.2,
        metalness: 0.1,

      });
      const sunMesh = new THREE.Mesh(sunGeometry,sunMaterial);
    scene.add(sunMesh);


      //Alaz
      const alazGeometry = new THREE.SphereGeometry(3,64,64);
      const alazMaterial = new THREE.MeshStandardMaterial({
        color:"#8B0000",
        emissive:"#FF4400",
        emissiveIntensity: 1.2,
        metalness: 0.1,
        roughness: 0.6

      });
      const alazMesh = new THREE.Mesh(alazGeometry,alazMaterial);
    alazMesh.position.x = 30;
    scene.add(alazMesh);
    
    //Mehmet & Linea
    const mehmetGeometry = new THREE.SphereGeometry(5,32,32);
    const mehmetMaterial = new THREE.MeshPhongMaterial( { 
      color: "#aaccff",       
      roughness: 0.2,
      metalness: 0.1,
      transmission: 1,
      thickness: 1.5,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      emissive: "#66ccff",
      emissiveIntensity: 0.1,
    } );

    
    const mehmetMesh = new THREE.Mesh(mehmetGeometry,mehmetMaterial);
    mehmetMesh.position.x = 60;
    mehmetMesh.rotation.y = (Math.PI / 2)-135;
    scene.add(mehmetMesh);

    const lineaGeometry = new THREE.SphereGeometry(5,32,32);
    const lineaMaterial = new THREE.MeshStandardMaterial( { 
        color: "#ff9966",        
        roughness: 0.15,
        metalness: 0.1,
        transmission: 1,         
        thickness: 1.3,
        ior: 1.45,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        // emissive: "#ff6600",    
        // emissiveIntensity: 0.15,
    } );

     const lineaMesh = new THREE.Mesh(lineaGeometry,lineaMaterial);
    lineaMesh.position.x = 73;
    lineaMesh.rotation.y = 400;
    scene.add(lineaMesh);

    // Gran Pulse
  const granPulseGeometry = new THREE.IcosahedronGeometry(15,1);
  const granPulseMaterial = new THREE.MeshPhysicalMaterial( { 
    color: "#88e0ff", 
    metalness: 0.0,      
    transmission: 0,       
    thickness: 1.5,                

   } );
  const granPulseMesh = new THREE.Mesh( granPulseGeometry, granPulseMaterial );
  granPulseMesh.position.x = 140;
  scene.add( granPulseMesh );


   //Naiad
  const naiadGeometry = new THREE.SphereGeometry(9,32,32);
  const naiadMaterial = new THREE.MeshToonMaterial({color:"#00a2ff"});
  const naiadMesh = new THREE.Mesh(naiadGeometry,naiadMaterial);
  naiadMesh.position.x = 190;
  scene.add(naiadMesh);


    const addWire = (mesh, color) => {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.4
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    mesh.add(wireframe);
  };
  addWire(mehmetMesh, 0xffffff);
  addWire(lineaMesh, 0xffffff);


  // // Glow effect
  // const glowMaterialA = new THREE.MeshBasicMaterial({
  //   color: 0x99ccff,
  //   transparent: true,
  //   opacity: 0.15
  // });
  // const glowA = new THREE.Mesh(new THREE.SphereGeometry(6, 32, 32), glowMaterialA);
  // glowA.position.copy(mehmetMesh.position);
  // scene.add(glowA);

  // const glowMaterialB = new THREE.MeshBasicMaterial({
  //   color: 0xffbb88,
  //   transparent: true,
  //   opacity: 0.15
  // });
  // const glowB = new THREE.Mesh(new THREE.SphereGeometry(6, 32, 32), glowMaterialB);
  // glowB.position.copy(lineaMesh.position);
  // scene.add(glowB);


  // Line
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    mehmetMesh.position,
    lineaMesh.position
  ]);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: "white",
    linewidth: 10,
    transparent: true,
    opacity: 1 
  });
  const connectionLine = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(connectionLine);

    gsap.to(granPulseMesh.rotation, {
      y: Math.PI * 10,
      duration: 20,
      repeat:-1,
      ease: "none"
    })

    gsap.to(mehmetMesh.rotation, {
      y: Math.PI * -10,
      duration: 20,
      repeat:-1,
      ease: "none"
    })

    gsap.to(lineaMesh.rotation, {
      y: Math.PI * 10,
      duration: 20,
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


