
import { useRef } from 'react';
import { motion } from 'framer-motion';

interface ThemePanelProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  delay: number;
  onClick: () => void;
}

export default function ThemePanel({ title, description, icon, color, delay, onClick }: ThemePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={panelRef}
      className="transparent-panel rounded-lg p-6 w-full max-w-xs cursor-pointer hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}
        style={{ backgroundColor: `${color}30` }}
      >
        <span className="text-4xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 text-center">{title}</h3>
      <p className="text-gray-200 text-sm text-center">{description}</p>
    </motion.div>
  );
}
