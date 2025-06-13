import { Swimmer } from '../types/swimmer';

const SWIMMERS_STORAGE_KEY = 'swimming_app_swimmers';

export const storageService = {
  // Sauvegarder les nageurs
  saveSwimmers: (swimmers: Swimmer[]): void => {
    try {
      localStorage.setItem(SWIMMERS_STORAGE_KEY, JSON.stringify(swimmers));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des nageurs:', error);
    }
  },

  // Récupérer les nageurs
  getSwimmers: (): Swimmer[] => {
    try {
      const swimmers = localStorage.getItem(SWIMMERS_STORAGE_KEY);
      if (!swimmers) return [];
      
      // Convertir les dates string en objets Date
      return JSON.parse(swimmers).map((swimmer: any) => ({
        ...swimmer,
        dateInscription: new Date(swimmer.dateInscription)
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des nageurs:', error);
      return [];
    }
  },

  // Ajouter un nageur
  addSwimmer: (swimmer: Swimmer): void => {
    try {
      const swimmers = storageService.getSwimmers();
      swimmers.push(swimmer);
      storageService.saveSwimmers(swimmers);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du nageur:', error);
    }
  },

  // Supprimer un nageur
  deleteSwimmer: (id: string): void => {
    try {
      const swimmers = storageService.getSwimmers();
      const updatedSwimmers = swimmers.filter(swimmer => swimmer.id !== id);
      storageService.saveSwimmers(updatedSwimmers);
    } catch (error) {
      console.error('Erreur lors de la suppression du nageur:', error);
    }
  },

  // Mettre à jour un nageur
  updateSwimmer: (updatedSwimmer: Swimmer): void => {
    try {
      const swimmers = storageService.getSwimmers();
      const updatedSwimmers = swimmers.map(swimmer => 
        swimmer.id === updatedSwimmer.id ? updatedSwimmer : swimmer
      );
      storageService.saveSwimmers(updatedSwimmers);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du nageur:', error);
    }
  }
}; 