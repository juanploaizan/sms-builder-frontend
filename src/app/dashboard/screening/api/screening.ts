export interface Screening {
  id: string;
  seleccionada: boolean;
  nombre: string;
  relevancia: string | null;
  year: string;
  keywords: string;
  resumen: string;
  tags: string[];
  nota: string | null;
}
