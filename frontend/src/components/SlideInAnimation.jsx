import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const FadeInAnimation = ({ onComplete }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 5;

    // Animation variables
    let opacity = 0;
    const fadeInDuration = 100; // Controls the speed of fade-in

    const animate = () => {
      if (opacity < 1) {
        // Increment opacity for fade-in effect
        opacity += 0.01;
        material.opacity = opacity;

        // Render the scene
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      } else {
        // Complete the animation and remove the scene
        onComplete();
        mount.removeChild(renderer.domElement);
      }
    };

    // Start the animation
    animate();

    // Clean up on unmount
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [onComplete]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    />
  );
};

export default FadeInAnimation;
