
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
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
      {/* Use the desert image as a skybox, adjusted to be more prominent */}
      <mesh position={[0, 5, -40]} rotation={[0, 0, 0]}>
        <planeGeometry args={[200, 100]} />
        <meshBasicMaterial 
          map={desertTexture}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sun - larger and positioned to match the reference */}
      <mesh ref={sunRef} position={[0, 25, -50]}>
        <sphereGeometry args={[12, 32, 32]} />
        <meshBasicMaterial color="#ff7b00" />
      </mesh>

      {/* Ambient Light - warmer to match sunset */}
      <ambientLight intensity={0.8} color="#ffdbba" />
      
      {/* Directional Light (Sunset) - positioned to match sun position */}
      <directionalLight 
        position={[0, 25, -50]}
        intensity={1.8}
        color="#ff7b00"
      />

      {/* Desert Ground - flatter and more orange to match reference */}
      <mesh 
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]}
      >
        <planeGeometry args={[200, 200, 50, 50]} />
        <meshStandardMaterial 
          color="#e9a268" 
          wireframe={false}
          metalness={0.1}
          roughness={0.9}
          onBeforeCompile={(shader) => {
            shader.uniforms.time = { value: 0 };
            shader.vertexShader = `
              uniform float time;
              ${shader.vertexShader}
            `.replace(
              '#include <begin_vertex>',
              `
              #include <begin_vertex>
              float elevation = sin(position.x * 0.02) * sin(position.z * 0.02) * 1.0;
              transformed.y += elevation;
              `
            );
          }}
        />
      </mesh>

      {/* Add some rock formations and dunes in the distance */}
      <group position={[-30, -1, -20]}>
        <mesh>
          <coneGeometry args={[8, 10, 4]} />
          <meshStandardMaterial color="#d28c51" />
        </mesh>
      </group>

      <group position={[25, -1, -15]}>
        <mesh>
          <coneGeometry args={[10, 8, 4]} />
          <meshStandardMaterial color="#c17f45" />
        </mesh>
      </group>

      {/* Add distant mountains/dunes to match reference image */}
      {[-50, -25, 0, 25, 50].map((x, i) => (
        <group key={i} position={[x, -1, -30 - (i * 3)]}>
          <mesh>
            <coneGeometry args={[15 + (i % 3 * 5), 10 + (i % 2 * 8), 3]} />
            <meshStandardMaterial color={`hsl(30, 70%, ${40 - i * 3}%)`} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
