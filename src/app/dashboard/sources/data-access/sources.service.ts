import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Source } from '../api/sources';

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  private API_URL = 'https://localhost:8443/api/fuentes';

  constructor(private http: HttpClient) {}

  getSources(): Observable<Source[]> {
    return this.http.get<Source[]>(`${this.API_URL}`);
  }

  getSource(id: string): Observable<Source> {
    return this.http.get<Source>(`${this.API_URL}/${id}`);
  }

  getSourcesDatabaseType(): Observable<Source[]> {
    return this.http.get<Source[]>(`${this.API_URL}?type=BASE_DATOS`);
  }

  createSource(source: Source): Observable<Source> {
    return this.http.post<Source>(`${this.API_URL}`, source);
  }

  updateSource(source: Source): Observable<Source> {
    return this.http.put<Source>(`${this.API_URL}/${source.id}`, source);
  }

  deleteSource(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
