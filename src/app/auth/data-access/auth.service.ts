import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'https://localhost:8443/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    console.log('login credentials', username, password);
    this.logout(); // Clear previous token

    return this.http
      .post(
        `${this.API_URL}/seguridad/login`,
        { username, password },
        { observe: 'response' }
      )
      .subscribe((response) => {
        const token = response.headers.get('Authorization')?.split(' ')[1];
        if (token) {
          localStorage.setItem('jwt', token); // Store token securely
          this.router.navigate(['/']);
        }
      });
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/auth/login']);
  }
}
