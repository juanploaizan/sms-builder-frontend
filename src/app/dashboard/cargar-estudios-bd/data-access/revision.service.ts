import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RevisionService {
  private API_URL = 'https://localhost:8443/api/revision/pasoActual';

  constructor(private http: HttpClient) {}

  getPasoActual(): Observable<{ id: string }> {
    return this.http.get<{ id: string }>(this.API_URL);
  }
}
