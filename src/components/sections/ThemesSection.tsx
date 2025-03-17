
import { motion } from 'framer-motion';
import ThemePanel from '@/components/ui/ThemePanel';

interface ThemesSectionProps {
  setDetailTheme: (theme: string) => void;
}

export default function ThemesSection({ setDetailTheme }: ThemesSectionProps) {
  const themes = [
    {
      id: 'ecommerce',
      title: 'E-commerce',
      description: 'Perfect for online stores with product catalogs, shopping carts and secure payments.',
      icon: '🛒',
      color: '#F97316',
      delay: 0.2,
    },
    {
      id: 'course',
      title: 'Course Selling',
      description: 'Designed for educators with course management, student portals and payment processing.',
      icon: '🎓',
      color: '#9b87f5', 
      delay: 0.4,
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      description: 'Showcase your work with beautiful galleries, project spotlights and contact forms.',
      icon: '🎨',
      color: '#D946EF',
      delay: 0.6,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center z-10"
    >
      <div className="text-center max-w-5xl px-4 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-8 font-space"
        >
          Choose Your Perfect Theme
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {themes.map((theme) => (
            <ThemePanel
              key={theme.id}
              title={theme.title}
              description={theme.description}
              icon={theme.icon}
              color={theme.color}
              delay={theme.delay}
              onClick={() => setDetailTheme(theme.id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
