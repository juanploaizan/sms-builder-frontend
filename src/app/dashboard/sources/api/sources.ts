export interface Source {
  id: string;
  nombre: string;
  tipo: 'BASE_DE_DATOS' | 'BOLA_NIEVE' | 'INCLUSION_DIRECTA';
}
