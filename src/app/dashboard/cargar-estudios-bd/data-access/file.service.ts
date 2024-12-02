import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private API_URL = 'https://localhost:8443/api/files';

  constructor(private http: HttpClient) {}

  uploadFile(id: string, idFuente: string, tipoArchivo: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.API_URL}/${id}/${idFuente}/${tipoArchivo}`, formData);
  }
}
