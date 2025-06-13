import React from 'react';
import { Swimmer } from '../types/swimmer';
import { Trash2, FileSpreadsheet } from 'lucide-react';
import { exportToExcel } from '../services/excel';

interface SwimmerListProps {
  swimmers: Swimmer[];
  onDelete: (id: string) => void;
}

export const SwimmerList: React.FC<SwimmerListProps> = ({ swimmers, onDelete }) => {
  if (swimmers.length === 0) {
    return (
      <div className="text-center py-12">
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
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString('fr-FR');
    } catch (error) {
      return 'Date invalide';
    }
  };

  const handleExportExcel = () => {
    exportToExcel(swimmers);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Liste des inscriptions ({swimmers.length})
        </h2>
        <button
          onClick={handleExportExcel}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FileSpreadsheet className="w-5 h-5 mr-2" />
          Exporter en Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {swimmers.map((swimmer) => (
          <div
            key={swimmer.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{swimmer.nom}</h3>
                <p className="text-sm text-gray-500">Né(e) en {swimmer.anneeNaissance}</p>
              </div>
              <button
                onClick={() => onDelete(swimmer.id)}
                className="text-red-600 hover:text-red-700 transition-colors"
                title="Supprimer l'inscription"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Compétition:</span>
                <span className="font-medium">{swimmer.competition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium">{swimmer.course}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Temps d'engagement:</span>
                <span className="font-medium">{swimmer.tempsEngagement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date d'inscription:</span>
                <span className="font-medium">{formatDate(swimmer.dateInscription)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};