import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../api/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private API_URL = 'https://localhost:8443/api/preguntas';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.API_URL);
  }

  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.API_URL}/${id}`);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.API_URL, question);
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.API_URL}/${question.id}`, question);
  }

  deleteQuestion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  addTopic(questionId: string, topicId: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/${questionId}/topicos`, { id: topicId });
  }

  removeTopic(questionId: string, topicId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${questionId}/topicos/${topicId}`);
  }
}
