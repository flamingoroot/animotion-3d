
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Desert() {
  const groundRef = useRef<THREE.Mesh>(null);
  const sunRef = useRef<THREE.Mesh>(null);

  // Create a sunset-colored desert floor
  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Desert Ground */}
      <mesh 
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]}
      >
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial 
          color="#dea673" 
          wireframe={false}
          metalness={0.1}
          roughness={0.8}
          onBeforeCompile={(shader) => {
            shader.uniforms.time = { value: 0 };
            shader.vertexShader = `
              uniform float time;
              ${shader.vertexShader}
            `.replace(
              '#include <begin_vertex>',
              `
              #include <begin_vertex>
              float elevation = sin(position.x * 0.05) * sin(position.z * 0.05) * 2.0;
              transformed.y += elevation;
              `
            );
          }}
        />
      </mesh>

      {/* Sun */}
      <mesh ref={sunRef} position={[15, 15, -30]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial color="#ff7b00" />
      </mesh>

      {/* Ambient Light */}
      <ambientLight intensity={0.2} />
      
      {/* Directional Light (Sunset) */}
      <directionalLight 
        position={[15, 15, -30]}
        intensity={2}
        color="#ff7b00"
      />

      {/* Distant Mountains */}
      <mesh position={[0, 0, -50]}>
        <boxGeometry args={[100, 20, 5]} />
        <meshStandardMaterial 
          color="#362517"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Add some rocks and dunes */}
      {Array(20).fill(null).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.random() * 60 - 30,
            -1.5,
            Math.random() * 60 - 30
          ]}
          rotation={[0, Math.random() * Math.PI * 2, 0]}
        >
          <boxGeometry args={[
            Math.random() * 2 + 0.5,
            Math.random() * 2 + 0.5,
            Math.random() * 2 + 0.5
          ]} />
          <meshStandardMaterial 
            color={`rgb(${150 + Math.random() * 50}, ${100 + Math.random() * 50}, ${50 + Math.random() * 50})`}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
