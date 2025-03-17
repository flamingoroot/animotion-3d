
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ThemeDemo from '@/components/ui/ThemeDemo';

interface ThemeDetailSectionProps {
  themeId: string;
  onBackClick: () => void;
}

export default function ThemeDetailSection({ themeId, onBackClick }: ThemeDetailSectionProps) {
  const { currentUser } = useAuth();
  const [ordered, setOrdered] = useState(false);

  // Sample demo images for each theme
  const demoImages = {
    ecommerce: [
      'https://cdn.dribbble.com/users/1126935/screenshots/16741458/media/82626ccba19b9fc153b6525b32e45c7e.png',
      'https://cdn.dribbble.com/users/1126935/screenshots/17158369/media/1549124f6df873c7b52f43a8ab55c080.png',
      'https://cdn.dribbble.com/users/1126935/screenshots/16895543/media/8f19aeb2ece4ca396dbf59f47c0bb58e.png',
    ],
    course: [
      'https://cdn.dribbble.com/users/1126935/screenshots/15307553/media/3e59c9bf4ed1fb4c686fce58c2cc1ecb.png',
      'https://cdn.dribbble.com/users/1126935/screenshots/14641194/media/b20be3cf847fcb2c2a681b8e47cd04fd.png',
      'https://cdn.dribbble.com/users/1126935/screenshots/14743064/media/6c9b9a21b77815cafe3813eab0d5af19.png',
    ],
    portfolio: [
      'https://cdn.dribbble.com/users/1126935/screenshots/16264906/media/d1ffae357ceb72e24bb9a00a803ca61a.png',
      'https://cdn.dribbble.com/users/1126935/screenshots/16152014/media/7eafdbb1132423ffbe55558fd6734b49.png',
      'https://cdn.dribbble.com/users/1126935/screenshots/15750171/media/9c5264a0301af3c1f9d38f51fa5f47f3.png',
    ],
  };

  const themes = {
    ecommerce: {
      title: 'E-commerce Theme',
      description: 'Our e-commerce theme is designed to help you sell products online with a beautiful and functional store.',
      features: [
        'Product catalog with filtering and search',
        'Shopping cart and checkout system',
        'Payment gateway integration',
        'Inventory management',
        'Customer accounts and order history',
        'Mobile-responsive design',
      ],
      color: '#F97316',
      icon: '🛒',
    },
    course: {
      title: 'Course Selling Theme',
      description: 'Create an online learning platform to sell and manage your educational content with our course theme.',
      features: [
        'Course catalog and enrollment system',
        'Video lesson player with progress tracking',
        'Quiz and assessment tools',
        'Student dashboard and certificates',
        'Instructor profiles and analytics',
        'Discussion forums and messaging',
      ],
      color: '#9b87f5',
      icon: '🎓',
    },
    portfolio: {
      title: 'Portfolio Theme',
      description: 'Showcase your work and talents with our elegant portfolio theme designed for creative professionals.',
      features: [
        'Project gallery with filtering options',
        'About me and skills sections',
        'Contact form and social media integration',
        'Testimonials and client logos',
        'Blog functionality',
        'Resume/CV display',
      ],
      color: '#D946EF',
      icon: '🎨',
    },
  };

  const theme = themes[themeId as keyof typeof themes];
  const currentThemeDemos = demoImages[themeId as keyof typeof demoImages] || [];

  const handleOrder = () => {
    if (!currentUser) {
      // Redirect to auth if not logged in
      return;
    }
    // In a real app, this would initiate the ordering process
    setOrdered(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center z-10"
    >
      <div className="transparent-panel rounded-lg p-8 max-w-4xl mx-auto my-4 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBackClick}
            className="text-white hover:text-space-purple mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
            style={{ backgroundColor: `${theme.color}30` }}
          >
            <span className="text-2xl">{theme.icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-space">{theme.title}</h2>
        </div>
        
        {/* Theme Demo */}
        <ThemeDemo themeId={themeId} images={currentThemeDemos} />
        
        <p className="text-gray-200 mb-6">{theme.description}</p>
        
        <h3 className="text-xl font-semibold text-white mb-4 font-space">Key Features</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {theme.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-space-purple mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-200">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <span className="text-gray-300 block mb-1">Starting from</span>
            <div className="text-3xl font-bold text-white">$599</div>
          </div>
          
          {ordered ? (
            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded">
              Thanks for your order! We'll contact you soon.
            </div>
          ) : (
            <Button 
              onClick={handleOrder}
              style={{ backgroundColor: theme.color }}
              className="px-8 py-3 text-white font-bold"
            >
              {currentUser ? 'Order Now' : 'Sign In to Order'}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
