import React from 'react';
import { Waves, Trophy, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex">
              <Waves className="w-10 h-10 text-white" />
              <Trophy className="w-10 h-10 text-yellow-300 -ml-2" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                AquaRegistration
              </h1>
              <p className="text-blue-100 text-sm md:text-base">
                Gestion des inscriptions de natation
              </p>
            </div>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2">
                <User className="w-5 h-5" />
                <div className="text-right">
                  <p className="font-medium text-sm">{user.nom}</p>
                  <p className="text-xs text-blue-100 capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors duration-200"
                title="Se déconnecter"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};