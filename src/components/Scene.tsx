
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import SolarSystem from "./scene/SolarSystem";
import Stars from "./scene/Stars";
import { useToast } from "@/hooks/use-toast";

export default function Scene() {
  const { toast } = useToast();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Add error handling for the Canvas
    const handleError = (event: ErrorEvent) => {
      console.error("ThreeJS/WebGL Error:", event);
      setHasError(true);
      toast({
        title: "3D Rendering Issue",
        description: "There was a problem rendering the 3D scene. Falling back to simple view.",
        variant: "destructive",
      });
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, [toast]);

  if (hasError) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-black to-blue-950 flex items-center justify-center">
        <div className="text-white">
          <h2 className="text-xl font-bold mb-4">3D Experience Unavailable</h2>
          <p>Your browser may not support 3D rendering.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0">
      <Canvas 
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#000000'));
        }}
        dpr={[1, 2]} // Limit device pixel ratio for better performance
      >
        <PerspectiveCamera makeDefault position={[0, 50, 120]} />
        <Suspense fallback={null}>
          {/* Custom 3D stars background */}
          <Stars count={5000} />
          
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
