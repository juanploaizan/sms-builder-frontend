import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/data-access/auth.service';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (authService.isValidToken(token)) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  // Manejo de errores
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && router.url !== '/auth/login') {
        authService.logout();
        router.navigate(['/auth/login']).catch((navError) => {
          console.error('Navigation error:', navError);
        });
      }
      console.error('Request error:', error);
      return throwError(() => error);
    })
  );
};
