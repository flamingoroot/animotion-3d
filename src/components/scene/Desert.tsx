
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

export default function Desert() {
  const groundRef = useRef<THREE.Mesh>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  
  // Load the desert image texture
  const desertTexture = useLoader(TextureLoader, "/lovable-uploads/c52d47d1-acc5-46cf-b11d-ed8115bd05d0.png");
  
  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Desert background image */}
      <mesh position={[0, 10, -60]} rotation={[0, 0, 0]}>
        <planeGeometry args={[240, 120]} />
        <meshBasicMaterial 
          map={desertTexture}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sun - more orange and larger */}
      <mesh ref={sunRef} position={[0, 25, -70]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#ff6a00" />
      </mesh>

      {/* Stronger sunset lighting */}
      <ambientLight intensity={1.0} color="#ffdbba" />
      
      <directionalLight 
        position={[0, 25, -50]}
        intensity={2.0}
        color="#ff6a00"
      />

      {/* Desert Ground - flatter with more defined dunes */}
      <mesh 
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]}
      >
        <planeGeometry args={[300, 300, 60, 60]} />
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
              float elevation = sin(position.x * 0.015) * sin(position.z * 0.015) * 0.8;
              transformed.y += elevation;
              `
            );
          }}
        />
      </mesh>

      {/* Larger dunes in background to match reference */}
      <group position={[-50, -1.5, -30]}>
        <mesh>
          <coneGeometry args={[20, 12, 4]} />
          <meshStandardMaterial color="#d28c51" />
        </mesh>
      </group>

      <group position={[40, -1.5, -25]}>
        <mesh>
          <coneGeometry args={[25, 15, 4]} />
          <meshStandardMaterial color="#c17f45" />
        </mesh>
      </group>

      {/* Distant mountain range like in reference */}
      {[-80, -40, 0, 40, 80].map((x, i) => (
        <group key={i} position={[x, -1.5, -40 - (i * 2)]}>
          <mesh>
            <coneGeometry args={[20 + (i % 3 * 6), 12 + (i % 2 * 8), 4]} />
            <meshStandardMaterial color={`hsl(30, 80%, ${45 - i * 4}%)`} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
