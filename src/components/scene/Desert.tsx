
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

export default function Desert() {
  const groundRef = useRef<THREE.Mesh>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  
  // Load the desert image texture
  const desertTexture = useLoader(TextureLoader, "/lovable-uploads/c52d47d1-acc5-46cf-b11d-ed8115bd05d0.png");
  
  // Create a sunset-colored desert floor
  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Use the desert image as a skybox */}
      <mesh position={[0, 0, -50]} rotation={[0, 0, 0]}>
        <planeGeometry args={[200, 80]} />
        <meshBasicMaterial 
          map={desertTexture}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sun */}
      <mesh ref={sunRef} position={[15, 15, -30]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial color="#ff7b00" />
      </mesh>

      {/* Ambient Light */}
      <ambientLight intensity={0.6} />
      
      {/* Directional Light (Sunset) */}
      <directionalLight 
        position={[15, 15, -30]}
        intensity={1.5}
        color="#ff7b00"
      />

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

      {/* Add some cacti like in the reference image */}
      {[15, -20, 35, -5].map((x, i) => (
        <mesh key={i} position={[x, -1.5, i * 10 - 10]}>
          <cylinderGeometry args={[0.5, 0.7, 5, 8]} />
          <meshStandardMaterial color="#2d7d46" />
          {/* Cactus arms */}
          <group position={[0, 1, 0]}>
            <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
              <cylinderGeometry args={[0.3, 0.4, 2, 8]} />
              <meshStandardMaterial color="#2d7d46" />
            </mesh>
          </group>
        </mesh>
      ))}
    </group>
  );
}
