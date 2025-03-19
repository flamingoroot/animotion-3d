
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Stars({ count = 1000 }) {
  const starsRef = useRef<THREE.Points>(null);
  
  // Create stars data once using useMemo to avoid re-creation on every render
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Position
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;
      
      // Colors - make stars more white/blue for realism
      const r = 0.7 + Math.random() * 0.3; // Mostly white 
      const g = 0.7 + Math.random() * 0.3;
      const b = 0.8 + Math.random() * 0.2; // More blue
      
      colors[i3] = r;
      colors[i3 + 1] = g;
      colors[i3 + 2] = b;
      
      // Sizes - vary star sizes slightly
      sizes[i] = Math.random() * 1.2;
    }
    
    return [positions, colors, sizes];
  }, [count]);

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        sizeAttenuation
        alphaTest={0.01}
        fog={false}
      />
    </points>
  );
}
