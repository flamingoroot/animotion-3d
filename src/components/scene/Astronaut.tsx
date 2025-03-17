
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function Astronaut({ position = [5, -1, 3] }) {
  const group = useRef<THREE.Group>(null);
  
  // Create a simplified astronaut with basic geometries
  useFrame((state) => {
    if (group.current) {
      // Make the astronaut float slightly
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      // Slowly rotate the astronaut
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <group ref={group} position={position} scale={1.5}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.4} />
      </mesh>
      
      {/* Helmet */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color="#8cb4ff" 
          metalness={0.8} 
          roughness={0.2} 
          transparent={true} 
          opacity={0.9} 
        />
      </mesh>
      
      {/* Backpack */}
      <mesh position={[0, -0.1, -0.5]}>
        <boxGeometry args={[0.8, 0.8, 0.3]} />
        <meshStandardMaterial color="#d4d4d4" metalness={0.3} roughness={0.5} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.7, 0, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
        <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.4} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.3, -1, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[-0.3, -1, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  );
}
