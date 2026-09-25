import { useState, useEffect } from 'react';
import { ScreenType, Language } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/screens/HomeScreen';
import { PatrimoineScreen } from './components/screens/PatrimoineScreen';
import { InvestissementsScreen } from './components/screens/InvestissementsScreen';
import { FinancementScreen } from './components/screens/FinancementScreen';
import { MaisonScreen } from './components/screens/MaisonScreen';
import { GoogleDriveScreen } from './components/screens/GoogleDriveScreen';
import { EspacePriveModal } from './components/modals/EspacePriveModal';
import { ContactModal } from './components/modals/ContactModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('accueil');
  const [language, setLanguage] = useState<Language>('fr');
  // Dedicated boolean dark mode state — directly toggleable from the header
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [isEspacePriveOpen, setIsEspacePriveOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Scroll to top upon navigating to a new screen
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Keep HTML root class in sync for system dark mode styles
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0E0E0E';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#FBF9F4';
    }
  }, [isDarkTheme]);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-[#ECC246]/40 selection:text-black ${
        isDarkTheme ? 'bg-[#0E0E0E] text-[#F8F6F1]' : 'bg-[#FBF9F4] text-[#1B1C19]'
      }`}
    >
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        onOpenEspacePrive={() => setIsEspacePriveOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-24 flex-grow">
        {currentScreen === 'accueil' && (
          <HomeScreen
            language={language}
            isDarkTheme={isDarkTheme}
            onNavigate={handleNavigate}
            onOpenEspacePrive={() => setIsEspacePriveOpen(true)}
          />
        )}

        {currentScreen === 'patrimoine' && (
          <PatrimoineScreen
            language={language}
            isDarkTheme={isDarkTheme}
            onOpenContact={() => setIsContactModalOpen(true)}
          />
        )}

        {currentScreen === 'investissements' && (
          <InvestissementsScreen
            language={language}
            isDarkTheme={isDarkTheme}
            onOpenContact={() => setIsContactModalOpen(true)}
          />
        )}

        {currentScreen === 'financement' && (
          <FinancementScreen
            language={language}
            isDarkTheme={isDarkTheme}
            onOpenContact={() => setIsContactModalOpen(true)}
          />
        )}

        {currentScreen === 'maison' && (
          <MaisonScreen
            language={language}
            isDarkTheme={isDarkTheme}
            onOpenContact={() => setIsContactModalOpen(true)}
          />
        )}

        {currentScreen === 'drive' && (
          <GoogleDriveScreen
            language={language}
            isDarkTheme={isDarkTheme}
          />
        )}
      </main>

      {/* Haute Banque Footer */}
      <Footer
        isDarkTheme={isDarkTheme}
        language={language}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Espace Privé Client Portal Modal */}
      <EspacePriveModal
        isOpen={isEspacePriveOpen}
        onClose={() => setIsEspacePriveOpen(false)}
        language={language}
        onOpenDrive={() => handleNavigate('drive')}
      />

      {/* Confidential Consultation / Private Visit Scheduler Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        language={language}
      />
    </div>
  );
}
