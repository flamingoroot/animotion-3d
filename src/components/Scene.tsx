
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import SolarSystem from "./scene/SolarSystem";
import Stars from "./scene/Stars";

export default function Scene() {
  return (
    <div className="fixed inset-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 50, 120]} />
        <Suspense fallback={null}>
          {/* Custom 3D stars background */}
          <Stars count={8000} />
          
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
