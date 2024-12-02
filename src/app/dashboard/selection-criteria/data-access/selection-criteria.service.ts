import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectionCriteria } from '../api/selection-criteria';

@Injectable({
  providedIn: 'root',
})
export class SelectionCriteriaService {
  private API_URL = 'https://localhost:8443/api/criteriosseleccion';

  constructor(private http: HttpClient) {}

  getSelectionCriteria(): Observable<SelectionCriteria[]> {
    return this.http.get<SelectionCriteria[]>(`${this.API_URL}`);
  }

  getSelectionCriterion(id: string): Observable<SelectionCriteria> {
    return this.http.get<SelectionCriteria>(`${this.API_URL}/${id}`);
  }

  createSelectionCriterion(
    selectionCriterion: SelectionCriteria
  ): Observable<SelectionCriteria> {
    return this.http.post<SelectionCriteria>(
      `${this.API_URL}`,
      selectionCriterion
    );
  }

  updateSelectionCriterion(
    selectionCriterion: SelectionCriteria
  ): Observable<SelectionCriteria> {
    return this.http.put<SelectionCriteria>(
      `${this.API_URL}/${selectionCriterion.id}`,
      selectionCriterion
    );
  }

  deleteSelectionCriterion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
