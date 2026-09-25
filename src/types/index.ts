export type ScreenType = 'accueil' | 'patrimoine' | 'investissements' | 'financement' | 'maison' | 'drive';

export type Language = 'fr' | 'en' | 'pt';

export interface SalonLocation {
  city: string;
  name: string;
  address: string;
  postal: string;
  country: string;
  phone: string;
  features: string[];
}

export interface ConsultationRequest {
  fullName: string;
  email: string;
  phone?: string;
  salon: string;
  nature: string;
  message?: string;
  date?: string;
}

export interface ClientPortfolio {
  accountHolder: string;
  societaireId: string;
  privateBanker: {
    name: string;
    role: string;
    salon: string;
    phone: string;
    email: string;
  };
  valuationLabel: string;
  performanceLabel: string;
  allocations: {
    category: string;
    weightTier: string;
    color: string;
  }[];
  recentMovements: {
    id: string;
    date: string;
    label: string;
    category: string;
    type: 'inflow' | 'outflow' | 'neutral';
  }[];
  fiduciaryDocuments: {
    id: string;
    title: string;
    type: string;
    date: string;
    size: string;
  }[];
}
