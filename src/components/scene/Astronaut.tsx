
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

export default function Astronaut() {
  const group = useRef<THREE.Group>(null);
  const astronautTexture = useLoader(TextureLoader, "/lovable-uploads/5d9020bf-ca3d-4512-8468-34b0d5a3aca2.png");
  
  // Create a more dynamic floating animation for the astronaut
  useFrame((state) => {
    if (group.current) {
      // Create a more pronounced floating effect
      group.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      
      // Add slight rotation to simulate weightlessness
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.4;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      
      // Add subtle side-to-side movement
      group.current.position.x = 5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={group} position={[5, -0.5, 3]} scale={2.0}>
      {/* Use a larger plane with the astronaut texture */}
      <mesh>
        <planeGeometry args={[2.5, 3.0]} />
        <meshBasicMaterial 
          map={astronautTexture} 
          transparent={true}
          side={THREE.DoubleSide}
          alphaTest={0.1} // Improve edge quality
        />
      </mesh>
    </group>
  );
}
