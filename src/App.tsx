import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthPage } from './components/AuthPage';
import { Header } from './components/Header';
import { SwimmerForm } from './components/SwimmerForm';
import { SwimmerList } from './components/SwimmerList';
import { EmailModal } from './components/EmailModal';
import { AdminPanel } from './components/AdminPanel';
import { Swimmer, SwimmerFormData } from './types/swimmer';
import { Loader2, Clock } from 'lucide-react';
import { storageService } from './services/storage';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [swimmers, setSwimmers] = useState<Swimmer[]>([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Charger les nageurs au démarrage
  useEffect(() => {
    const savedSwimmers = storageService.getSwimmers();
    setSwimmers(savedSwimmers);
  }, []);

  const handleAddSwimmer = (formData: SwimmerFormData) => {
    const newSwimmer: Swimmer = {
      id: Date.now().toString(),
      nom: formData.nom,
      anneeNaissance: parseInt(formData.anneeNaissance),
      competition: formData.competition,
      tempsEngagement: formData.tempsEngagement,
      course: formData.course,
      dateInscription: new Date()
    };

    setSwimmers(prev => {
      const updatedSwimmers = [...prev, newSwimmer];
      storageService.saveSwimmers(updatedSwimmers);
      return updatedSwimmers;
    });
  };

  const handleDeleteSwimmer = (id: string) => {
    setSwimmers(prev => {
      const updatedSwimmers = prev.filter(swimmer => swimmer.id !== id);
      storageService.saveSwimmers(updatedSwimmers);
      return updatedSwimmers;
    });
  };

  const handleSendEmail = (swimmers: Swimmer[]) => {
    setIsEmailModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {user?.role === 'admin' && <AdminPanel />}
        
        {user?.statut === 'approuve' && (
          <>
            <SwimmerForm onSubmit={handleAddSwimmer} />
            
            {user?.role === 'admin' && (
              <SwimmerList 
                swimmers={swimmers} 
                onDelete={handleDeleteSwimmer}
                onSendEmail={handleSendEmail}
              />
            )}
          </>
        )}

        {user?.statut === 'en_attente' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-2">
              Compte en attente d'approbation
            </h3>
            <p className="text-amber-800">
              Votre compte a été créé avec succès mais doit être approuvé par un administrateur 
              avant que vous puissiez accéder aux fonctionnalités de l'application.
            </p>
          </div>
        )}
      </main>

      <EmailModal
        swimmers={swimmers}
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2025 AquaRegistration - Gestion professionnelle des inscriptions de natation</p>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;