import React from 'react';
import { Swimmer } from '../types/swimmer';
import { User, Calendar, Trophy, Clock, Waves, Mail, Trash2 } from 'lucide-react';

interface SwimmerListProps {
  swimmers: Swimmer[];
  onDelete: (id: string) => void;
  onSendEmail: (swimmers: Swimmer[]) => void;
}

export const SwimmerList: React.FC<SwimmerListProps> = ({ swimmers, onDelete, onSendEmail }) => {
  if (swimmers.length === 0) {
    return (
      <div className="text-center py-12">
        <Waves className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Aucune inscription pour le moment
        </h3>
        <p className="text-gray-500">
          Commencez par inscrire votre premier nageur
        </p>
      </div>
    );
  }

  const calculateAge = (yearOfBirth: number) => {
    return new Date().getFullYear() - yearOfBirth;
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Erreur de formatage de date:', error);
      return 'Date invalide';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">
          Inscriptions ({swimmers.length})
        </h3>
        {swimmers.length > 0 && (
          <button
            onClick={() => onSendEmail(swimmers)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Envoyer par email
          </button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {swimmers.map((swimmer) => (
          <div
            key={swimmer.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{swimmer.nom}</h4>
                  <p className="text-gray-600">
                    {calculateAge(swimmer.anneeNaissance)} ans
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDelete(swimmer.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Trophy className="w-4 h-4 mr-2 text-amber-500" />
                <span>{swimmer.competition}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Waves className="w-4 h-4 mr-2 text-blue-500" />
                <span>{swimmer.course}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-green-500" />
                <span>{swimmer.tempsEngagement}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                <span>Inscrit le {formatDate(swimmer.dateInscription)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};