
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  radius: number;
  position: [number, number, number];
  rotationSpeed: number;
  orbitSpeed: number;
  orbitRadius: number;
  color: string;
  hasRings?: boolean;
  ringColor?: string;
}

const Planet = ({ 
  radius, 
  position, 
  rotationSpeed, 
  orbitSpeed, 
  orbitRadius,
  color,
  hasRings = false,
  ringColor = "#FFFFFF" 
}: PlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * rotationSpeed;
    }
    
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * orbitSpeed;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh 
        ref={planetRef} 
        position={[orbitRadius, 0, 0]}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
      
      {hasRings && (
        <mesh position={[orbitRadius, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.4, radius * 2.2, 64]} />
          <meshBasicMaterial color={ringColor} side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      )}
      
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.1, orbitRadius + 0.1, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default function SolarSystem() {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.05;
    }
  });

  const planets = [
    { 
      name: "Mercury", 
      radius: 1, 
      orbitRadius: 14, 
      rotationSpeed: 0.05, 
      orbitSpeed: 0.008,
      color: "#A0522D"
    },
    { 
      name: "Venus", 
      radius: 1.8, 
      orbitRadius: 20, 
      rotationSpeed: 0.03, 
      orbitSpeed: 0.006,
      color: "#DEB887"
    },
    { 
      name: "Earth", 
      radius: 2, 
      orbitRadius: 28, 
      rotationSpeed: 0.1, 
      orbitSpeed: 0.005,
      color: "#4169E1"
    },
    { 
      name: "Mars", 
      radius: 1.2, 
      orbitRadius: 35, 
      rotationSpeed: 0.08, 
      orbitSpeed: 0.004,
      color: "#CD853F"
    },
    { 
      name: "Jupiter", 
      radius: 4.5, 
      orbitRadius: 48, 
      rotationSpeed: 0.2, 
      orbitSpeed: 0.002,
      color: "#DEB887"
    },
    { 
      name: "Saturn", 
      radius: 4, 
      orbitRadius: 62, 
      rotationSpeed: 0.18, 
      orbitSpeed: 0.0015,
      color: "#F4A460",
      hasRings: true,
      ringColor: "#D2B48C"
    },
    { 
      name: "Uranus", 
      radius: 3, 
      orbitRadius: 74, 
      rotationSpeed: 0.15, 
      orbitSpeed: 0.001,
      color: "#87CEEB",
      hasRings: true,
      ringColor: "#87CEEB"
    },
    { 
      name: "Neptune", 
      radius: 2.8, 
      orbitRadius: 85, 
      rotationSpeed: 0.14, 
      orbitSpeed: 0.0008,
      color: "#4169E1"
    }
  ];

  return (
    <group>
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[8, 64, 64]} />
        <meshBasicMaterial>
          <color attach="color" args={["#FDB813"]} />
        </meshBasicMaterial>
        
        <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" distance={100} />
      </mesh>
      
      {planets.map((planet) => (
        <Planet
          key={planet.name}
          radius={planet.radius}
          position={[planet.orbitRadius, 0, 0]}
          rotationSpeed={planet.rotationSpeed}
          orbitSpeed={planet.orbitSpeed}
          orbitRadius={planet.orbitRadius}
          color={planet.color}
          hasRings={planet.hasRings}
          ringColor={planet.ringColor}
        />
      ))}
    </group>
  );
}
