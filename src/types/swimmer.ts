export interface Swimmer {
  id: string;
  nom: string;
  anneeNaissance: number;
  competition: string;
  tempsEngagement: string;
  course: string;
  dateInscription: Date;
}

export interface SwimmerFormData {
  nom: string;
  anneeNaissance: string;
  competition: string;
  tempsEngagement: string;
  course: string;
}