'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Box, Compass, Radio } from 'lucide-react';

export const Ocean3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030b19, 0.035);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x00f0ff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00e5ff, 3, 20);
    pointLight.position.set(2, 4, 3);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xff4d4d, 2);
    spotLight.position.set(-3, 2, -2);
    scene.add(spotLight);

    // Submarine Drone Object (Composite Group)
    const droneGroup = new THREE.Group();

    // Drone Hull
    const hullGeo = new THREE.CylinderGeometry(0.8, 0.8, 3.2, 32);
    hullGeo.rotateZ(Math.PI / 2);
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x06152d,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
    });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    droneGroup.add(hull);

    // Glowing Cyan Trim Ring
    const ringGeo = new THREE.TorusGeometry(0.82, 0.05, 16, 32);
    ringGeo.rotateY(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.position.x = -0.6;
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.position.x = 0.6;
    droneGroup.add(ring1);
    droneGroup.add(ring2);

    // Propellers
    const propGeo = new THREE.BoxGeometry(0.1, 0.8, 0.1);
    const propMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const prop = new THREE.Mesh(propGeo, propMat);
    prop.position.x = -1.7;
    droneGroup.add(prop);

    // Optical Sensor Head (Camera lens)
    const lensGeo = new THREE.SphereGeometry(0.5, 32, 16);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.x = 1.5;
    droneGroup.add(lens);

    scene.add(droneGroup);

    // Floating Bio-Particles Particle System
    const particlesCount = 400;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Ocean Grid Floor
    const gridHelper = new THREE.GridHelper(30, 30, 0x00f0ff, 0x06152d);
    gridHelper.position.y = -3;
    scene.add(gridHelper);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Float drone gently
      droneGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.3;
      droneGroup.rotation.y = elapsedTime * 0.3;
      droneGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.08;

      // Rotate prop
      prop.rotation.x += 0.2;

      // Rotate particle cloud
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 shadow-2xl">
      <div ref={mountRef} className="w-full h-full" />

      {/* Overlay Telemetry HUD */}
      <div className="absolute top-4 left-4 z-20 p-4 rounded-2xl glass-panel border border-cyan-500/30 text-xs font-mono">
        <div className="flex items-center gap-2 mb-1">
          <Radio className="w-4 h-4 text-cyan-400 animate-ping" />
          <span className="font-bold text-white">AUV DEEPGUARDIAN-01 TELEMETRY</span>
        </div>
        <p className="text-slate-400">DEPTH: 3,420m | TEMP: 2.1°C</p>
        <p className="text-cyan-400 font-bold mt-1">SWARM PATROL STATE: ACTIVE</p>
      </div>
    </div>
  );
};
