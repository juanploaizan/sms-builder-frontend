import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Termino } from '../api/termino';

@Injectable({
  providedIn: 'root',
})
export class TerminoService {
  private API_URL = 'https://localhost:8443/api/terminos';

  constructor(private http: HttpClient) {}

  getTerminos(): Observable<Termino[]> {
    return this.http.get<Termino[]>(`${this.API_URL}`);
  }

  getTermino(id: string): Observable<Termino> {
    return this.http.get<Termino>(`${this.API_URL}/${id}`);
  }

  createTermino(termino: Termino): Observable<Termino> {
    return this.http.post<Termino>(`${this.API_URL}`, termino);
  }

  updateTermino(termino: Termino): Observable<Termino> {
    return this.http.put<Termino>(`${this.API_URL}/${termino.id}`, termino);
  }

  deleteTermino(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // @DELETE @Path("/{id}/recursos/{sinonimo}")

  // @PATCH @Path("/{id}/sinonimos")
}
