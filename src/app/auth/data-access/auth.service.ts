import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'https://localhost:8443/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    console.log('login credentials', username, password);
    this.logout();

    return this.http
      .post(
        `${this.API_URL}/seguridad/login`,
        { username, password },
        { observe: 'response' }
      )
      .subscribe((response) => {
        const token = response.headers.get('Authorization')?.split(' ')[1];
        if (token) {
          localStorage.setItem('jwt', token);
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

  isValidToken(token: string | null): boolean {
    if (!token) {
      return false;
    }

    try {
      // Decodifica el token usando jwt-decode
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

      // Verifica que no haya expirado
      return decoded.exp && decoded.exp > currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/auth/login']);
  }
}
