import React, { useState } from 'react';
import { Language, ScreenType, AdminClient, AdminDeal, ConsultationRequest, AdminAuditLog } from '../../types';
import { translations } from '../../data/translations';
import {
  initialAdminClients,
  initialAdminDeals,
  initialConsultationRequests,
  initialAuditLogs,
} from '../../data/mockAdmin';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Briefcase,
  FileCheck,
  Landmark,
  Building2,
  Lock,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  Shield,
  Download,
  Mail,
  Phone,
  FileText,
  RefreshCw,
  ExternalLink,
  Layers,
  Award,
} from 'lucide-react';

interface AdminScreenProps {
  language: Language;
  isDarkTheme: boolean;
  onNavigate: (screen: ScreenType) => void;
}

type AdminTab = 'dashboard' | 'clients' | 'consultations' | 'investments' | 'audit' | 'salons';

export const AdminScreen: React.FC<AdminScreenProps> = ({
  language,
  isDarkTheme,
  onNavigate,
}) => {
  const t = translations[language].admin;

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [clients, setClients] = useState<AdminClient[]>(initialAdminClients);
  const [deals, setDeals] = useState<AdminDeal[]>(initialAdminDeals);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>(initialConsultationRequests);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(initialAuditLogs);

  // Search & filter states
  const [clientSearch, setClientSearch] = useState('');
  const [clientTierFilter, setClientTierFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<AdminClient | null>(null);

  // New Deal modal state
  const [isAddDealOpen, setIsAddDealOpen] = useState(false);
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealCategory, setNewDealCategory] = useState<AdminDeal['category']>('Private Equity');
  const [newDealTarget, setNewDealTarget] = useState('25000000');
  const [newDealIRR, setNewDealIRR] = useState('10.5% net');

  // Consultation filter
  const [consultationStatusFilter, setConsultationStatusFilter] = useState<string>('all');

  // Feedback notification
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Add sample lead to demonstrate dynamic prospect pipeline
  const handleAddSampleLead = () => {
    const newLead: ConsultationRequest = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      fullName: 'Famille de Clermont-Tonnerre',
      email: 'secretariat@clermont-tonnerre.ch',
      phone: '+41 22 730 00 XX',
      salon: 'Genève — 4, Rue du Rhône',
      nature: 'Conseil en Gouvernance & Pacte d’Actionnaires',
      message: 'Demande d’entretien préliminaire avec un associé-gérant pour arbitrage de portefeuille obligataire souverain.',
      date: new Date().toISOString().split('T')[0],
      status: 'nouveau',
      assignedBanker: 'Alexandre de Montmirail',
      estimatedAUM: '60M€ - 85M€',
    };
    setConsultations([newLead, ...consultations]);

    const newLog: AdminAuditLog = {
      id: `AUD-${Math.floor(900 + Math.random() * 100)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: 'Formulaire Public Nexa',
      action: 'Nouveau Prospect Enregistré',
      severity: 'info',
      details: `Demande reçue de ${newLead.fullName} pour le salon de ${newLead.salon}.`,
    };
    setAuditLogs([newLog, ...auditLogs]);

    showNotification('Nouvelle demande de consultation ajoutée au pipeline.');
  };

  // Update consultation status
  const handleUpdateConsultationStatus = (id: string, newStatus: ConsultationRequest['status']) => {
    setConsultations(
      consultations.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    showNotification('Statut de la demande mis à jour.');
  };

  // Update client KYC status
  const handleToggleKYC = (clientId: string) => {
    setClients(
      clients.map((c) => {
        if (c.id === clientId) {
          const nextStatus = c.kycStatus === 'Vérifié' ? 'Revue Annuelle' : 'Vérifié';
          return { ...c, kycStatus: nextStatus };
        }
        return c;
      })
    );
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient({
        ...selectedClient,
        kycStatus: selectedClient.kycStatus === 'Vérifié' ? 'Revue Annuelle' : 'Vérifié',
      });
    }
    showNotification('Statut de conformité KYC mis à jour dans le registre.');
  };

  // Add new Deal
  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealTitle.trim()) return;

    const deal: AdminDeal = {
      id: `DEAL-0${deals.length + 1}`,
      title: newDealTitle,
      category: newDealCategory,
      targetAmount: parseInt(newDealTarget, 10) || 10000000,
      raisedAmount: 0,
      targetIRR: newDealIRR,
      minimumTicket: 500000,
      status: 'Ouvert',
      maturity: '5 ans',
      location: 'Paris / Genève',
    };

    setDeals([deal, ...deals]);
    setIsAddDealOpen(false);
    setNewDealTitle('');
    showNotification(`Nouvelle opportunité "${deal.title}" publiée au catalogue des sociétaires.`);
  };

  // Filtered clients
  const filteredClients = clients.filter((c) => {
    const matchSearch =
      c.accountHolder.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.assignedBanker.toLowerCase().includes(clientSearch.toLowerCase());
    const matchTier = clientTierFilter === 'all' || c.tier.includes(clientTierFilter);
    return matchSearch && matchTier;
  });

  // Filtered consultations
  const filteredConsultations = consultations.filter((c) => {
    if (consultationStatusFilter === 'all') return true;
    return c.status === consultationStatusFilter;
  });

  const totalAUM = clients.reduce((acc, c) => acc + c.totalAUM, 4400000000);

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-[#0A0A0A] text-[#F8F6F1]' : 'bg-[#F6F4EF] text-[#111111]'}`}>
      {/* Top Fixed Executive Operational Bar */}
      <div className={`border-b py-3 px-4 sm:px-8 transition-colors ${
        isDarkTheme ? 'bg-[#121212] border-[#222222]' : 'bg-[#EFECE6] border-[#DED9D0]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm bg-[#ECC246] text-black font-bold flex items-center justify-center text-xs shadow-[0_0_12px_rgba(236,194,70,0.3)]">
              NX
            </div>
            <div>
              <div className="font-serif font-bold text-sm tracking-wide flex items-center gap-2">
                <span>NEXA BANQUE PRIVÉE</span>
                <span className="text-[10px] font-sans px-2 py-0.5 bg-[#ECC246]/20 text-[#ECC246] border border-[#ECC246]/40 uppercase tracking-widest font-semibold">
                  Console Directoire & Admin
                </span>
              </div>
              <div className="text-[11px] opacity-70">
                Directeur Délégué : Alexandre de Montmirail • Habilitation Secret Bancaire Niveau 3
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="hidden lg:flex items-center gap-4 text-[11px] opacity-75 font-mono">
              <span>PARIS 14:32</span>
              <span>GENÈVE 14:32</span>
              <span>LUXEMBOURG 14:32</span>
              <span>ZURICH 14:32</span>
            </div>

            <button
              onClick={handleAddSampleLead}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#202020] text-[#ECC246] border border-[#ECC246]/40 hover:bg-[#ECC246] hover:text-black transition-colors font-medium text-[11px] cursor-pointer"
              title="Ajouter une demande de consultation d'essai pour tester le pipeline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simuler Prospect</span>
            </button>

            <button
              onClick={() => onNavigate('accueil')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ECC246] text-black font-semibold uppercase tracking-wider text-[11px] hover:bg-[#FFE08E] transition-colors cursor-pointer shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t.backToPublic}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Toast Feedback */}
        {feedbackMessage && (
          <div className="p-3 bg-[#ECC246]/15 border border-[#ECC246]/50 text-[#ECC246] text-xs font-medium flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedbackMessage}</span>
            </div>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="text-[11px] underline cursor-pointer"
            >
              Fermer
            </button>
          </div>
        )}

        {/* Tab Navigation Ribbon */}
        <div className={`flex items-center overflow-x-auto border-b ${
          isDarkTheme ? 'border-[#222222]' : 'border-[#DED9D0]'
        }`}>
          {[
            { id: 'dashboard', label: t.tabs.dashboard, icon: Landmark },
            { id: 'clients', label: `${t.tabs.clients} (${clients.length})`, icon: Users },
            { id: 'consultations', label: `${t.tabs.consultations} (${consultations.length})`, icon: Mail },
            { id: 'investments', label: `${t.tabs.investments} (${deals.length})`, icon: Briefcase },
            { id: 'audit', label: t.tabs.audit, icon: ShieldCheck },
            { id: 'salons', label: t.tabs.salons, icon: Building2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#ECC246] text-[#ECC246] bg-[#ECC246]/5'
                    : isDarkTheme
                    ? 'border-transparent text-[#888888] hover:text-[#F8F6F1] hover:border-[#444444]'
                    : 'border-transparent text-[#666666] hover:text-[#111111] hover:border-[#CCCCCC]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 4 Key Institutional KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className={`p-6 border transition-colors ${
                isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
              }`}>
                <div className="flex items-center justify-between text-xs text-[#A3A099] uppercase tracking-wider mb-2">
                  <span>Actifs sous Gestion (AUM)</span>
                  <Landmark className="w-4 h-4 text-[#ECC246]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#ECC246] tracking-tight">
                  € 4,82 Md
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+8.4% YTD (+342 M€)</span>
                </div>
              </div>

              <div className={`p-6 border transition-colors ${
                isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
              }`}>
                <div className="flex items-center justify-between text-xs text-[#A3A099] uppercase tracking-wider mb-2">
                  <span>Collecte Nette T3</span>
                  <TrendingUp className="w-4 h-4 text-[#ECC246]" />
                </div>
                <div className="font-serif text-3xl font-bold tracking-tight">
                  +145 M€
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Hors-Bilan Ficiaire</span>
                </div>
              </div>

              <div className={`p-6 border transition-colors ${
                isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
              }`}>
                <div className="flex items-center justify-between text-xs text-[#A3A099] uppercase tracking-wider mb-2">
                  <span>Ratio de Solvabilité CET1</span>
                  <ShieldCheck className="w-4 h-4 text-[#ECC246]" />
                </div>
                <div className="font-serif text-3xl font-bold tracking-tight text-emerald-500">
                  28.6%
                </div>
                <div className="mt-2 text-xs text-[#A3A099]">
                  Bâle III Min. 10.5% (Excédent +18.1%)
                </div>
              </div>

              <div className={`p-6 border transition-colors ${
                isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
              }`}>
                <div className="flex items-center justify-between text-xs text-[#A3A099] uppercase tracking-wider mb-2">
                  <span>Mandats & Sociétaires</span>
                  <Users className="w-4 h-4 text-[#ECC246]" />
                </div>
                <div className="font-serif text-3xl font-bold tracking-tight">
                  184
                </div>
                <div className="mt-2 text-xs text-[#ECC246] font-medium">
                  Ticket Moyen : 26.2 M€ / Famille
                </div>
              </div>
            </div>

            {/* Macro Allocation & Interbank Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Macro Asset Breakdown */}
              <div className={`lg:col-span-2 p-6 border ${
                isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold">Répartition Macroéconomique des Avoirs</h3>
                    <p className="text-xs text-[#A3A099]">Structure globale des 4.82 milliards d'euros administrés</p>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-[#ECC246]/10 text-[#ECC246] border border-[#ECC246]/30 uppercase font-semibold">
                    Certifié CSSF / FINMA
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Private Equity & Club Deals Stratégiques', amount: '1 450 M€', pct: 30, color: 'bg-[#ECC246]' },
                    { label: 'Immobilier de Prestige & Forêts Durables', amount: '1 205 M€', pct: 25, color: 'bg-[#DFBE58]' },
                    { label: 'Mandats Discrétionnaires Décorrélés', amount: '1 155 M€', pct: 24, color: 'bg-[#A3A099]' },
                    { label: 'Or Physique en Coffres Helvétiques Sécurisés', amount: '630 M€', pct: 13, color: 'bg-[#C9A227]' },
                    { label: 'Trésorerie & Titres Souverains Déposés', amount: '380 M€', pct: 8, color: 'bg-[#555555]' },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{item.label}</span>
                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span>{item.amount}</span>
                          <span className="font-bold text-[#ECC246]">{item.pct}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-[#222222] overflow-hidden">
                        <div
                          className={`h-full ${item.color} transition-all duration-500`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interbank & Vault Status */}
              <div className={`p-6 border space-y-5 ${
                isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
              }`}>
                <h3 className="font-serif text-lg font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#ECC246]" />
                  <span>Souveraineté & Règlements</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#1B1B1B] border border-[#2B2A26] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#ECC246]">Banque Nationale Suisse</span>
                      <span className="text-[10px] text-emerald-400 font-mono">RTGS EN LIGNE</span>
                    </div>
                    <p className="text-[11px] text-[#A3A099]">Comptes de compensation SIC francs suisses opérationnels.</p>
                  </div>

                  <div className="p-3 bg-[#1B1B1B] border border-[#2B2A26] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#ECC246]">Banque de France / BCE</span>
                      <span className="text-[10px] text-emerald-400 font-mono">T2 EN LIGNE</span>
                    </div>
                    <p className="text-[11px] text-[#A3A099]">Règlements de gros montants Target2 en temps réel.</p>
                  </div>

                  <div className="p-3 bg-[#1B1B1B] border border-[#2B2A26] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#ECC246]">Coffres Zurich & Genève</span>
                      <span className="text-[10px] text-emerald-400 font-mono">SÉCURISÉ</span>
                    </div>
                    <p className="text-[11px] text-[#A3A099]">Audit physique des lingots d'or certifié 999.9/1000.</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2B2A26]">
                  <button
                    onClick={() => setActiveTab('audit')}
                    className="w-full py-2 bg-[#202020] border border-[#ECC246]/40 text-[#ECC246] hover:bg-[#ECC246] hover:text-black transition-colors text-xs uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Consulter le Registre LCB-FT
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Access to Recent Client Leads */}
            <div className={`p-6 border ${
              isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-semibold">Dernières Demandes d'Entretien Reçues</h3>
                <button
                  onClick={() => setActiveTab('consultations')}
                  className="text-xs text-[#ECC246] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Voir toutes les demandes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#2B2A26] text-[#A3A099] uppercase tracking-wider">
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Sociétaire / Prospect</th>
                      <th className="py-2.5">Salon</th>
                      <th className="py-2.5">Objet de l'Échange</th>
                      <th className="py-2.5">Banquier Dédié</th>
                      <th className="py-2.5">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222222]">
                    {consultations.slice(0, 3).map((req) => (
                      <tr key={req.id} className="hover:bg-[#1A1A1A]/50">
                        <td className="py-3 font-mono opacity-80">{req.date}</td>
                        <td className="py-3 font-semibold">{req.fullName}</td>
                        <td className="py-3 text-[#A3A099]">{req.salon.split('—')[0]}</td>
                        <td className="py-3 max-w-xs truncate">{req.nature}</td>
                        <td className="py-3">{req.assignedBanker || 'Directoire'}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            req.status === 'nouveau'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLIENT ROSTER & WEALTH DOSSIERS */}
        {activeTab === 'clients' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-[#A3A099] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, sociétaire, banquier..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className={`w-full pl-9 pr-4 py-2 text-xs border outline-none ${
                      isDarkTheme
                        ? 'bg-[#161616] border-[#2B2A26] text-[#F8F6F1] focus:border-[#ECC246]'
                        : 'bg-[#FFFFFF] border-[#DED9D0] text-[#111111] focus:border-[#755B00]'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={clientTierFilter}
                  onChange={(e) => setClientTierFilter(e.target.value)}
                  className={`px-3 py-2 text-xs border outline-none cursor-pointer ${
                    isDarkTheme
                      ? 'bg-[#161616] border-[#2B2A26] text-[#F8F6F1]'
                      : 'bg-[#FFFFFF] border-[#DED9D0] text-[#111111]'
                  }`}
                >
                  <option value="all">Tous les Paliers de Fortune</option>
                  <option value="UHNWI">UHNWI (&gt; 50M€)</option>
                  <option value="HNWI">HNWI (15M€ - 50M€)</option>
                  <option value="Family Office">Family Offices</option>
                  <option value="Institutionnel">Institutionnels</option>
                </select>

                <button
                  onClick={() => {
                    const newClient: AdminClient = {
                      id: `CLI-NX-0${clients.length + 1}`,
                      accountHolder: 'Famille de Montmorency',
                      tier: 'UHNWI (> 50M€)',
                      totalAUM: 58000000,
                      currency: 'EUR',
                      jurisdiction: 'Paris',
                      assignedBanker: 'Alexandre de Montmirail',
                      mandateType: 'Mandat Discrétionnaire Décorrélé',
                      kycStatus: 'Vérifié',
                      riskProfile: 'Préservation Absolue',
                      openDate: new Date().toISOString().split('T')[0],
                      notes: 'Dossier familial initié avec mandat de conservation foncière.',
                    };
                    setClients([newClient, ...clients]);
                    showNotification(`Nouveau mandant "${newClient.accountHolder}" enregistré.`);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#ECC246] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#FFE08E] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nouveau Mandat</span>
                </button>
              </div>
            </div>

            {/* Clients Table */}
            <div className={`border overflow-hidden ${
              isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className={`border-b text-[#A3A099] uppercase tracking-wider ${
                      isDarkTheme ? 'bg-[#1A1A1A] border-[#2B2A26]' : 'bg-[#F2EFE8] border-[#DED9D0]'
                    }`}>
                      <th className="py-3 px-4">Réf.</th>
                      <th className="py-3 px-4">Sociétaire / Famille</th>
                      <th className="py-3 px-4">Palier</th>
                      <th className="py-3 px-4">AUM Gérés</th>
                      <th className="py-3 px-4">Place / Juridiction</th>
                      <th className="py-3 px-4">Banquier Dédié</th>
                      <th className="py-3 px-4">Conformité KYC</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222222]">
                    {filteredClients.map((client) => (
                      <tr
                        key={client.id}
                        className={`transition-colors cursor-pointer ${
                          selectedClient?.id === client.id
                            ? isDarkTheme ? 'bg-[#222222]' : 'bg-[#EAE6DE]'
                            : 'hover:bg-[#1A1A1A]/40'
                        }`}
                        onClick={() => setSelectedClient(client)}
                      >
                        <td className="py-3 px-4 font-mono font-medium text-[#ECC246]">{client.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-sm">{client.accountHolder}</div>
                          <div className="text-[11px] text-[#A3A099]">{client.mandateType}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 bg-[#252525] text-[#D8D4CA] text-[10px] font-medium border border-[#333333]">
                            {client.tier}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-serif font-bold text-sm">
                          {(client.totalAUM / 1000000).toFixed(1)} M€
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{client.jurisdiction}</span>
                        </td>
                        <td className="py-3 px-4 text-[#A3A099]">{client.assignedBanker}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleKYC(client.id);
                            }}
                            className={`px-2 py-0.5 text-[10px] uppercase font-semibold cursor-pointer border ${
                              client.kycStatus === 'Vérifié'
                                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                                : 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                            }`}
                            title="Cliquer pour basculer le statut KYC"
                          >
                            {client.kycStatus}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedClient(client);
                            }}
                            className="p-1.5 hover:text-[#ECC246] transition-colors cursor-pointer"
                            title="Voir le dossier ficiaire complet"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Client Dossier Details Drawer */}
            {selectedClient && (
              <div className={`p-6 border space-y-6 animate-in slide-in-from-bottom duration-200 ${
                isDarkTheme ? 'bg-[#181818] border-[#2B2A26]' : 'bg-[#FFFFFF] border-[#DED9D0]'
              }`}>
                <div className="flex items-center justify-between border-b border-[#2B2A26] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#ECC246]/10 border border-[#ECC246]/40 flex items-center justify-center text-[#ECC246]">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-bold">{selectedClient.accountHolder}</h4>
                      <p className="text-xs text-[#A3A099]">
                        Sociétaire {selectedClient.id} • Mandat ouvert le {selectedClient.openDate} • Juridiction {selectedClient.jurisdiction}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleKYC(selectedClient.id)}
                      className="px-3 py-1.5 bg-[#252525] border border-[#444444] text-xs hover:border-[#ECC246] text-[#ECC246] cursor-pointer"
                    >
                      Bascule Statut KYC ({selectedClient.kycStatus})
                    </button>
                    <button
                      onClick={() => setSelectedClient(null)}
                      className="text-xs text-[#A3A099] hover:text-white cursor-pointer px-2 py-1"
                    >
                      Fermer
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-[11px] text-[#A3A099] uppercase">Valorisation Globale</div>
                    <div className="font-serif text-2xl font-bold text-[#ECC246]">
                      {selectedClient.totalAUM.toLocaleString('fr-FR')} €
                    </div>
                    <div className="text-xs text-[#A3A099]">Conservé hors-bilan, ségrégué en chambre de compensation.</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] text-[#A3A099] uppercase">Profil d'Investissement</div>
                    <div className="text-sm font-semibold">{selectedClient.riskProfile}</div>
                    <div className="text-xs text-[#A3A099]">Banquier Référent : {selectedClient.assignedBanker}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] text-[#A3A099] uppercase">Notes du Cabinet Privé</div>
                    <div className="text-xs italic bg-[#111111] p-3 border border-[#2B2A26] rounded-sm">
                      "{selectedClient.notes}"
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONSULTATION LEADS & INQUIRIES */}
        {activeTab === 'consultations' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold">Demandes d'Entretien & Prospects du Directoire</h3>
                <p className="text-xs text-[#A3A099]">Flux d'admissions issu du site public et de recommandations privées</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={consultationStatusFilter}
                  onChange={(e) => setConsultationStatusFilter(e.target.value)}
                  className={`px-3 py-2 text-xs border outline-none cursor-pointer ${
                    isDarkTheme
                      ? 'bg-[#161616] border-[#2B2A26] text-[#F8F6F1]'
                      : 'bg-[#FFFFFF] border-[#DED9D0] text-[#111111]'
                  }`}
                >
                  <option value="all">Tous les Statuts</option>
                  <option value="nouveau">Nouveaux</option>
                  <option value="en_cours">En cours d'analyse</option>
                  <option value="confirme">Confirmé</option>
                  <option value="traite">Traité / Mandat Signé</option>
                </select>

                <button
                  onClick={handleAddSampleLead}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#ECC246] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#FFE08E] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Simuler Entretien</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConsultations.map((item) => (
                <div
                  key={item.id}
                  className={`p-6 border flex flex-col justify-between space-y-4 ${
                    isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-xs text-[#ECC246] font-semibold">{item.id}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                        item.status === 'nouveau'
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                          : item.status === 'confirme'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                          : 'bg-blue-500/15 text-blue-400 border-blue-500/40'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg font-bold">{item.fullName}</h4>
                      <p className="text-xs text-[#A3A099] flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-[#ECC246]" />
                        <span>{item.salon}</span>
                      </p>
                    </div>

                    <div className="text-xs font-medium text-[#ECC246]">
                      {item.nature}
                    </div>

                    {item.message && (
                      <p className="text-xs text-[#A3A099] line-clamp-3 italic bg-[#1B1B1B]/70 p-2.5 border border-[#2B2A26]">
                        "{item.message}"
                      </p>
                    )}

                    <div className="space-y-1 text-xs text-[#A3A099] pt-2 border-t border-[#222222]">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="font-mono text-[11px]">{item.email}</span>
                      </div>
                      {item.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          <span className="font-mono text-[11px]">{item.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#222222] flex items-center justify-between gap-2">
                    <span className="text-[10px] text-[#A3A099]">Changer statut :</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleUpdateConsultationStatus(item.id!, 'en_cours')}
                        className="px-2 py-1 bg-[#222222] hover:bg-[#333333] text-[10px] uppercase cursor-pointer"
                        title="Marquer en cours d'analyse"
                      >
                        En cours
                      </button>
                      <button
                        onClick={() => handleUpdateConsultationStatus(item.id!, 'confirme')}
                        className="px-2 py-1 bg-[#222222] hover:bg-[#333333] text-[10px] uppercase text-[#ECC246] cursor-pointer"
                        title="Confirmer rendez-vous en salon"
                      >
                        Confirmé
                      </button>
                      <button
                        onClick={() => handleUpdateConsultationStatus(item.id!, 'traite')}
                        className="px-2 py-1 bg-[#ECC246] text-black text-[10px] uppercase font-bold cursor-pointer"
                        title="Marquer comme mandat signé"
                      >
                        Mandat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLUB DEALS & ASSET OFFERINGS */}
        {activeTab === 'investments' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold">Club Deals & Actifs Privés au Catalogue</h3>
                <p className="text-xs text-[#A3A099]">Gestion discrétionnaire des syndications d'actifs réels pour les sociétaires</p>
              </div>

              <button
                onClick={() => setIsAddDealOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#ECC246] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#FFE08E] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publier une Opportunité</span>
              </button>
            </div>

            {/* Modal Add Deal */}
            {isAddDealOpen && (
              <div className="p-6 bg-[#181818] border border-[#ECC246]/40 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-[#2B2A26] pb-3">
                  <h4 className="font-serif text-base font-bold text-[#ECC246]">Nouveau Club Deal Décorrélé</h4>
                  <button onClick={() => setIsAddDealOpen(false)} className="text-xs text-[#A3A099] hover:text-white cursor-pointer">Annuler</button>
                </div>

                <form onSubmit={handleCreateDeal} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[11px] text-[#A3A099] uppercase">Titre de l'Opération</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Domaine Viticole Margaux"
                      value={newDealTitle}
                      onChange={(e) => setNewDealTitle(e.target.value)}
                      className="w-full p-2 bg-[#121212] border border-[#2B2A26] text-white outline-none focus:border-[#ECC246]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#A3A099] uppercase">Catégorie</label>
                    <select
                      value={newDealCategory}
                      onChange={(e) => setNewDealCategory(e.target.value as AdminDeal['category'])}
                      className="w-full p-2 bg-[#121212] border border-[#2B2A26] text-white outline-none"
                    >
                      <option value="Private Equity">Private Equity</option>
                      <option value="Immobilier Prestige">Immobilier Prestige</option>
                      <option value="Dette Privée">Dette Privée</option>
                      <option value="Actifs Réels & Viticoles">Actifs Réels & Viticoles</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#A3A099] uppercase">Montant Cible (€)</label>
                    <input
                      type="number"
                      value={newDealTarget}
                      onChange={(e) => setNewDealTarget(e.target.value)}
                      className="w-full p-2 bg-[#121212] border border-[#2B2A26] text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#A3A099] uppercase">TRI Cible Annoncé</label>
                    <input
                      type="text"
                      value={newDealIRR}
                      onChange={(e) => setNewDealIRR(e.target.value)}
                      className="w-full p-2 bg-[#121212] border border-[#2B2A26] text-white outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#ECC246] text-black font-semibold uppercase tracking-wider text-xs hover:bg-[#FFE08E] cursor-pointer"
                    >
                      Enregistrer & Diffuser aux Banquiers
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deals.map((deal) => {
                const percent = Math.min(100, Math.round((deal.raisedAmount / deal.targetAmount) * 100));
                return (
                  <div
                    key={deal.id}
                    className={`p-6 border space-y-4 ${
                      isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-[#ECC246] font-mono uppercase font-bold tracking-widest">
                          {deal.category} • {deal.location}
                        </span>
                        <h4 className="font-serif text-lg font-bold mt-1">{deal.title}</h4>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                        deal.status === 'Ouvert'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                          : 'bg-purple-500/15 text-purple-400 border-purple-500/40'
                      }`}>
                        {deal.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-xs py-3 border-y border-[#222222]">
                      <div>
                        <div className="text-[10px] text-[#A3A099] uppercase">Cible</div>
                        <div className="font-serif font-bold text-sm">{(deal.targetAmount / 1000000).toFixed(1)} M€</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#A3A099] uppercase">TRI Objectif</div>
                        <div className="font-bold text-[#ECC246] text-sm">{deal.targetIRR}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#A3A099] uppercase">Ticket Min.</div>
                        <div className="font-mono text-xs">{(deal.minimumTicket / 1000).toFixed(0)} k€</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#A3A099]">Souscriptions Enregistrées</span>
                        <span className="font-mono font-semibold">{percent}% ({(deal.raisedAmount / 1000000).toFixed(1)} M€)</span>
                      </div>
                      <div className="w-full h-2 bg-[#222222] overflow-hidden">
                        <div
                          className="h-full bg-[#ECC246] transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-[#A3A099] font-mono text-[11px]">Horizon : {deal.maturity}</span>
                      <button
                        onClick={() => {
                          const additional = 2000000;
                          setDeals(
                            deals.map((d) =>
                              d.id === deal.id
                                ? { ...d, raisedAmount: Math.min(d.targetAmount, d.raisedAmount + additional) }
                                : d
                            )
                          );
                          showNotification(`Souscription de 2.0 M€ simulée pour "${deal.title}".`);
                        }}
                        className="px-3 py-1 bg-[#202020] border border-[#ECC246]/40 text-[#ECC246] hover:bg-[#ECC246] hover:text-black transition-colors text-[10px] uppercase font-semibold cursor-pointer"
                      >
                        + 2 M€ Souscription
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: COMPLIANCE & AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold">Registre d'Audit Réglementaire & LCB-FT</h3>
                <p className="text-xs text-[#A3A099]">Journal d'événements infalsifiable horodaté sous contrôle du Déontologue</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const newLog: AdminAuditLog = {
                      id: `AUD-${Math.floor(900 + Math.random() * 100)}`,
                      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                      actor: 'A. de Montmirail (Audit)',
                      action: 'Attestation Manuelle de Conformité',
                      severity: 'compliance',
                      details: 'Attestation de stricte conformité au secret bancaire et aux règles de solvabilité Bâle III.',
                    };
                    setAuditLogs([newLog, ...auditLogs]);
                    showNotification('Audit horodaté enregistré dans la piste d\'audit certifiée.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#ECC246] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#FFE08E] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter Visa de Contrôle</span>
                </button>
              </div>
            </div>

            <div className={`border overflow-hidden ${
              isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className={`border-b text-[#A3A099] uppercase tracking-wider ${
                      isDarkTheme ? 'bg-[#1A1A1A] border-[#2B2A26]' : 'bg-[#F2EFE8] border-[#DED9D0]'
                    }`}>
                      <th className="py-3 px-4">Horodatage (UTC)</th>
                      <th className="py-3 px-4">Réf.</th>
                      <th className="py-3 px-4">Intervenant / Rôle</th>
                      <th className="py-3 px-4">Action & Objet</th>
                      <th className="py-3 px-4">Détails de Contrôle</th>
                      <th className="py-3 px-4">Niveau</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222222]">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#1A1A1A]/40">
                        <td className="py-3 px-4 font-mono text-[11px] text-[#A3A099] whitespace-nowrap">{log.timestamp}</td>
                        <td className="py-3 px-4 font-mono text-[#ECC246] font-semibold">{log.id}</td>
                        <td className="py-3 px-4 font-medium">{log.actor}</td>
                        <td className="py-3 px-4 font-semibold">{log.action}</td>
                        <td className="py-3 px-4 text-[#A3A099] max-w-md">{log.details}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                            log.severity === 'compliance'
                              ? 'bg-blue-500/15 text-blue-400 border-blue-500/40'
                              : log.severity === 'security'
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                              : 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                          }`}>
                            {log.severity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SALONS & GOVERNANCE */}
        {activeTab === 'salons' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-xl font-bold">Salons Privés & Gouvernance des Équipes</h3>
              <p className="text-xs text-[#A3A099]">Supervision des implantations physiques, coffres-forts et associés-gérants</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  city: 'Paris — Place Vendôme',
                  addr: '12, Place Vendôme, 75001 Paris',
                  director: 'Charles de Saint-Germain',
                  status: 'Ouvert • Salons d’Honneur Réservés',
                  vaultStatus: 'Coffres Forte Charge Actifs',
                  phone: '+33 1 42 68 00 00',
                },
                {
                  city: 'Genève — Rue du Rhône',
                  addr: '4, Rue du Rhône, 1204 Genève',
                  director: 'Alexandre de Montmirail',
                  status: 'Ouvert • Compensation Francs Suisses',
                  vaultStatus: 'Coffre Fortifié Sous-Lacustre',
                  phone: '+41 22 819 00 00',
                },
                {
                  city: 'Luxembourg — Boulevard Royal',
                  addr: '25, Boulevard Royal, L-2449 Luxembourg',
                  director: 'Marc-Antoine de Rothschild',
                  status: 'Ouvert • Gestion Fiduciaire CSSF',
                  vaultStatus: 'Chambre de Dépôt Agréée',
                  phone: '+352 26 44 00 00',
                },
                {
                  city: 'Monaco — Boulevard des Moulins',
                  addr: '17, Bd des Moulins, 98000 Monaco',
                  director: 'Victoire de Castries',
                  status: 'Ouvert • Family Offices Méditerranée',
                  vaultStatus: 'Conservation Titres Sécurisée',
                  phone: '+377 97 70 00 00',
                },
              ].map((salon, idx) => (
                <div
                  key={idx}
                  className={`p-6 border space-y-4 ${
                    isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Building2 className="w-5 h-5 text-[#ECC246]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-bold">{salon.city}</h4>
                    <p className="text-xs text-[#A3A099] mt-1">{salon.addr}</p>
                  </div>

                  <div className="space-y-2 text-xs pt-3 border-t border-[#222222]">
                    <div>
                      <span className="text-[10px] text-[#A3A099] uppercase">Direction du Salon</span>
                      <div className="font-semibold text-[#ECC246]">{salon.director}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A3A099] uppercase">Coffres & Conservation</span>
                      <div className="font-medium text-emerald-400">{salon.vaultStatus}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A3A099] uppercase">Ligne Interne Sécurisée</span>
                      <div className="font-mono text-[11px]">{salon.phone}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cryptographic Vault & Security Parameters Card */}
            <div className={`p-6 border space-y-4 ${
              isDarkTheme ? 'bg-[#141414] border-[#222222]' : 'bg-[#FFFFFF] border-[#E2DFD8]'
            }`}>
              <h4 className="font-serif text-base font-bold flex items-center gap-2 text-[#ECC246]">
                <ShieldCheck className="w-5 h-5" />
                <span>Paramètres de Sécurité Fiduciant & Double Signature</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#1B1B1B] border border-[#2B2A26] space-y-1">
                  <div className="font-semibold text-white">Chiffrement AES-256-GCM</div>
                  <p className="text-[#A3A099] text-[11px]">Tous les relevés et mandats de gestion sont chiffrés avec clés matérielles HSM dédiées.</p>
                </div>

                <div className="p-4 bg-[#1B1B1B] border border-[#2B2A26] space-y-1">
                  <div className="font-semibold text-white">Règle des Quatre Yeux</div>
                  <p className="text-[#A3A099] text-[11px]">Tout mouvement &gt; 1 000 000 € requiert la double signature de deux Associés-Gérants.</p>
                </div>

                <div className="p-4 bg-[#1B1B1B] border border-[#2B2A26] space-y-1">
                  <div className="font-semibold text-white">Zéro Dépendance Tiers</div>
                  <p className="text-[#A3A099] text-[11px]">Souveraineté totale des données, sans interconnexion à des services cloud publics tiers.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
