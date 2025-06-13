import React, { useState } from 'react';
import { User, Calendar, Trophy, Clock, Waves, Send } from 'lucide-react';
import { SwimmerFormData } from '../types/swimmer';
import { COURSES_NATATION, COMPETITIONS_TYPES } from '../data/courses';

interface SwimmerFormProps {
  onSubmit: (swimmer: SwimmerFormData) => void;
}

export const SwimmerForm: React.FC<SwimmerFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SwimmerFormData>({
    nom: '',
    anneeNaissance: '',
    competition: '',
    tempsEngagement: '',
    course: ''
  });

  const [errors, setErrors] = useState<Partial<SwimmerFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<SwimmerFormData> = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    const annee = parseInt(formData.anneeNaissance);
    const currentYear = new Date().getFullYear();
    if (!formData.anneeNaissance || annee < 1950 || annee > currentYear) {
      newErrors.anneeNaissance = `L'année doit être entre 1950 et ${currentYear}`;
    }

    if (!formData.competition) {
      newErrors.competition = 'La compétition est requise';
    }

    if (!formData.course) {
      newErrors.course = 'La course est requise';
    }

    if (!formData.tempsEngagement.trim()) {
      newErrors.tempsEngagement = 'Le temps d\'engagement est requis';
    } else if (!/^\d{1,2}:\d{2}\.\d{2}$/.test(formData.tempsEngagement)) {
      newErrors.tempsEngagement = 'Format: MM:SS.CC (ex: 1:23.45)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        nom: '',
        anneeNaissance: '',
        competition: '',
        tempsEngagement: '',
        course: ''
      });
      setErrors({});
    }
  };

  const handleChange = (field: keyof SwimmerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Waves className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Inscription d'Athlète
        </h2>
        <p className="text-gray-600">
          Saisissez les informations de votre nageur pour l'inscription
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2 text-blue-600" />
              Nom de l'athlète *
            </label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.nom ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Prénom Nom"
            />
            {errors.nom && <p className="text-red-600 text-sm mt-1">{errors.nom}</p>}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              Année de naissance *
            </label>
            <input
              type="number"
              value={formData.anneeNaissance}
              onChange={(e) => handleChange('anneeNaissance', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.anneeNaissance ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="2005"
              min="1950"
              max={new Date().getFullYear()}
            />
            {errors.anneeNaissance && <p className="text-red-600 text-sm mt-1">{errors.anneeNaissance}</p>}
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Trophy className="w-4 h-4 mr-2 text-blue-600" />
            Compétition *
          </label>
          <select
            value={formData.competition}
            onChange={(e) => handleChange('competition', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.competition ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <option value="">Sélectionnez une compétition</option>
            {COMPETITIONS_TYPES.map((comp) => (
              <option key={comp} value={comp}>{comp}</option>
            ))}
          </select>
          {errors.competition && <p className="text-red-600 text-sm mt-1">{errors.competition}</p>}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Waves className="w-4 h-4 mr-2 text-blue-600" />
            Course *
          </label>
          <select
            value={formData.course}
            onChange={(e) => handleChange('course', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.course ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <option value="">Sélectionnez une course</option>
            {COURSES_NATATION.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          {errors.course && <p className="text-red-600 text-sm mt-1">{errors.course}</p>}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            Temps d'engagement *
          </label>
          <input
            type="text"
            value={formData.tempsEngagement}
            onChange={(e) => handleChange('tempsEngagement', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.tempsEngagement ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="1:23.45"
          />
          {errors.tempsEngagement && <p className="text-red-600 text-sm mt-1">{errors.tempsEngagement}</p>}
          <p className="text-gray-500 text-sm mt-1">Format: MM:SS.CC (minutes:secondes.centièmes)</p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <Send className="w-5 h-5 mr-2" />
          Inscrire l'athlète
        </button>
      </form>
    </div>
  );
};