import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../api/goal';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private API_URL = 'https://localhost:8443/api/objetivos';

  constructor(private http: HttpClient) {}

  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.API_URL}`);
  }

  getGoal(id: string): Observable<Goal> {
    return this.http.get<Goal>(`${this.API_URL}/${id}`);
  }

  createGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(`${this.API_URL}`, goal);
  }

  updateGoal(goal: Goal): Observable<Goal> {
    return this.http.put<Goal>(`${this.API_URL}/${goal.id}`, goal);
  }

  deleteGoal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
