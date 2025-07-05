import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlassySphereBackground = ({ className = '' }) => {
  const mountRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mountRef.current.appendChild(renderer.domElement);

    // Glassy sphere geometry
    const geometry = new THREE.IcosahedronGeometry(2, 3);
    // Custom material for glassy effect
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6, // Brand purple
      metalness: 0.7,
      roughness: 0.08,
      transmission: 0.85, // glass effect
      thickness: 0.7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      ior: 1.4,
      reflectivity: 0.4,
      transparent: true,
      opacity: 0.85,
      sheen: 1.0,
      sheenColor: new THREE.Color('#ec4899'), // Brand pink
      sheenRoughness: 0.5,
      emissive: new THREE.Color('#3b82f6'), // Brand blue
      emissiveIntensity: 0.25,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Glow effect (using a second mesh)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6, // Brand blue
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(new THREE.IcosahedronGeometry(2.25, 3), glowMaterial);
    scene.add(glow);

    // Subtle inner animated lights
    const pointLight1 = new THREE.PointLight(0xec4899, 0.7, 10); // Pink
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.7, 10); // Purple
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);
    const pointLight3 = new THREE.PointLight(0x3b82f6, 0.5, 10); // Blue
    pointLight3.position.set(0, 2, -2);
    scene.add(pointLight3);

    // Starfield background (subtle)
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 120;
    const starVertices = [];
    for (let i = 0; i < starCount; i++) {
      const r = 8 + Math.random() * 8;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      starVertices.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, opacity: 0.5, transparent: true });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = Date.now() * 0.0003;
      sphere.rotation.y += 0.003;
      sphere.rotation.x += 0.0015;
      glow.rotation.y -= 0.0015;
      glow.rotation.x += 0.001;
      // Animate lights
      pointLight1.position.x = 2 * Math.cos(t);
      pointLight1.position.z = 2 * Math.sin(t);
      pointLight2.position.y = 2 * Math.cos(-t * 1.2);
      pointLight2.position.z = 2 * Math.sin(-t * 1.2);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ filter: 'blur(0.5px)' }}
    />
  );
};

export default GlassySphereBackground; 