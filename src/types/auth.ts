export interface User {
  id: string;
  email: string;
  nom: string;
  role: 'admin' | 'coach' | 'user';
  dateCreation: Date;
  statut: 'en_attente' | 'approuve' | 'rejete';
  dateApprobation?: Date;
  approuvePar?: string; // ID de l'admin qui a approuvé
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  nom: string;
  confirmPassword: string;
}