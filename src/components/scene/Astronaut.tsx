
import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

export default function Astronaut() {
  const group = useRef<THREE.Group>(null);
  const astronautTexture = useLoader(TextureLoader, "/lovable-uploads/5d9020bf-ca3d-4512-8468-34b0d5a3aca2.png");
  
  // Create a custom astronaut using the provided image
  useFrame((state) => {
    if (group.current) {
      // Make the astronaut float slightly
      group.current.position.y = -1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      // Slowly rotate the astronaut
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <group ref={group} position={[5, -1, 3]} scale={1.5}>
      {/* Use a simple plane with the astronaut texture */}
      <mesh>
        <planeGeometry args={[2, 2.5]} />
        <meshBasicMaterial 
          map={astronautTexture} 
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
