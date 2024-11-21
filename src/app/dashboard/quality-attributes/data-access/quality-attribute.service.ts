import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QualityAttribute } from '../api/quality-attribute';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QualityAttributeService {
  constructor(private http: HttpClient) {}

  private API_URL = environment.apiUrl;
  private QUALITY_ATTRIBUTES_PATH = environment.qualityAttributesPath;

  getQualityAttributes(): Observable<QualityAttribute[]> {
    return this.http.get<QualityAttribute[]>(
      this.API_URL + this.QUALITY_ATTRIBUTES_PATH
    );
  }

  getQualityAttribute(id: string): Observable<QualityAttribute> {
    return this.http.get<QualityAttribute>(
      this.API_URL + this.QUALITY_ATTRIBUTES_PATH + '/' + id
    );
  }

  createQualityAttribute(
    qualityAttribute: QualityAttribute
  ): Observable<QualityAttribute> {
    return this.http.post<QualityAttribute>(
      this.API_URL + this.QUALITY_ATTRIBUTES_PATH,
      qualityAttribute
    );
  }

  updateQualityAttribute(
    qualityAttribute: QualityAttribute
  ): Observable<QualityAttribute> {
    return this.http.put<QualityAttribute>(
      this.API_URL + this.QUALITY_ATTRIBUTES_PATH + '/' + qualityAttribute.id,
      qualityAttribute
    );
  }

  deleteQualityAttribute(id: string): Observable<void> {
    return this.http.delete<void>(
      this.API_URL + this.QUALITY_ATTRIBUTES_PATH + '/' + id
    );
  }
}
