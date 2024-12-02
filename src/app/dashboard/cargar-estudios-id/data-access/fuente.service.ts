import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fuente } from '../api/fuente';

@Injectable({
  providedIn: 'root',
})
export class FuenteService {
  private API_URL = 'https://localhost:8443/api/fuentes';

  constructor(private http: HttpClient) {}

  // Método para traer solo las fuentes del tipo BASE_DATOS
  getFuentes(): Observable<Fuente[]> {
    return this.http.get<Fuente[]>(this.API_URL);
  }
}
