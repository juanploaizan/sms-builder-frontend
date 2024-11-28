import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Study } from '../api/study';
import { Observable } from 'rxjs';
import { Source } from '../api/source';

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  private API_URL = environment.apiUrl;
  private REFERENCES_PATH = environment.referencesPath;
  private SOURCES_PATH = environment.sourcesPath;
  constructor(private http: HttpClient) {}

  getStudies(): Observable<Study[]> {
    return this.http.get<Study[]>(this.API_URL + this.REFERENCES_PATH);
  }

  getSource(id: string): Observable<Source> {
    return this.http.get<Source>(this.API_URL + this.SOURCES_PATH + '/' + id);
  }
}
