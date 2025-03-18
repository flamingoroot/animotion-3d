
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars as DreiStars } from "@react-three/drei";
import { Suspense } from "react";
import SolarSystem from "./scene/SolarSystem";

export default function Scene() {
  return (
    <div className="fixed inset-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 50, 120]} />
        <Suspense fallback={null}>
          {/* Background stars */}
          <DreiStars radius={300} depth={100} count={8000} factor={4} saturation={0.6} fade speed={0.5} />
          
          {/* Add our solar system */}
          <SolarSystem />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            rotateSpeed={0.3}
            zoomSpeed={0.5}
            minDistance={30}
            maxDistance={200}
            autoRotate
            autoRotateSpeed={0.1}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 6}
          />
          
          {/* Add ambient light for general illumination */}
          <ambientLight intensity={0.15} />
        </Suspense>
      </Canvas>
    </div>
  );
}
