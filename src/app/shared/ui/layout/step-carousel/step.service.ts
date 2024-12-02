import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepsService {
  private baseUrl = 'https://localhost:8443/api';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el ID del paso actual desde el backend.
   * @returns Observable que emite solo el ID del paso actual.
   */
  getPasoActual(): Observable<string> {
    return this.http.get<any>(`${this.baseUrl}/revision/pasoActual`).pipe(
      map(response => response.id) // Extrae solo el ID del paso actual
    );
  }

  /**
   * Obtiene el ID del paso por el orden especificado desde el backend.
   * @param orden Número de orden del paso.
   * @returns Observable que emite solo el ID del paso correspondiente al orden.
   */
  getPasoByOrden(orden: number): Observable<string> {
    return this.http.get<any>(`${this.baseUrl}/pasosproceso`, {
      params: { orden: orden.toString() },
    }).pipe(
      map(response => response.id) // Extrae solo el ID del paso
    );
  }

  /**
   * Actualiza el paso actual en el backend con el ID del nuevo paso.
   * @param id ID del paso a establecer como actual.
   * @returns Observable con la respuesta del backend tras actualizar el paso actual.
   */
  updatePasoActual(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/revision/pasoActual`, null, {
      params: { id },
    });
  }

  /**
   * Cambia el paso actual en el backend basado en el orden.
   * @param orden Número de orden del paso al que se desea cambiar.
   */
  changePasoActualByOrden(orden: number): Observable<any> {
    return new Observable((observer) => {
      this.getPasoByOrden(orden).subscribe({
        next: (pasoId) => {
          this.updatePasoActual(pasoId).subscribe({
            next: () => {
              console.log(orden)
              console.log(pasoId)
              observer.next({ message: 'Paso actualizado correctamente' });
              observer.complete();
            },
            error: (error) => {
              console.log(orden)
              console.log(pasoId)
              observer.error({ message: 'Error al actualizar el paso actual', error });
            },
          });
        },
        error: (error) => {
          observer.error({ message: 'Error al obtener el paso por orden', error });
        },
      });
    });
  }
}
