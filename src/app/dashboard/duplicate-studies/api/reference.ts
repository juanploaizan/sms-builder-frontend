import { Source } from './source';

export interface Reference {
  id: string,
  spsid: string,
  nombre: string,
  year: string,
  resumen: string,
  tipo: string,
  totalEvaluacionCalidad: number, ///???
  relevancia: string,
  citas: number //?????
  ponderacionCitas: number,
  nota: number,
  sci: string,
  srrqi: string,
  duplicada: boolean,
  fuente: Source
}
