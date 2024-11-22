import { Metadata } from './metadata';
import { Reference } from './reference';
import { Source } from './source';

export interface Study {
  referencia: Reference;
  metadatos: Metadata[];
  seleccionada: boolean;
  etapa: number;
  keywords: string;
  autores: string;

  id: string;
  spsid: string;
  nombre: string;
  year: string;
  resumen: string;
  tipo: string;
  totalEvaluacionCalidad: number;
  relevancia: number;
  citas: number;
  ponderacionCitas: number;
  nota: string;
  sci: number;
  srrqi: number;
  duplicada: boolean;
  fuente: string;
  nombreFuente: string;

  tags: string[]; ///???
}
