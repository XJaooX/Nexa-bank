import { useState, useEffect } from 'react';
import { ScreenType, Language } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/screens/HomeScreen';
import { BanquePriveeScreen } from './components/screens/BanquePriveeScreen';
import { PatrimoineScreen } from './components/screens/PatrimoineScreen';
import { InvestissementsScreen } from './components/screens/InvestissementsScreen';
import { FinancementScreen } from './components/screens/FinancementScreen';
import { MaisonScreen } from './components/screens/MaisonScreen';
import { AdminScreen } from './components/screens/AdminScreen';
import { EspacePriveModal } from './components/modals/EspacePriveModal';
import { ContactModal } from './components/modals/ContactModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('accueil');
  const [language, setLanguage] = useState<Language>('fr');
  // Dedicated boolean dark mode state — directly toggleable from the header
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [isEspacePriveOpen, setIsEspacePriveOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  // Smooth page transition state
  const [isPageTransitioning, setIsPageTransitioning] = useState<boolean>(false);

  // Smooth luxury navigation with micro-veil and gold hairline progress
  const handleNavigate = (screen: ScreenType) => {
    if (screen === currentScreen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsPageTransitioning(true);

    // Brief silk transition to prevent sudden content jump or reflow
    setTimeout(() => {
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 160);
    }, 140);
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
      {/* Haute Horlogerie Gold Hairline Progress Indicator */}
      {isPageTransitioning && (
        <div className="fixed top-0 inset-x-0 h-[2.5px] z-[60] pointer-events-none overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-[#ECC246] to-transparent w-full shadow-[0_0_12px_rgba(236,194,70,0.9)] animate-gold-progress" />
        </div>
      )}

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

      {/* Discreet Luxury Page Transition Veil */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 pointer-events-none transition-all duration-300 flex items-center justify-center ${
          isPageTransitioning
            ? 'opacity-100 backdrop-blur-[3px]'
            : 'opacity-0 backdrop-blur-none pointer-events-none'
        } ${isDarkTheme ? 'bg-[#0E0E0E]/40' : 'bg-[#FBF9F4]/40'}`}
      >
        <div
          className={`flex flex-col items-center gap-2.5 transition-all duration-300 ${
            isPageTransitioning ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="w-9 h-9 rounded-full border border-[#ECC246]/50 flex items-center justify-center animate-gold-pulse bg-[#141414]/90 shadow-[0_0_20px_rgba(236,194,70,0.25)]">
            <div className="w-2.5 h-2.5 bg-[#ECC246] rotate-45 shadow-[0_0_8px_#ECC246]" />
          </div>
          <span
            className={`text-[9px] tracking-[0.3em] uppercase font-serif ${
              isDarkTheme ? 'text-[#ECC246]/80' : 'text-[#755B00]/80'
            }`}
          >
            Nexa Haute Banque
          </span>
        </div>
      </div>

      {/* Main Content Area with Smooth Page Entry Animation */}
      <main className="w-full pt-24 flex-grow relative">
        <div
          key={currentScreen}
          className={`w-full transition-opacity duration-300 ease-out ${
            isPageTransitioning ? 'opacity-30' : 'opacity-100 animate-page-enter'
          }`}
        >
          {currentScreen === 'accueil' && (
            <HomeScreen
              language={language}
              isDarkTheme={isDarkTheme}
              onNavigate={handleNavigate}
              onOpenEspacePrive={() => setIsEspacePriveOpen(true)}
            />
          )}

          {currentScreen === 'banque-privee' && (
            <BanquePriveeScreen
              language={language}
              isDarkTheme={isDarkTheme}
              onOpenContact={() => setIsContactModalOpen(true)}
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

          {currentScreen === 'admin' && (
            <AdminScreen
              language={language}
              isDarkTheme={isDarkTheme}
              onNavigate={handleNavigate}
            />
          )}
        </div>
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
        onOpenAdmin={() => handleNavigate('admin')}
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
