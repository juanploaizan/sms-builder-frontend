import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchString } from '../api/search-string';

@Injectable({
  providedIn: 'root',
})
export class SearchStringsService {
  private API_URL = 'https://localhost:8443/api/cadenasbusqueda';

  constructor(private http: HttpClient) {}

  getSearchStrings(): Observable<SearchString[]> {
    return this.http.get<SearchString[]>(`${this.API_URL}`);
  }

  getSearchString(id: string): Observable<SearchString> {
    return this.http.get<SearchString>(`${this.API_URL}/${id}`);
  }

  createSearchString(searchString: SearchString): Observable<SearchString> {
    return this.http.post<SearchString>(`${this.API_URL}`, searchString);
  }

  updateSearchString(searchString: SearchString): Observable<SearchString> {
    return this.http.put<SearchString>(
      `${this.API_URL}/${searchString.id}`,
      searchString
    );
  }

  deleteSearchString(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
