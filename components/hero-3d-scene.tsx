'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050b14, 0.025);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 3, 12);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0x00f5d4, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x8b5cf6, 4, 30);
    mainLight.position.set(4, 8, 4);
    scene.add(mainLight);

    const cyanLight = new THREE.PointLight(0x00f5d4, 3, 25);
    cyanLight.position.set(-6, 2, 2);
    scene.add(cyanLight);

    // 5. 3D Wave Ocean Terrain (Plane Geometry with Dynamic Height Animation)
    const planeGeo = new THREE.PlaneGeometry(40, 40, 48, 48);
    planeGeo.rotateX(-Math.PI / 2);

    // Modify terrain vertex positions for organic seamount ridges
    const pos = planeGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = Math.sin(x * 0.4) * Math.cos(z * 0.4) * 0.8 + Math.sin(x * 0.2 + z * 0.3) * 0.5;
      pos.setY(i, y - 4);
    }
    planeGeo.computeVertexNormals();

    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x0a182e,
      wireframe: true,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.15,
      metalness: 0.8,
      roughness: 0.2,
    });
    const terrain = new THREE.Mesh(planeGeo, planeMat);
    scene.add(terrain);

    // 6. Submarine AUV 3D Drone Model Group
    const droneGroup = new THREE.Group();

    // Fuselage
    const fuselageGeo = new THREE.CylinderGeometry(0.7, 0.7, 3.4, 32);
    fuselageGeo.rotateZ(Math.PI / 2);
    const fuselageMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.1,
    });
    const fuselage = new THREE.Mesh(fuselageGeo, fuselageMat);
    droneGroup.add(fuselage);

    // Glowing Bioluminescent Cyan Trims
    const ringGeo = new THREE.TorusGeometry(0.72, 0.04, 16, 32);
    ringGeo.rotateY(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.position.x = -0.8;
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.position.x = 0.8;
    droneGroup.add(ring1);
    droneGroup.add(ring2);

    // Sensor Head Spotlight Dome
    const domeGeo = new THREE.SphereGeometry(0.45, 32, 16);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.8,
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.x = 1.6;
    droneGroup.add(dome);

    // Search Spotlight Cone Beam
    const coneGeo = new THREE.ConeGeometry(2.5, 6, 32, 1, true);
    coneGeo.rotateZ(-Math.PI / 2);
    coneGeo.translate(3, 0, 0);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const lightBeam = new THREE.Mesh(coneGeo, coneMat);
    droneGroup.add(lightBeam);

    scene.add(droneGroup);

    // 7. Particle Swarm (Bioluminescent Marine Micro-organisms)
    const particleCount = 500;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 30;
      particlePositions[i + 1] = (Math.random() - 0.5) * 15;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 8. Render Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Patrol Drone Flight Movement
      droneGroup.position.x = Math.sin(elapsed * 0.8) * 3;
      droneGroup.position.y = Math.sin(elapsed * 1.4) * 0.6 + 0.5;
      droneGroup.position.z = Math.cos(elapsed * 0.8) * 1.5;
      droneGroup.rotation.y = -Math.sin(elapsed * 0.8) * 0.4 + Math.PI / 6;
      droneGroup.rotation.z = Math.sin(elapsed * 1.2) * 0.08;

      // Rotate terrain grid
      terrain.rotation.y = elapsed * 0.02;

      // Animate camera subtly with mouse movement
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 1.5 + 3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-2xl">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* HUD Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/40 text-[11px] font-mono text-cyan-400 backdrop-blur-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>INTERACTIVE 3D OCEAN TWIN CANVAS — MOVE MOUSE TO ORBIT</span>
      </div>
    </div>
  );
};
