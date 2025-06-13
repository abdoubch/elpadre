import * as XLSX from 'xlsx';
import { Swimmer } from '../types/swimmer';

export const exportToExcel = (swimmers: Swimmer[]) => {
  // Préparer les données pour l'export
  const data = swimmers.map(swimmer => ({
    'Nom': swimmer.nom,
    'Année de naissance': swimmer.anneeNaissance,
    'Compétition': swimmer.competition,
    'Course': swimmer.course,
    'Temps d\'engagement': swimmer.tempsEngagement,
    'Date d\'inscription': new Date(swimmer.dateInscription).toLocaleDateString('fr-FR')
  }));

  // Créer un nouveau classeur
  const wb = XLSX.utils.book_new();
  
  // Créer une feuille de calcul avec les données
  const ws = XLSX.utils.json_to_sheet(data);

  // Définir la largeur des colonnes
  const colWidths = [
    { wch: 20 }, // Nom
    { wch: 15 }, // Année de naissance
    { wch: 25 }, // Compétition
    { wch: 15 }, // Course
    { wch: 15 }, // Temps d'engagement
    { wch: 20 }  // Date d'inscription
  ];
  ws['!cols'] = colWidths;

  // Ajouter la feuille au classeur
  XLSX.utils.book_append_sheet(wb, ws, 'Inscriptions');

  // Générer le fichier Excel
  const fileName = `inscriptions_${new Date().toLocaleDateString('fr-FR')}.xlsx`;
  XLSX.writeFile(wb, fileName);
}; 