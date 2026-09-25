import React, { useState } from 'react';
import { ScreenType, Language } from '../types';
import { translations } from '../data/translations';
import { NexaLogo } from './NexaLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Lock, Sun, Moon, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onOpenEspacePrive: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  language,
  onLanguageChange,
  isDarkTheme,
  onToggleTheme,
  onOpenEspacePrive,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  // Public banking navigation items (Google Drive removed completely)
  const navItems: { id: ScreenType; label: string }[] = [
    { id: 'accueil', label: t.nav.accueil },
    { id: 'banque-privee', label: t.nav.banquePrivee },
    { id: 'patrimoine', label: t.nav.patrimoine },
    { id: 'investissements', label: t.nav.investissements },
    { id: 'financement', label: t.nav.financement },
    { id: 'maison', label: t.nav.maisonNexa },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className={`w-full transition-colors duration-200 backdrop-blur-md ${
          isDarkTheme
            ? 'bg-[#111111]/95 border-b border-[#2B2A26] shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
            : 'bg-[#FBF9F4]/95 border-b border-[#E4E2DD]/80 shadow-[0_1px_12px_rgba(0,0,0,0.03)]'
        }`}
      >
        <div className="h-18 sm:h-20 w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-6 xl:px-10 flex items-center justify-between gap-2 lg:gap-4 xl:gap-6">
          {/* Zone 1: Brand Wordmark (Prominent size, shrink-0) */}
          <div className="flex items-center shrink-0">
            <NexaLogo
              isDark={isDarkTheme}
              showSubtitle={false}
              onClick={() => onNavigate('accueil')}
            />
          </div>

          {/* Zone 2: Navigation Links (Desktop) - No overlapping, shrink-0, nowrap, responsive gaps */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-5.5 shrink-0">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-[10px] xl:text-[11px] 2xl:text-[11.5px] font-medium tracking-[0.10em] xl:tracking-[0.13em] uppercase transition-colors relative py-1 px-0.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? isDarkTheme
                        ? 'text-[#ECC246] font-semibold underline underline-offset-8 decoration-[#DFBE58]'
                        : 'text-[#010101] font-semibold underline underline-offset-8 decoration-[#755B00]'
                      : isDarkTheme
                      ? 'text-[#A3A099] hover:text-[#ECC246]'
                      : 'text-[#444748] hover:text-[#010101]'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Direct Dark/Light Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-3 shrink-0">
            {/* Animated Premium Language Selector */}
            <div className="hidden md:flex items-center">
              <LanguageSwitcher
                language={language}
                onLanguageChange={onLanguageChange}
                isDarkTheme={isDarkTheme}
                size="sm"
              />
            </div>

            {/* Direct Dark / Light Mode Switcher */}
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-1 px-2 py-1.5 transition-colors cursor-pointer border text-xs shrink-0 ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26] text-[#ECC246] hover:bg-[#222222]'
                  : 'bg-[#F0EEE9] border-[#E4E2DD] text-[#755B00] hover:bg-[#EAE8E3]'
              }`}
              title={isDarkTheme ? 'Activer le mode clair' : 'Activer le mode sombre'}
              aria-label="Basculer Mode Sombre / Mode Clair"
            >
              {isDarkTheme ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#ECC246]" />
                  <span className="hidden 2xl:inline text-[10px] uppercase tracking-wider font-medium">Clair</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#755B00]" />
                  <span className="hidden 2xl:inline text-[10px] uppercase tracking-wider font-medium">Sombre</span>
                </>
              )}
            </button>

            {/* Admin Console Switcher Button */}
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer border shrink-0 ${
                currentScreen === 'admin'
                  ? 'bg-[#ECC246] text-black border-[#ECC246] shadow-[0_0_12px_rgba(236,194,70,0.3)]'
                  : isDarkTheme
                  ? 'bg-[#181818] border-[#ECC246]/40 text-[#ECC246] hover:bg-[#ECC246]/10'
                  : 'bg-[#F5F3EE] border-[#755B00]/40 text-[#755B00] hover:bg-[#ECE8DE]'
              }`}
              title="Accéder à la Console Administrateur & Directoire"
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Espace Privé Action Button */}
            <button
              onClick={onOpenEspacePrive}
              className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-[10.5px] xl:text-[11px] font-semibold uppercase tracking-[0.12em] xl:tracking-[0.14em] transition-all cursor-pointer border shrink-0 ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26] text-[#F8F6F1] hover:border-[#ECC246]/60 hover:text-[#ECC246]'
                  : 'bg-[#F5F3EE] border-[#E4E2DD] text-[#010101] hover:bg-[#F0EEE9] hover:border-[#755B00]/40'
              }`}
            >
              <Lock
                className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 shrink-0 ${
                  isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                }`}
              />
              <span className="whitespace-nowrap">{t.nav.espacePrive}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-1.5 ${
                isDarkTheme ? 'text-[#F8F6F1]' : 'text-[#010101]'
              }`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-6 space-y-4 animate-in fade-in duration-200 ${
            isDarkTheme
              ? 'bg-[#141414] border-[#2B2A26] text-[#F8F6F1]'
              : 'bg-[#FBF9F4] border-[#E4E2DD] text-[#1B1C19]'
          }`}
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs uppercase tracking-[0.16em] py-2 font-medium border-b flex items-center justify-between ${
                  currentScreen === item.id
                    ? isDarkTheme
                      ? 'text-[#ECC246] border-[#ECC246]/40 font-bold'
                      : 'text-[#010101] border-[#755B00]/40 font-bold'
                    : isDarkTheme
                    ? 'text-[#A3A099] border-[#2B2A26]'
                    : 'text-[#444748] border-[#E4E2DD]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}

            {/* Mobile Admin Link */}
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs uppercase tracking-[0.16em] py-2.5 font-bold border-b border-[#ECC246]/30 text-[#ECC246] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Console Administrateur</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#ECC246]/20 border border-[#ECC246]/40 font-semibold">
                Directoire
              </span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-inherit">
            <span className="text-xs uppercase tracking-wider opacity-60">Langue</span>
            <LanguageSwitcher
              language={language}
              onLanguageChange={onLanguageChange}
              isDarkTheme={isDarkTheme}
              size="md"
            />
          </div>
        </div>
      )}
    </header>
  );
};
