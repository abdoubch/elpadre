import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Clock, User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { User as UserType } from '../types/auth';

export const AdminPanel: React.FC = () => {
  const { getPendingUsers, approveUser, rejectUser, user } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<UserType[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      setPendingUsers(getPendingUsers());
    }
  }, [user, getPendingUsers]);

  const handleApprove = async (userId: string) => {
    setActionLoading(userId);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulation d'une requête
    
    if (approveUser(userId)) {
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
    }
    setActionLoading(null);
  };

  const handleReject = async (userId: string) => {
    setActionLoading(userId);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulation d'une requête
    
    if (rejectUser(userId)) {
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
    }
    setActionLoading(null);
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Users className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Panneau d'Administration
        </h2>
        <p className="text-gray-600">
          Gérez les demandes d'inscription des nouveaux utilisateurs
        </p>
      </div>

      {pendingUsers.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Aucune demande en attente
          </h3>
          <p className="text-gray-500">
            Toutes les demandes d'inscription ont été traitées
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Demandes en attente ({pendingUsers.length})
            </h3>
          </div>

          {pendingUsers.map((pendingUser) => (
            <div
              key={pendingUser.id}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">{pendingUser.nom}</h4>
                      <p className="text-gray-600 flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {pendingUser.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium">Demande créée:</span>
                      <span className="ml-1">
                        {pendingUser.dateCreation.toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-amber-500" />
                      <span className="font-medium">Statut:</span>
                      <span className="ml-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                        En attente
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 ml-4">
                  <button
                    onClick={() => handleApprove(pendingUser.id)}
                    disabled={actionLoading === pendingUser.id}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approuver
                  </button>
                  <button
                    onClick={() => handleReject(pendingUser.id)}
                    disabled={actionLoading === pendingUser.id}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Rejeter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};