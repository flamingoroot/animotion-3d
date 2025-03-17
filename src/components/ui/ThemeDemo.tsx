
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ThemeDemoProps {
  themeId: string;
  images: string[];
}

export default function ThemeDemo({ themeId, images }: ThemeDemoProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <div className="relative w-full overflow-hidden rounded-lg mb-6 aspect-video bg-gray-800/20">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Loading placeholder */}
        <div className="text-gray-400">Loading demo previews...</div>
      </div>
      
      {/* Demo image */}
      <motion.div 
        className="w-full h-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </motion.div>
      
      {/* Navigation buttons */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
        <button 
          onClick={prevImage}
          className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          ←
        </button>
        <button 
          onClick={nextImage}
          className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          →
        </button>
      </div>
      
      {/* Indicator dots */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
