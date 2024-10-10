'use client';

import * as THREE from "three"
import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Clouds, Cloud, CameraControls, Sky as SkyImpl } from "@react-three/drei"

function Sky() {
  const ref = useRef<THREE.Group>(null);
  const cloud0 = useRef<THREE.Group>(null);
  const [opacity, setOpacity] = useState(0);
  const { scene } = useThree();

  const config = {
    seed: 1,
    segments: 20,
    volume: 6,
    opacity: opacity, // Use the state for opacity
    fade: 10,
    growth: 4,
    speed: 0.1,
    x: 6,
    y: 1,
    z: 1,
    color: "white",
  }

  useEffect(() => {
    // Fade in effect
    const fadeInInterval = setInterval(() => {
      setOpacity(prev => {
        if (prev < 0.8) return prev + 0.05;
        clearInterval(fadeInInterval);
        return 0.8;
      });
    }, 50);

    return () => clearInterval(fadeInInterval);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 10) / 4
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 10) / 4
    }
    if (cloud0.current) {
      cloud0.current.rotation.y -= delta * 0.05
    }

    // Update opacity for all cloud materials
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material instanceof THREE.Material) {
        object.material.opacity = opacity;
        object.material.transparent = true;
        object.material.needsUpdate = true;
      }
    });
  })

  return (
    <>
      <SkyImpl />
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400}>
          <Cloud ref={cloud0} {...config} bounds={[config.x, config.y, config.z]} color={config.color} />
          <Cloud {...config} bounds={[config.x, config.y, config.z]} color="#eed0d0" seed={2} position={[15, 0, 0]} />
          <Cloud {...config} bounds={[config.x, config.y, config.z]} color="#d0e0d0" seed={3} position={[-15, 0, 0]} />
          <Cloud {...config} bounds={[config.x, config.y, config.z]} color="#a0b0d0" seed={4} position={[0, 0, -12]} />
          <Cloud {...config} bounds={[config.x, config.y, config.z]} color="#c0c0dd" seed={5} position={[0, 0, 12]} />
          <Cloud concentrate="outside" growth={100} color="#ffccdd" opacity={opacity} seed={0.3} bounds={200} volume={200} />
        </Clouds>
      </group>
    </>
  )
}

export default function CloudBackgroundInner() {
  return (
    <Canvas camera={{ position: [0, -10, 10], fov: 75 }}>
      <Sky />
      <ambientLight intensity={Math.PI / 1.5} />
      <spotLight position={[0, 40, 0]} decay={0} distance={45} penumbra={1} intensity={100} />
      <spotLight position={[-20, 0, 10]} color="red" angle={0.15} decay={0} penumbra={-1} intensity={30} />
      <spotLight position={[20, -10, 10]} color="red" angle={0.2} decay={0} penumbra={-1} intensity={20} />
      <CameraControls />
    </Canvas>
  )
}