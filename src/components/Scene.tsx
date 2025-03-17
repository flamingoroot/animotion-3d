
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars as DreiStars } from "@react-three/drei";
import { Suspense } from "react";
import SolarSystem from "./scene/SolarSystem";

export default function Scene() {
  return (
    <div className="fixed inset-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 20, 80]} />
        <Suspense fallback={null}>
          {/* Use Drei's Stars component for the background */}
          <DreiStars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />
          
          {/* Add our solar system */}
          <SolarSystem />
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.2}
            autoRotate
            autoRotateSpeed={0.05}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 6}
          />
          
          {/* Add ambient light for general illumination */}
          <ambientLight intensity={0.1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
