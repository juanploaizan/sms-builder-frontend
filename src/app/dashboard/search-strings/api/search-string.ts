import { Source } from '../../sources/api/sources';

export interface SearchString {
  id: string;
  baseDatos: Source;
  consulta: string;
  fechaConsulta: string;
  resultadoPreliminar: number;
  resultadoFinal: number;
}
