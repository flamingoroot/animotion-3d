
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import Desert from "./scene/Desert";
import Astronaut from "./scene/Astronaut";
import Stars from "./scene/Stars";

export default function Scene() {
  return (
    <div className="fixed inset-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 3, 15]} />
        <Suspense fallback={null}>
          <Stars />
          <Desert />
          <Astronaut />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.4}
            autoRotate
            autoRotateSpeed={0.1}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
