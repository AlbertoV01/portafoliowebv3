import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

let scene, camera, renderer, particles, gridHelper;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
  const container = document.getElementById('bg-canvas');
  if (!container) return;

  // 1. Escena y Cámara
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0e14, 0.0015); // Niebla para desvanecer el fondo

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 400;
  camera.position.y = 100;

  // 2. Campo de Partículas (Nodos de red)
  const particleCount = 600;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 1200;
    positions[i + 1] = (Math.random() - 0.5) * 800;
    positions[i + 2] = (Math.random() - 0.5) * 1200;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Material cian neón (#00F0FF) sin sombreado pesado
  const material = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 2,
    transparent: true,
    opacity: 0.6
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // 3. Grid sci-fi en perspectiva
  gridHelper = new THREE.GridHelper(1500, 40, 0x00f0ff, 0x1a1d26);
  gridHelper.position.y = -150;
  scene.add(gridHelper);

  // 4. Renderer ultra ligero
  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limita a 2x para no saturar 4K
  container.appendChild(renderer.domElement);

  // Eventos de interacción
  document.addEventListener('mousemove', onDocumentMouseMove);
  window.addEventListener('resize', onWindowResize);
  
  animate();
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.05;
  mouseY = (event.clientY - windowHalfY) * 0.05;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Rotación suave del grid y partículas
  particles.rotation.y += 0.0008;
  gridHelper.rotation.y += 0.0005;

  // Paralaje sutil con el mouse
  camera.position.x += (mouseX - camera.position.x) * 0.02;
  camera.position.y += (-mouseY + 100 - camera.position.y) * 0.02;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

init();