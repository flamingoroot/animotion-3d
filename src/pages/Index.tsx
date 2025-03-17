import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Scene from '@/components/Scene';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Header from '@/components/ui/Header';
import HomeSection from '@/components/sections/HomeSection';
import ThemesSection from '@/components/sections/ThemesSection';
import ThemeDetailSection from '@/components/sections/ThemeDetailSection';
import ContactSection from '@/components/sections/ContactSection';
import AuthSection from '@/components/sections/AuthSection';
import AdminSection from '@/components/sections/AdminSection';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [detailTheme, setDetailTheme] = useState<string | null>(null);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleThemeClick = () => {
    setCurrentSection('themes');
  };

  const handleBackToThemes = () => {
    setDetailTheme(null);
  };

  const renderSection = () => {
    if (detailTheme) {
      return (
        <ThemeDetailSection 
          themeId={detailTheme} 
          onBackClick={handleBackToThemes} 
        />
      );
    }

    switch (currentSection) {
      case 'home':
        return <HomeSection onThemeClick={handleThemeClick} />;
      case 'themes':
        return <ThemesSection setDetailTheme={setDetailTheme} />;
      case 'contact':
        return <ContactSection />;
      case 'auth':
        return <AuthSection />;
      case 'admin':
        return <AdminSection />;
      default:
        return <HomeSection onThemeClick={handleThemeClick} />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-space-dark">
      {loading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <Scene />
          <Header 
            setCurrentSection={setCurrentSection} 
            currentSection={currentSection} 
          />
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Index;
