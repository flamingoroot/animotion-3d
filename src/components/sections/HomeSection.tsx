
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HomeSection({ onThemeClick }: { onThemeClick: () => void }) {
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateText(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center max-w-2xl px-4 z-10 pointer-events-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animateText ? 1 : 0, y: animateText ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 font-space"
        >
          Create Your <span className="text-space-purple">Dream</span> Website
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animateText ? 1 : 0, y: animateText ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-white text-lg mb-8"
        >
          Professional web development services with stunning themes for every need
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animateText ? 1 : 0, y: animateText ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onThemeClick}
          className="bg-space-purple hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
        >
          Explore Themes
        </motion.button>
      </div>
    </div>
  );
}
