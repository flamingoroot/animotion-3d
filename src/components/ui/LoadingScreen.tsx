
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        const newProgress = oldProgress + Math.random() * 10;
        return Math.min(newProgress, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-space-dark z-50">
      <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 font-space animate-pulse">
        WebSkeleton
      </h1>
      <div className="w-64 sm:w-96 mb-8">
        <Progress value={progress} className="h-2" />
      </div>
      <p className="text-white text-sm sm:text-base font-space">
        Loading 3D Experience... {Math.round(progress)}%
      </p>
    </div>
  );
}
