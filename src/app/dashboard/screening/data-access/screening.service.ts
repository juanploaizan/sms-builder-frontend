import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Screening } from '../api/screening';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  private API_URL = 'https://localhost:8443/api';

  constructor(private http: HttpClient) {}

  getScreenings(): Observable<Screening[]> {
    return this.http.get<Screening[]>(`${this.API_URL}/referencias`);
  }
}
