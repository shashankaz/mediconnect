export interface Doctor {
  id: string;
  name: string;
  profilePicture: string;
  about: string;
  specialty: string;
  experience: number;
  degree: string;
  location: string;
  hospital: string;
  rate: number;
  availability: boolean;
  modeOfConsultation: "Online" | "Offline";
}

export interface Filters {
  modeOfConsultation?: string;
  experience?: string;
  rate?: string;
  language?: string;
  availability?: boolean;
}
