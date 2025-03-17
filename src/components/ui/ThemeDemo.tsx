
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ThemeDemoProps {
  themeId: string;
  demoUrl: string;
}

export default function ThemeDemo({ themeId, demoUrl }: ThemeDemoProps) {
  const handleDemoClick = () => {
    // Open demo in a new tab
    window.open(demoUrl, '_blank');
  };
  
  return (
    <div className="w-full mb-6 flex justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          onClick={handleDemoClick}
          className="text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform"
          style={{ backgroundColor: getThemeColor(themeId) }}
        >
          <span className="mr-2">✨</span>
          View Live Demo
          <span className="ml-2">→</span>
        </Button>
      </motion.div>
    </div>
  );
}

// Helper function to get theme color
function getThemeColor(themeId: string): string {
  const colors = {
    'ecommerce': '#F97316',
    'course': '#9b87f5',
    'portfolio': '#D946EF',
    'default': '#7C3AED'
  };
  
  return colors[themeId as keyof typeof colors] || colors.default;
}
