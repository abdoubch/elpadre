import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  getPendingUsers: () => User[];
  approveUser: (userId: string) => boolean;
  rejectUser: (userId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulation d'une base de données locale
const USERS_STORAGE_KEY = 'swimming_app_users';
const CURRENT_USER_KEY = 'swimming_app_current_user';

// Créer un admin par défaut s'il n'existe pas
const createDefaultAdmin = () => {
  const users = getStoredUsers();
  const adminExists = users.some(u => u.role === 'admin');
  
  if (!adminExists) {
    const defaultAdmin: User = {
      id: 'admin-default',
      email: 'mouloud_natation@yahoo.fr',
      nom: 'Administrateur',
      role: 'admin',
      dateCreation: new Date(),
      statut: 'approuve',
      dateApprobation: new Date(),
      approuvePar: 'system'
    };
    users.push(defaultAdmin);
    saveUsers(users);
  }
};

const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  const users = stored ? JSON.parse(stored) : [];
  return users.map((user: any) => ({
    ...user,
    dateCreation: new Date(user.dateCreation),
    dateApprobation: user.dateApprobation ? new Date(user.dateApprobation) : undefined
  }));
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (stored) {
    const user = JSON.parse(stored);
    return {
      ...user,
      dateCreation: new Date(user.dateCreation),
      dateApprobation: user.dateApprobation ? new Date(user.dateApprobation) : undefined
    };
  }
  return null;
};

const saveCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Créer l'admin par défaut
    createDefaultAdmin();
    
    // Vérifier si un utilisateur est déjà connecté
    const user = getCurrentUser();
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false
    });
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; message?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getStoredUsers();
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Email ou mot de passe incorrect' };
    }

    // Vérification du mot de passe pour l'admin
    if (user.role === 'admin' && credentials.password !== 'mouloudmouloud7366') {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Email ou mot de passe incorrect' };
    }

    if (user.statut === 'en_attente') {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Votre compte est en attente d\'approbation par l\'administrateur' };
    }

    if (user.statut === 'rejete') {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Votre compte a été rejeté par l\'administrateur' };
    }
    
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false
    });
    saveCurrentUser(user);
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getStoredUsers();
    
    // Vérifier si l'email existe déjà
    if (users.some(u => u.email === data.email)) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Cet email est déjà utilisé' };
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      nom: data.nom,
      role: 'coach', // Par défaut, nouveau utilisateur = coach
      dateCreation: new Date(),
      statut: 'en_attente' // Nouveau compte en attente d'approbation
    };
    
    users.push(newUser);
    saveUsers(users);
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    
    return { 
      success: true, 
      message: 'Votre compte a été créé avec succès. Il est en attente d\'approbation par l\'administrateur.' 
    };
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    saveCurrentUser(null);
  };

  const getPendingUsers = (): User[] => {
    const users = getStoredUsers();
    return users.filter(u => u.statut === 'en_attente');
  };

  const approveUser = (userId: string): boolean => {
    const users = getStoredUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1 && authState.user?.role === 'admin') {
      users[userIndex].statut = 'approuve';
      users[userIndex].dateApprobation = new Date();
      users[userIndex].approuvePar = authState.user.id;
      saveUsers(users);
      return true;
    }
    return false;
  };

  const rejectUser = (userId: string): boolean => {
    const users = getStoredUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1 && authState.user?.role === 'admin') {
      users[userIndex].statut = 'rejete';
      users[userIndex].dateApprobation = new Date();
      users[userIndex].approuvePar = authState.user.id;
      saveUsers(users);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      getPendingUsers,
      approveUser,
      rejectUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};