import React, { useState } from 'react';
import { ScreenType, Language } from '../types';
import { translations } from '../data/translations';
import { NexaLogo } from './NexaLogo';
import { Lock, User, Sun, Moon, Cloud, Menu, X } from 'lucide-react';

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

  const navItems: { id: ScreenType; label: string; icon?: React.ReactNode }[] = [
    { id: 'accueil', label: t.nav.accueil },
    { id: 'patrimoine', label: t.nav.patrimoine },
    { id: 'investissements', label: t.nav.investissements },
    { id: 'financement', label: t.nav.financement },
    { id: 'maison', label: t.nav.maisonNexa },
    {
      id: 'drive',
      label: t.nav.drive,
      icon: <Cloud className="w-3.5 h-3.5 mr-1 inline-block text-[#C9A227]" />,
    },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Discreet Academic Internship Notice Bar */}
      <div
        className={`w-full py-1 px-4 text-center text-[10px] tracking-widest uppercase border-b transition-colors ${
          isDarkTheme
            ? 'bg-[#0A0A0A] border-[#222222] text-[#A3A099]'
            : 'bg-[#F0EEE9] border-[#E4E2DD] text-[#66645E]'
        }`}
      >
        <span>{t.stageNotice}</span>
      </div>

      <div
        className={`w-full transition-colors duration-200 backdrop-blur-md ${
          isDarkTheme
            ? 'bg-[#111111]/95 border-b border-[#2B2A26] shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
            : 'bg-[#FBF9F4]/95 border-b border-[#E4E2DD]/80 shadow-[0_1px_12px_rgba(0,0,0,0.03)]'
        }`}
      >
        <div className="h-16 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center">
            <NexaLogo
              isDark={isDarkTheme}
              subtitleText={t.nav.banquePrivee}
              onClick={() => onNavigate('accueil')}
            />
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-[11px] font-medium tracking-[0.16em] uppercase transition-colors relative py-1 cursor-pointer flex items-center ${
                    isActive
                      ? isDarkTheme
                        ? 'text-[#ECC246] font-semibold underline underline-offset-8 decoration-[#DFBE58]'
                        : 'text-[#010101] font-semibold underline underline-offset-8 decoration-[#755B00]'
                      : isDarkTheme
                      ? 'text-[#A3A099] hover:text-[#ECC246]'
                      : 'text-[#444748] hover:text-[#010101]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Direct Dark/Light Toggle */}
          <div className="flex items-center gap-3.5">
            {/* Language Selector */}
            <div
              className={`hidden sm:flex items-center gap-1.5 text-[11px] font-semibold tracking-wider ${
                isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
              }`}
            >
              {(['fr', 'en', 'pt'] as Language[]).map((lang, idx) => (
                <React.Fragment key={lang}>
                  {idx > 0 && <span className="opacity-30">|</span>}
                  <button
                    onClick={() => onLanguageChange(lang)}
                    className={`uppercase cursor-pointer transition-colors px-1 py-0.5 ${
                      language === lang
                        ? isDarkTheme
                          ? 'text-[#ECC246] font-bold'
                          : 'text-[#010101] font-bold'
                        : 'hover:opacity-100 opacity-60'
                    }`}
                    title={lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'Português'}
                  >
                    {lang}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Direct Dark / Light Mode Switcher */}
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 transition-colors cursor-pointer border text-xs ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26] text-[#ECC246] hover:bg-[#222222]'
                  : 'bg-[#F0EEE9] border-[#E4E2DD] text-[#755B00] hover:bg-[#EAE8E3]'
              }`}
              title={isDarkTheme ? 'Activer le mode clair' : 'Activer le mode sombre'}
              aria-label="Basculer Mode Sombre / Mode Clair"
            >
              {isDarkTheme ? (
                <>
                  <Sun className="w-4 h-4 text-[#ECC246]" />
                  <span className="hidden md:inline text-[10px] uppercase tracking-wider font-medium">Clair</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#755B00]" />
                  <span className="hidden md:inline text-[10px] uppercase tracking-wider font-medium">Sombre</span>
                </>
              )}
            </button>

            {/* Espace Privé Action Button */}
            <button
              onClick={onOpenEspacePrive}
              className={`group flex items-center gap-2 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26] text-[#F8F6F1] hover:border-[#ECC246]/60 hover:text-[#ECC246]'
                  : 'bg-[#F5F3EE] border-[#E4E2DD] text-[#010101] hover:bg-[#F0EEE9] hover:border-[#755B00]/40'
              }`}
            >
              <Lock
                className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                  isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                }`}
              />
              <span className="whitespace-nowrap">{t.nav.espacePrive}</span>
            </button>

            {/* User Avatar Direct Access */}
            <button
              onClick={onOpenEspacePrive}
              className={`w-8 h-8 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer ${
                isDarkTheme
                  ? 'bg-[#1F1F1F] text-[#ECC246] border border-[#2B2A26]'
                  : 'bg-[#010101] text-[#FBF9F4]'
              }`}
              aria-label="Profil Sociétaire"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 ${
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
                className={`text-left text-xs uppercase tracking-[0.16em] py-2 font-medium border-b flex items-center ${
                  currentScreen === item.id
                    ? isDarkTheme
                      ? 'text-[#ECC246] border-[#ECC246]/40 font-bold'
                      : 'text-[#010101] border-[#755B00]/40 font-bold'
                    : isDarkTheme
                    ? 'text-[#A3A099] border-[#2B2A26]'
                    : 'text-[#444748] border-[#E4E2DD]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider opacity-60">Langue</span>
            <div className="flex items-center gap-3 text-xs font-semibold uppercase">
              {(['fr', 'en', 'pt'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-1 ${
                    language === lang
                      ? isDarkTheme
                        ? 'bg-[#ECC246] text-black'
                        : 'bg-black text-white'
                      : 'opacity-60'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
