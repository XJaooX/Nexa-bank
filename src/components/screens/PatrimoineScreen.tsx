import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import {
  ShieldCheck,
  Landmark,
  Shield,
  DoorOpen,
} from 'lucide-react';

interface PatrimoineScreenProps {
  language: Language;
  isDarkTheme: boolean;
  onOpenContact: () => void;
}

export const PatrimoineScreen: React.FC<PatrimoineScreenProps> = ({
  language,
  isDarkTheme,
  onOpenContact,
}) => {
  const t = translations[language].patrimoine;
  const [heroImgLoaded, setHeroImgLoaded] = useState(true);
  const [vaultImgLoaded, setVaultImgLoaded] = useState(true);

  const heroImgUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCm6gyUgrINcpwlNhbi81FgwGVVBciR70cylfZmShxOjRVgIfEfXIk9kDq66DH44AShzvIhQWyn8TvQXPzJG0hVwVmctRpTtDMORi2vAM5f6dd3kCrlxX7sLLgTqrCLU8_w5Jb1ZilTWSpvxjvXl89CpyBAgwRCIZfZeBzECJMskogkflS1smt5-CfIuGFH67Q-McjUwaxHUxAsf6-usmxbgpDbWPu4lII0Bk8-IWsH-PwCtTdee8wx';

  const vaultImgUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDXAmzkUn5guQG-x_qR5W5lDnV9F_G1FWohZwDRIb2iyCq43SowA8UWkSU3X0pOVzghdE695rvhnktWdQVuiiM1aKAecc_DpJXV3BYgsdH9_-VbQgbBoteEb1PxJ5wmGM-kgMBEoWOa7S3b3bkALa4kNGtj1YbywaWHufkqCcnREJcVvTuFZj0oNh5Tq6srBAxW8FstHx9we-ObR5oYcKWhtyRdazVkip9F3Wy8sNDvm7XZ_d9Vu6Cm';

  return (
    <div
      className={`flex flex-col w-full transition-colors duration-200 animate-in fade-in ${
        isDarkTheme ? 'bg-[#0E0E0E] text-[#F8F6F1]' : 'bg-[#FBF9F4] text-[#1B1C19]'
      }`}
    >
      {/* Editorial Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-16">
        <div className="flex flex-col max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#ECC246]"></span>
            <span
              className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
                isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
              }`}
            >
              {t.kicker}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[54px] tracking-tight mb-4 leading-tight text-balance">
            {t.heroTitle}
          </h1>

          <p
            className={`text-[16px] lg:text-[18px] max-w-2xl font-light leading-relaxed ${
              isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
            }`}
          >
            {t.heroDescription}
          </p>
        </div>

        {/* Architectural Visual Frame */}
        <div
          className={`mt-12 relative w-full overflow-hidden border shadow-2xl ${
            isDarkTheme
              ? 'bg-[#131313] border-[#2B2A26]'
              : 'bg-[#E4E2DD] border-[#E4E2DD]'
          }`}
        >
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            {heroImgLoaded ? (
              <img
                src={heroImgUrl}
                alt="Espace d'entretien de haute banque privée Nexa"
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
                onError={() => setHeroImgLoaded(false)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-[#181818] to-[#252525] flex items-center justify-center p-8">
                <span className="font-serif text-xl italic text-[#A3A099]">
                  Salons Privés • Place Vendôme
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-transparent"></div>

            {/* Place Vendôme Salon Badge */}
            <div className="absolute bottom-6 left-6 md:left-8 md:bottom-8 flex items-center gap-2.5 bg-[#0A0A0A]/80 backdrop-blur-md px-4 py-2 border border-[#2B2A26]">
              <span className="w-2 h-2 rounded-full bg-[#ECC246]"></span>
              <span className="text-[10px] text-[#A3A099] uppercase tracking-widest font-medium">
                {t.badgeVendome}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Narrative: Protection & Pérennité */}
      <section
        className={`w-full py-20 my-6 border-y ${
          isDarkTheme
            ? 'bg-[#131313] border-[#2B2A26]'
            : 'bg-[#F5F3EE] border-[#E4E2DD]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div
                className={`text-[11px] uppercase tracking-[0.18em] font-semibold ${
                  isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                }`}
              >
                {t.sec1Kicker}
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl leading-tight">
                {t.sec1Title}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-5 pt-1">
              <p
                className={`text-[16px] font-light leading-relaxed ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.sec1P1}
              </p>
              <p
                className={`text-[14px] font-light leading-relaxed ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.sec1P2}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div
                  className={`p-5 border ${
                    isDarkTheme
                      ? 'bg-[#181818] border-[#2B2A26]'
                      : 'bg-white border-[#E4E2DD]'
                  }`}
                >
                  <ShieldCheck
                    className={`w-5 h-5 mb-3 block ${
                      isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                    }`}
                  />
                  <div className="text-sm font-medium mb-1">{t.card1Title}</div>
                  <div
                    className={`text-[12px] font-light leading-snug ${
                      isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                    }`}
                  >
                    {t.card1Desc}
                  </div>
                </div>

                <div
                  className={`p-5 border ${
                    isDarkTheme
                      ? 'bg-[#181818] border-[#2B2A26]'
                      : 'bg-white border-[#E4E2DD]'
                  }`}
                >
                  <Landmark
                    className={`w-5 h-5 mb-3 block ${
                      isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                    }`}
                  />
                  <div className="text-sm font-medium mb-1">{t.card2Title}</div>
                  <div
                    className={`text-[12px] font-light leading-snug ${
                      isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                    }`}
                  >
                    {t.card2Desc}
                  </div>
                </div>

                <div
                  className={`p-5 border ${
                    isDarkTheme
                      ? 'bg-[#181818] border-[#2B2A26]'
                      : 'bg-white border-[#E4E2DD]'
                  }`}
                >
                  <Shield
                    className={`w-5 h-5 mb-3 block ${
                      isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                    }`}
                  />
                  <div className="text-sm font-medium mb-1">{t.card3Title}</div>
                  <div
                    className={`text-[12px] font-light leading-snug ${
                      isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                    }`}
                  >
                    {t.card3Desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Narrative: Organisation & Transmission */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Vault Photo */}
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
              <div
                className={`relative w-full aspect-[4/3] overflow-hidden border shadow-xl ${
                  isDarkTheme
                    ? 'bg-[#181818] border-[#2B2A26]'
                    : 'bg-[#E4E2DD] border-[#E4E2DD]'
                }`}
              >
                {vaultImgLoaded ? (
                  <img
                    src={vaultImgUrl}
                    alt="Bibliothèque confidentielle et coffre-fort d'une banque privée"
                    className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                    onError={() => setVaultImgLoaded(false)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-[#181818] flex items-center justify-center p-8 text-[#A3A099]">
                    <span className="font-serif italic text-lg">
                      Bibliothèque &amp; Coffre Souverain
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Narrative Text */}
            <div className="lg:col-span-6 lg:pl-8 order-1 lg:order-2 space-y-4">
              <div
                className={`text-[11px] uppercase tracking-[0.18em] font-semibold ${
                  isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                }`}
              >
                {t.sec2Kicker}
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl leading-tight">
                {t.sec2Title}
              </h2>
              <p
                className={`text-[16px] font-light leading-relaxed ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.sec2P1}
              </p>
              <p
                className={`text-[14px] font-light leading-relaxed ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.sec2P2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean 3-Pillar Architecture Section */}
      <section
        className={`w-full py-20 border-t ${
          isDarkTheme
            ? 'bg-[#0A0A0A] border-[#2B2A26]'
            : 'bg-[#F0EEE9] border-[#E4E2DD]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl mb-14">
            <span
              className={`text-[11px] uppercase tracking-[0.18em] block mb-2 font-semibold ${
                isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
              }`}
            >
              {t.pillarsKicker}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl">
              {t.pillarsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 01 */}
            <div
              className={`p-8 flex flex-col justify-between transition-colors duration-200 border ${
                isDarkTheme
                  ? 'bg-[#131313] hover:bg-[#181818] border-[#2B2A26]'
                  : 'bg-white hover:bg-[#FBF9F4] border-[#E4E2DD]'
              }`}
            >
              <div>
                <span
                  className={`font-serif text-3xl block mb-4 font-light ${
                    isDarkTheme ? 'text-[#ECC246]/60' : 'text-[#755B00]'
                  }`}
                >
                  01
                </span>
                <h4 className="font-serif text-xl mb-2">{t.p1Title}</h4>
                <p
                  className={`text-[14px] font-light leading-relaxed ${
                    isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                  }`}
                >
                  {t.p1Desc}
                </p>
              </div>
              <div
                className={`pt-6 mt-6 border-t ${
                  isDarkTheme ? 'border-[#2B2A26]' : 'border-[#E4E2DD]'
                }`}
              >
                <span
                  className={`text-[10px] uppercase tracking-widest flex items-center gap-2 font-medium ${
                    isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDarkTheme ? 'bg-[#ECC246]' : 'bg-[#755B00]'
                    }`}
                  ></span>{' '}
                  {t.p1Badge}
                </span>
              </div>
            </div>

            {/* Pillar 02 */}
            <div
              className={`p-8 flex flex-col justify-between transition-colors duration-200 border ${
                isDarkTheme
                  ? 'bg-[#131313] hover:bg-[#181818] border-[#2B2A26]'
                  : 'bg-white hover:bg-[#FBF9F4] border-[#E4E2DD]'
              }`}
            >
              <div>
                <span
                  className={`font-serif text-3xl block mb-4 font-light ${
                    isDarkTheme ? 'text-[#ECC246]/60' : 'text-[#755B00]'
                  }`}
                >
                  02
                </span>
                <h4 className="font-serif text-xl mb-2">{t.p2Title}</h4>
                <p
                  className={`text-[14px] font-light leading-relaxed ${
                    isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                  }`}
                >
                  {t.p2Desc}
                </p>
              </div>
              <div
                className={`pt-6 mt-6 border-t ${
                  isDarkTheme ? 'border-[#2B2A26]' : 'border-[#E4E2DD]'
                }`}
              >
                <span
                  className={`text-[10px] uppercase tracking-widest flex items-center gap-2 font-medium ${
                    isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDarkTheme ? 'bg-[#ECC246]' : 'bg-[#755B00]'
                    }`}
                  ></span>{' '}
                  {t.p2Badge}
                </span>
              </div>
            </div>

            {/* Pillar 03 */}
            <div
              className={`p-8 flex flex-col justify-between transition-colors duration-200 border ${
                isDarkTheme
                  ? 'bg-[#131313] hover:bg-[#181818] border-[#2B2A26]'
                  : 'bg-white hover:bg-[#FBF9F4] border-[#E4E2DD]'
              }`}
            >
              <div>
                <span
                  className={`font-serif text-3xl block mb-4 font-light ${
                    isDarkTheme ? 'text-[#ECC246]/60' : 'text-[#755B00]'
                  }`}
                >
                  03
                </span>
                <h4 className="font-serif text-xl mb-2">{t.p3Title}</h4>
                <p
                  className={`text-[14px] font-light leading-relaxed ${
                    isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                  }`}
                >
                  {t.p3Desc}
                </p>
              </div>
              <div
                className={`pt-6 mt-6 border-t ${
                  isDarkTheme ? 'border-[#2B2A26]' : 'border-[#E4E2DD]'
                }`}
              >
                <span
                  className={`text-[10px] uppercase tracking-widest flex items-center gap-2 font-medium ${
                    isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDarkTheme ? 'bg-[#ECC246]' : 'bg-[#755B00]'
                    }`}
                  ></span>{' '}
                  {t.p3Badge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concluding Call to Action */}
      <section
        className={`w-full py-20 ${
          isDarkTheme ? 'bg-[#131313]' : 'bg-[#F5F3EE]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 text-center space-y-5">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 border mx-auto mb-2 ${
              isDarkTheme
                ? 'bg-[#1F1F1F] text-[#ECC246] border-[#2B2A26]'
                : 'bg-white text-[#755B00] border-[#E4E2DD]'
            }`}
          >
            <DoorOpen className="w-5 h-5" />
          </div>

          <h3 className="font-serif text-3xl lg:text-4xl tracking-tight max-w-2xl mx-auto">
            {t.ctaTitle}
          </h3>

          <p
            className={`text-[16px] max-w-xl mx-auto font-light leading-relaxed ${
              isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
            }`}
          >
            {t.ctaDesc}
          </p>

          <div className="pt-4">
            <button
              onClick={onOpenContact}
              className={`inline-flex items-center justify-center px-10 py-4 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-150 cursor-pointer shadow-lg ${
                isDarkTheme
                  ? 'bg-[#C9A227] hover:bg-[#DFBE58] text-[#0A0A0A]'
                  : 'bg-[#010101] hover:bg-[#1C1C1C] text-[#FBF9F4]'
              }`}
            >
              {t.ctaButton}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
