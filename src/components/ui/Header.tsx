
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  setCurrentSection: (section: string) => void;
  currentSection: string;
}

export default function Header({ setCurrentSection, currentSection }: HeaderProps) {
  const { currentUser, signOut, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (section: string) => {
    setCurrentSection(section);
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="glassmorphism fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="text-white font-bold text-2xl cursor-pointer" 
          onClick={() => handleNavigation('home')}
        >
          <span className="text-space-purple">Web</span>Skeleton
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a 
            onClick={() => handleNavigation('home')}
            className={`text-sm text-white hover:text-space-purple cursor-pointer transition-colors ${currentSection === 'home' ? 'text-space-purple' : ''}`}
          >
            Home
          </a>
          <a 
            onClick={() => handleNavigation('themes')}
            className={`text-sm text-white hover:text-space-purple cursor-pointer transition-colors ${currentSection === 'themes' ? 'text-space-purple' : ''}`}
          >
            Themes
          </a>
          <a 
            onClick={() => handleNavigation('contact')}
            className={`text-sm text-white hover:text-space-purple cursor-pointer transition-colors ${currentSection === 'contact' ? 'text-space-purple' : ''}`}
          >
            Contact
          </a>
          {isAdmin && (
            <a 
              onClick={() => handleNavigation('admin')}
              className={`text-sm text-white hover:text-space-purple cursor-pointer transition-colors ${currentSection === 'admin' ? 'text-space-purple' : ''}`}
            >
              Admin
            </a>
          )}
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-white">{currentUser.email?.split('@')[0]}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => signOut()}
                className="text-xs"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNavigation('auth')}
              className="text-xs"
            >
              Sign In
            </Button>
          )}
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden mt-4 pb-4"
        >
          <div className="flex flex-col space-y-3">
            <a 
              onClick={() => handleNavigation('home')}
              className={`text-sm text-white hover:text-space-purple cursor-pointer transition-colors ${currentSection === 'home' ? 'text-space-purple' : ''}`}
            >
              Home
            </a>
            <a 
              onClick={() => handleNavigation('themes')}
              className={`text-sm text-white hover:text-space-purple cursor-pointer transition-colors ${currentSection === 'themes' ? 'text-space-purple' : ''}`}
            >
              Themes
            </a>
            <a 
              onClick={() => handleNavigation('contact')}
              className={`text-sm text-white hover:text-space-purple cursor-pointer transition-colors ${currentSection === 'contact' ? 'text-space-purple' : ''}`}
            >
              Contact
            </a>
            {isAdmin && (
              <a 
                onClick={() => handleNavigation('admin')}
                className={`text-sm text-white hover:text-space-purple cursor-pointer transition-colors ${currentSection === 'admin' ? 'text-space-purple' : ''}`}
              >
                Admin
              </a>
            )}
            {currentUser ? (
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-white">{currentUser.email?.split('@')[0]}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="text-xs"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleNavigation('auth')}
                className="text-xs w-full"
              >
                Sign In
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
