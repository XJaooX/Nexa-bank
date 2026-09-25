import React, { useState } from 'react';
import { Language, ScreenType } from '../../types';
import { translations } from '../../data/translations';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  PhoneCall,
  Mail,
  ShieldCheck,
  Fingerprint,
  Lock,
  Headphones,
  Landmark,
  TrendingUp,
  Building2,
  Quote,
} from 'lucide-react';

interface HomeScreenProps {
  language: Language;
  isDarkTheme: boolean;
  onNavigate: (screen: ScreenType) => void;
  onOpenEspacePrive: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  isDarkTheme,
  onNavigate,
  onOpenEspacePrive,
}) => {
  const t = translations[language].home;

  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    salon: 'Genève — Rue du Rhône',
    nature: 'Gestion de Fortune & Family Office',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(true);

  const heroImgUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBi0xMP8Cj1Cj0udVKJtpc3viJChqo9dyCE0Q0YYPr70lewRvW3qFO7ZLFgP8Vjw6bWEflHvJ1GZEpfR55eWBrz9mTXrHj45uy-vUPaKStnoWoI6zjJncW0hwJoEjRGenwaz1ebP4c5kK_HZws5dHNisG3nsZBvSdZY_E8h5mjvtX5R7lwxAEFWiCTxgiRcze8tvkHXPEO0ZHrjmz_J38HyulCmXZV10nnGUAWmOEFNoY-V28wkH15j';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName || !formState.email) return;
    setFormSubmitted(true);
  };

  return (
    <div
      className={`flex flex-col w-full transition-colors duration-200 animate-in fade-in ${
        isDarkTheme ? 'bg-[#0E0E0E] text-[#F8F6F1]' : 'bg-[#FBF9F4] text-[#1B1C19]'
      }`}
    >
      {/* Editorial Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Wealth Statement */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 z-10">
            <div
              className={`inline-flex items-center gap-2 ${
                isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
              }`}
            >
              <span
                className={`w-8 h-[1px] ${
                  isDarkTheme ? 'bg-[#ECC246]' : 'bg-[#755B00]'
                }`}
              ></span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                {t.kicker}
              </span>
            </div>

            <h1
              className={`font-serif text-3xl sm:text-4xl lg:text-[54px] tracking-tight leading-[1.08] text-balance ${
                isDarkTheme ? 'text-[#F8F6F1]' : 'text-[#010101]'
              }`}
            >
              {t.heroTitle}
            </h1>

            <p
              className={`text-[16px] lg:text-[17px] font-light leading-relaxed max-w-xl ${
                isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
              }`}
            >
              {t.heroDescription}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-5">
              <a
                href="#contact"
                className={`inline-flex items-center justify-center px-6 py-4 text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-200 group cursor-pointer ${
                  isDarkTheme
                    ? 'bg-[#C9A227] text-black hover:bg-[#DFBE58]'
                    : 'bg-[#010101] text-[#FBF9F4] hover:bg-[#1C1C1C]'
                }`}
              >
                <span>{t.initiateRelation}</span>
                <ArrowRight
                  className={`w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 ${
                    isDarkTheme ? 'text-black' : 'text-[#ECC246]'
                  }`}
                />
              </a>

              <button
                onClick={() => onNavigate('maison')}
                className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors py-2 cursor-pointer font-medium ${
                  isDarkTheme
                    ? 'text-[#F8F6F1] hover:text-[#ECC246]'
                    : 'text-[#010101] hover:text-[#755B00]'
                }`}
              >
                <span>{t.discoverMaison}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Qualitative Fiduciary Highlights (No fake numbers) */}
            <div
              className={`pt-4 mt-2 p-6 border ${
                isDarkTheme
                  ? 'bg-[#141414] border-[#2B2A26]'
                  : 'bg-[#F5F3EE] border-[#E4E2DD]/70'
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <span
                    className={`font-serif text-xl lg:text-2xl block leading-tight font-medium ${
                      isDarkTheme ? 'text-[#ECC246]' : 'text-[#010101]'
                    }`}
                  >
                    {t.stat1Value}
                  </span>
                  <span
                    className={`text-[10px] tracking-wider uppercase mt-2 block font-medium ${
                      isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                    }`}
                  >
                    {t.stat1Label}
                  </span>
                </div>
                <div
                  className={`w-[1px] h-10 ${
                    isDarkTheme ? 'bg-[#2B2A26]' : 'bg-[#C4C7C7]/50'
                  }`}
                ></div>
                <div>
                  <span
                    className={`font-serif text-xl lg:text-2xl block leading-tight font-medium ${
                      isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                    }`}
                  >
                    {t.stat2Value}
                  </span>
                  <span
                    className={`text-[10px] tracking-wider uppercase mt-2 block font-medium ${
                      isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                    }`}
                  >
                    {t.stat2Label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography */}
          <div className="lg:col-span-7 relative flex flex-col mt-6 lg:mt-0">
            <div
              className={`relative overflow-hidden shadow-xl border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26]'
                  : 'bg-[#E4E2DD] border-[#E4E2DD]'
              }`}
            >
              {imgLoaded ? (
                <img
                  src={heroImgUrl}
                  alt="Pavillon Privé Nexa — Architecture moderne en pierre de travertin avec bassin miroir"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover filter contrast-[1.03]"
                  onError={() => setImgLoaded(false)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-[520px] bg-gradient-to-tr from-[#1C1C1C] via-[#2A2926] to-[#755B00]/40 flex flex-col justify-end p-8 text-[#F8F6F1]">
                  <p className="font-serif text-2xl italic">
                    Pavillon Privé Nexa — Genève &amp; Paris
                  </p>
                </div>
              )}

              {/* Gradient Overlay & Captions */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#010101]/85 via-[#010101]/40 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-[#FBF9F4]">
                <div>
                  <span className="text-[10px] text-[#ECC246] tracking-[0.18em] uppercase font-semibold">
                    {t.architectureDiscretion}
                  </span>
                  <p className="font-serif text-base text-[#FBF9F4] italic mt-0.5">
                    {t.photoSubtitle}
                  </p>
                </div>
                <span className="text-[11px] text-[#FBF9F4]/80 tracking-widest font-mono">
                  {t.confidentialSerenity}
                </span>
              </div>
            </div>

            {/* Tiers de Confiance Floating Card */}
            <div
              className={`hidden lg:flex absolute -bottom-6 -left-6 p-5 shadow-lg border max-w-xs flex-col space-y-1.5 z-20 ${
                isDarkTheme
                  ? 'bg-[#141414] border-[#2B2A26] text-[#F8F6F1]'
                  : 'bg-white border-[#E4E2DD] text-[#1B1C19]'
              }`}
            >
              <div
                className={`flex items-center gap-2 ${
                  isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] tracking-widest uppercase font-semibold">
                  {t.trustBadgeTitle}
                </span>
              </div>
              <p
                className={`text-[12px] font-light leading-relaxed ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#1B1C19]'
                }`}
              >
                {t.trustBadgeDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Piliers d'Ingénierie Financière */}
      <section
        className={`w-full py-20 my-6 border-y ${
          isDarkTheme
            ? 'bg-[#131313] border-[#2B2A26]'
            : 'bg-[#F5F3EE] border-[#E4E2DD]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-xl space-y-2">
              <span
                className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
                  isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                }`}
              >
                {t.pillarsKicker}
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl tracking-tight">
                {t.pillarsTitle}
              </h2>
            </div>
            <p
              className={`text-[14px] max-w-md font-light leading-relaxed ${
                isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
              }`}
            >
              {t.pillarsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 01: Patrimoine */}
            <div
              onClick={() => onNavigate('patrimoine')}
              className={`p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-md cursor-pointer group border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26] hover:bg-[#1E1E1E]'
                  : 'bg-[#F0EEE9] border-[#E4E2DD]/60 hover:bg-[#EAE8E3]'
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-serif text-3xl font-light ${
                      isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                    }`}
                  >
                    01
                  </span>
                  <Landmark
                    className={`w-5 h-5 transition-colors ${
                      isDarkTheme
                        ? 'text-[#A3A099] group-hover:text-[#ECC246]'
                        : 'text-[#444748] group-hover:text-[#010101]'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl">{t.pillar1Title}</h3>
                  <p
                    className={`text-[14px] font-light leading-relaxed ${
                      isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                    }`}
                  >
                    {t.pillar1Desc}
                  </p>
                </div>
              </div>
              <div
                className={`pt-8 mt-4 flex items-center justify-between border-t ${
                  isDarkTheme ? 'border-[#2B2A26]' : 'border-[#E4E2DD]'
                }`}
              >
                <span
                  className={`text-[11px] uppercase tracking-wider font-semibold transition-colors ${
                    isDarkTheme
                      ? 'text-[#F8F6F1] group-hover:text-[#ECC246]'
                      : 'text-[#010101] group-hover:text-[#755B00]'
                  }`}
                >
                  {t.pillar1Action}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                  }`}
                />
              </div>
            </div>

            {/* Pillar 02: Investissements */}
            <div
              onClick={() => onNavigate('investissements')}
              className={`p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-md cursor-pointer group border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26] hover:bg-[#1E1E1E]'
                  : 'bg-[#EAE8E3] border-[#E4E2DD] hover:bg-[#E4E2DD]'
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-serif text-3xl font-light ${
                      isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                    }`}
                  >
                    02
                  </span>
                  <TrendingUp
                    className={`w-5 h-5 transition-colors ${
                      isDarkTheme
                        ? 'text-[#A3A099] group-hover:text-[#ECC246]'
                        : 'text-[#444748] group-hover:text-[#010101]'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl">{t.pillar2Title}</h3>
                  <p
                    className={`text-[14px] font-light leading-relaxed ${
                      isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                    }`}
                  >
                    {t.pillar2Desc}
                  </p>
                </div>
              </div>
              <div
                className={`pt-8 mt-4 flex items-center justify-between border-t ${
                  isDarkTheme ? 'border-[#2B2A26]' : 'border-[#E4E2DD]'
                }`}
              >
                <span
                  className={`text-[11px] uppercase tracking-wider font-semibold transition-colors ${
                    isDarkTheme
                      ? 'text-[#F8F6F1] group-hover:text-[#ECC246]'
                      : 'text-[#010101] group-hover:text-[#755B00]'
                  }`}
                >
                  {t.pillar2Action}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                  }`}
                />
              </div>
            </div>

            {/* Pillar 03: Financement */}
            <div
              onClick={() => onNavigate('financement')}
              className={`p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-md cursor-pointer group border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26] hover:bg-[#1E1E1E]'
                  : 'bg-[#F0EEE9] border-[#E4E2DD]/60 hover:bg-[#EAE8E3]'
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-serif text-3xl font-light ${
                      isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                    }`}
                  >
                    03
                  </span>
                  <Building2
                    className={`w-5 h-5 transition-colors ${
                      isDarkTheme
                        ? 'text-[#A3A099] group-hover:text-[#ECC246]'
                        : 'text-[#444748] group-hover:text-[#010101]'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl">{t.pillar3Title}</h3>
                  <p
                    className={`text-[14px] font-light leading-relaxed ${
                      isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                    }`}
                  >
                    {t.pillar3Desc}
                  </p>
                </div>
              </div>
              <div
                className={`pt-8 mt-4 flex items-center justify-between border-t ${
                  isDarkTheme ? 'border-[#2B2A26]' : 'border-[#E4E2DD]'
                }`}
              >
                <span
                  className={`text-[11px] uppercase tracking-wider font-semibold transition-colors ${
                    isDarkTheme
                      ? 'text-[#F8F6F1] group-hover:text-[#ECC246]'
                      : 'text-[#010101] group-hover:text-[#755B00]'
                  }`}
                >
                  {t.pillar3Action}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocoles d'Accès Souverains (Espace Privé Sécurisé) */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div
          className={`p-8 lg:p-14 relative overflow-hidden shadow-2xl border ${
            isDarkTheme
              ? 'bg-[#141414] border-[#2B2A26] text-[#F8F6F1]'
              : 'bg-[#010101] text-[#FBF9F4]'
          }`}
        >
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C9A227]/15 pointer-events-none blur-3xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1">
                <ShieldCheck className="w-4 h-4 text-[#ECC246]" />
                <span className="text-[10px] text-[#ECC246] uppercase tracking-widest font-semibold">
                  {t.portalKicker}
                </span>
              </div>

              <h2 className="font-serif text-3xl lg:text-4xl leading-tight">
                {t.portalTitle}
              </h2>

              <p
                className={`text-[16px] font-light max-w-2xl leading-relaxed ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#F2F1EC]/90'
                }`}
              >
                {t.portalDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2 opacity-90">
                  <Fingerprint className="w-4 h-4 text-[#ECC246]" />
                  <span className="text-xs">{t.fido2}</span>
                </div>
                <div className="flex items-center gap-2 opacity-90">
                  <Lock className="w-4 h-4 text-[#ECC246]" />
                  <span className="text-xs">{t.aes256}</span>
                </div>
                <div className="flex items-center gap-2 opacity-90">
                  <Headphones className="w-4 h-4 text-[#ECC246]" />
                  <span className="text-xs">{t.directLine}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:items-start lg:items-end justify-center pt-4 lg:pt-0">
              <button
                onClick={onOpenEspacePrive}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 bg-[#ECC246] text-[#241A00] text-[11px] uppercase tracking-[0.16em] font-semibold hover:bg-[#FFE08E] transition-all shadow-md group cursor-pointer"
              >
                <Lock className="w-4 h-4 mr-2" />
                <span>{t.accessPortal}</span>
              </button>
              <span className="text-[11px] opacity-70 mt-2 tracking-wider uppercase font-medium">
                {t.societairesOnly}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Directoire Quote */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-16 text-center">
        <div className="space-y-5 flex flex-col items-center">
          <Quote
            className={`w-8 h-8 opacity-80 ${
              isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
            }`}
          />
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed max-w-3xl">
            {t.quote}
          </blockquote>
          <div className="pt-2 flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
              {t.quoteAuthor}
            </span>
            <span
              className={`text-[13px] font-light mt-0.5 ${
                isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
              }`}
            >
              {t.quoteRole}
            </span>
          </div>
        </div>
      </section>

      {/* Confidential Contact & Salons Inquiry */}
      <section
        className={`w-full py-16 border-t ${
          isDarkTheme
            ? 'bg-[#131313] border-[#2B2A26]'
            : 'bg-[#F0EEE9] border-[#E4E2DD]'
        }`}
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Contact Narrative */}
            <div className="lg:col-span-5 space-y-4">
              <span
                className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
                  isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                }`}
              >
                {t.contactKicker}
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl tracking-tight">
                {t.contactTitle}
              </h2>
              <p
                className={`text-[15px] font-light leading-relaxed ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.contactDesc}
              </p>

              <div className="pt-4 space-y-3 text-[13px]">
                <div className="flex items-center gap-3">
                  <PhoneCall
                    className={`w-4 h-4 ${
                      isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                    }`}
                  />
                  <span>{t.directorLine}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail
                    className={`w-4 h-4 ${
                      isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                    }`}
                  />
                  <span>{t.directorMail}</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div
              className={`lg:col-span-7 p-8 lg:p-10 shadow-sm border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26]'
                  : 'bg-white border-[#E4E2DD]'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      className={`text-[10px] uppercase tracking-widest block font-semibold ${
                        isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                      }`}
                    >
                      {t.formName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.fullName}
                      onChange={(e) =>
                        setFormState({ ...formState, fullName: e.target.value })
                      }
                      placeholder={t.formNamePlaceholder}
                      className={`w-full p-3 text-sm focus:outline-none border transition-colors ${
                        isDarkTheme
                          ? 'bg-[#121212] border-[#2B2A26] text-[#F8F6F1] focus:border-[#ECC246]'
                          : 'bg-[#F5F3EE] border-transparent text-[#1B1C19] focus:bg-white focus:border-[#755B00]'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className={`text-[10px] uppercase tracking-widest block font-semibold ${
                        isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                      }`}
                    >
                      {t.formEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder={t.formEmailPlaceholder}
                      className={`w-full p-3 text-sm focus:outline-none border transition-colors ${
                        isDarkTheme
                          ? 'bg-[#121212] border-[#2B2A26] text-[#F8F6F1] focus:border-[#ECC246]'
                          : 'bg-[#F5F3EE] border-transparent text-[#1B1C19] focus:bg-white focus:border-[#755B00]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      className={`text-[10px] uppercase tracking-widest block font-semibold ${
                        isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                      }`}
                    >
                      {t.formSalon}
                    </label>
                    <select
                      value={formState.salon}
                      onChange={(e) =>
                        setFormState({ ...formState, salon: e.target.value })
                      }
                      className={`w-full p-3 text-sm focus:outline-none border transition-colors ${
                        isDarkTheme
                          ? 'bg-[#121212] border-[#2B2A26] text-[#F8F6F1] focus:border-[#ECC246]'
                          : 'bg-[#F5F3EE] border-transparent text-[#1B1C19] focus:bg-white focus:border-[#755B00]'
                      }`}
                    >
                      <option>Genève — Rue du Rhône</option>
                      <option>Paris — Place Vendôme</option>
                      <option>Luxembourg — Bd Royal</option>
                      <option>Échange Visioconférence Chiffré</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className={`text-[10px] uppercase tracking-widest block font-semibold ${
                        isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                      }`}
                    >
                      {t.formNature}
                    </label>
                    <select
                      value={formState.nature}
                      onChange={(e) =>
                        setFormState({ ...formState, nature: e.target.value })
                      }
                      className={`w-full p-3 text-sm focus:outline-none border transition-colors ${
                        isDarkTheme
                          ? 'bg-[#121212] border-[#2B2A26] text-[#F8F6F1] focus:border-[#ECC246]'
                          : 'bg-[#F5F3EE] border-transparent text-[#1B1C19] focus:bg-white focus:border-[#755B00]'
                      }`}
                    >
                      <option>Gestion de Fortune &amp; Family Office</option>
                      <option>Conseil Fiduciário &amp; Transmission</option>
                      <option>Financement Stratégique d’Actifs</option>
                      <option>Dossier Académique de Stage</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span
                    className={`text-[12px] font-light ${
                      isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                    }`}
                  >
                    {t.formPrivacy}
                  </span>
                  <button
                    type="submit"
                    className={`px-8 py-3.5 text-[11px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                      isDarkTheme
                        ? 'bg-[#C9A227] hover:bg-[#DFBE58] text-black'
                        : 'bg-[#010101] hover:bg-[#1C1C1C] text-[#FBF9F4]'
                    }`}
                  >
                    {t.formSubmit}
                  </button>
                </div>

                {formSubmitted && (
                  <div
                    className={`p-4 border-l-2 text-[13px] flex items-start gap-3 animate-in fade-in ${
                      isDarkTheme
                        ? 'bg-[#1C1C1C] border-[#ECC246] text-[#ECC246]'
                        : 'bg-[#F5F3EE] border-[#755B00] text-[#755B00]'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{t.formAck}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
