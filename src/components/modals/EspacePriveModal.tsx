import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { mockClientPortfolio } from '../../data/mockClient';
import {
  X,
  Fingerprint,
  KeyRound,
  ShieldCheck,
  CheckCircle,
  FileText,
  Send,
  PhoneCall,
  Mail,
  Download,
  LogOut,
  TrendingUp,
  Cloud,
} from 'lucide-react';

interface EspacePriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenDrive?: () => void;
}

export const EspacePriveModal: React.FC<EspacePriveModalProps> = ({
  isOpen,
  onClose,
  language,
  onOpenDrive,
}) => {
  const t = translations[language].espacePriveModal;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateFIDO2 = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsAuthenticated(true);
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setMessageText('');
    setTimeout(() => setMessageSent(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#121212] border border-[#2B2A26] text-[#F8F6F1] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2B2A26] bg-[#161616]">
          <div className="flex items-center gap-3">
            <KeyRound className="w-5 h-5 text-[#ECC246]" />
            <div>
              <h3 className="font-serif text-base tracking-tight font-medium text-[#F8F6F1]">
                {t.title}
              </h3>
              <p className="text-[10px] text-[#A3A099] uppercase tracking-widest">
                {isAuthenticated
                  ? `Sociétaire : ${mockClientPortfolio.societaireId}`
                  : t.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#A3A099] hover:text-[#ECC246] transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.logOut}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#A3A099] hover:text-white transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {!isAuthenticated ? (
            /* FIDO2 & Biometric Gate */
            <div className="max-w-md mx-auto text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#1C1C1C] border border-[#ECC246]/40 flex items-center justify-center mx-auto text-[#ECC246]">
                <Fingerprint className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-2xl text-[#F8F6F1]">
                  Authentification Cryptographique
                </h4>
                <p className="text-[13px] text-[#A3A099] font-light leading-relaxed">
                  {t.fidoInstruction}
                </p>
              </div>

              {isVerifying ? (
                <div className="p-4 bg-[#181818] border border-[#ECC246]/30 text-[#ECC246] text-xs flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border-2 border-[#ECC246] border-t-transparent rounded-full animate-spin"></div>
                  <span>{t.authenticating}</span>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleSimulateFIDO2}
                    className="w-full py-4 px-6 bg-[#C9A227] hover:bg-[#DFBE58] text-black text-xs font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                  >
                    <Fingerprint className="w-4 h-4" />
                    <span>{t.btnAuthenticate}</span>
                  </button>

                  <button
                    onClick={() => setIsAuthenticated(true)}
                    className="w-full py-2.5 px-4 bg-transparent border border-[#2B2A26] hover:border-[#ECC246]/40 text-[#A3A099] hover:text-[#F8F6F1] text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {t.demoLogin}
                  </button>
                </div>
              )}

              <div className="pt-4 border-t border-[#2B2A26] flex items-center justify-center gap-2 text-[11px] text-[#A3A099]">
                <ShieldCheck className="w-4 h-4 text-[#ECC246]" />
                <span>Chiffrement souverain de bout en bout • Agrément FIDO2</span>
              </div>
            </div>
          ) : (
            /* Authenticated Sociétaire Space */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Account Greeting & Aggregate Overview */}
              <div className="bg-[#181818] p-6 border border-[#2B2A26] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#ECC246] font-semibold">
                    Dossier Consolidé (Maquette)
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#F8F6F1]">
                    {mockClientPortfolio.accountHolder}
                  </h4>
                  <p className="text-xs text-[#A3A099] font-mono">
                    Mandats &amp; Véhicules #{mockClientPortfolio.societaireId}
                  </p>
                </div>

                <div className="text-left md:text-right space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#A3A099] block">
                    {t.portfolioVal}
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-[#ECC246] font-medium block">
                    {mockClientPortfolio.valuationLabel}
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#DFBE58]">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{mockClientPortfolio.performanceLabel}</span>
                  </div>
                </div>
              </div>

              {/* Google Drive Vault Sync Quick Card */}
              {onOpenDrive && (
                <div className="p-4 bg-[#141414] border border-[#ECC246]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Cloud className="w-5 h-5 text-[#ECC246]" />
                    <div>
                      <div className="text-xs font-semibold text-[#F8F6F1]">
                        Synchronisation Google Drive Activée
                      </div>
                      <div className="text-[11px] text-[#A3A099]">
                        Consultez et sauvegardez vos actes patrimoniaux directement sur votre Google Drive.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenDrive();
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[#ECC246] text-black text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#FFE08E] transition-colors"
                  >
                    <span>Ouvrir Google Drive</span>
                  </button>
                </div>
              )}

              {/* Asset Allocation Breakdown (Qualitative Tiers) */}
              <div className="space-y-4">
                <h5 className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#ECC246]">
                  Répartition Stratégique des Avoirs (Pondération)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockClientPortfolio.allocations.map((alloc, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#161616] border border-[#2B2A26] space-y-2"
                    >
                      <div className="text-[11px] text-[#A3A099] truncate">
                        {alloc.category}
                      </div>
                      <div className="text-sm font-serif font-medium text-[#ECC246]">
                        {alloc.weightTier}
                      </div>
                      <div className="w-full h-1.5 bg-[#252525]">
                        <div
                          className="h-full"
                          style={{
                            width: '100%',
                            backgroundColor: alloc.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Private Banker Dossier & Direct Line */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-[#161616] p-6 border border-[#2B2A26] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#252525] border border-[#ECC246]/40 flex items-center justify-center text-lg font-serif text-[#ECC246]">
                      CS
                    </div>
                    <div>
                      <span className="text-[10px] text-[#ECC246] uppercase tracking-widest font-semibold block">
                        {t.activeAdvisor}
                      </span>
                      <div className="font-serif text-base text-[#F8F6F1]">
                        {mockClientPortfolio.privateBanker.name}
                      </div>
                      <div className="text-[11px] text-[#A3A099]">
                        {mockClientPortfolio.privateBanker.role}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#2B2A26] space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-[#A3A099]">
                      <PhoneCall className="w-3.5 h-3.5 text-[#ECC246]" />
                      <span>{mockClientPortfolio.privateBanker.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#A3A099]">
                      <Mail className="w-3.5 h-3.5 text-[#ECC246]" />
                      <span>{mockClientPortfolio.privateBanker.email}</span>
                    </div>
                  </div>
                </div>

                {/* Encrypted Note Composer */}
                <div className="lg:col-span-7 bg-[#161616] p-6 border border-[#2B2A26] space-y-3">
                  <span className="text-[11px] text-[#ECC246] uppercase tracking-[0.16em] font-semibold block">
                    {t.confidentialMessaging}
                  </span>

                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <textarea
                      rows={3}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder={t.messagePlaceholder}
                      className="w-full p-3 bg-[#111111] border border-[#2B2A26] text-xs text-[#F8F6F1] focus:border-[#ECC246] focus:outline-none transition-colors"
                    ></textarea>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#A3A099]">
                        Clé FIDO2 active • Session chiffrée
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#DFBE58] text-black text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmettre</span>
                      </button>
                    </div>

                    {messageSent && (
                      <div className="p-2.5 bg-[#1F1F1F] border-l-2 border-[#ECC246] text-[#ECC246] text-xs flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        <span>{t.sendSuccess}</span>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Digital Fiduciary Documents Vault */}
              <div className="space-y-3">
                <span className="text-[11px] text-[#ECC246] uppercase tracking-[0.16em] font-semibold block">
                  {t.documentsVault}
                </span>

                <div className="space-y-2">
                  {mockClientPortfolio.fiduciaryDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3.5 bg-[#161616] border border-[#2B2A26] flex items-center justify-between hover:bg-[#1A1A1A] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[#ECC246]" />
                        <div>
                          <div className="text-xs font-medium text-[#F8F6F1]">
                            {doc.title}
                          </div>
                          <div className="text-[10px] text-[#A3A099]">
                            {doc.type} • {doc.date} • {doc.size}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedDoc(doc.title)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#252525] border border-[#2B2A26] text-xs text-[#ECC246] transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Consulter</span>
                      </button>
                    </div>
                  ))}
                </div>

                {selectedDoc && (
                  <div className="p-3 bg-[#181818] border border-[#ECC246]/40 text-xs text-[#ECC246] flex items-center justify-between">
                    <span>
                      Modèle de document certifié (Maquette) : <strong>{selectedDoc}</strong>
                    </span>
                    <button
                      onClick={() => setSelectedDoc(null)}
                      className="underline cursor-pointer ml-3 text-white"
                    >
                      Fermer
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
