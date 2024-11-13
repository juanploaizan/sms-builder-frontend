import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/data-access/auth.service';

export const publicGuard: CanActivateFn = () => {
  const routerService = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    routerService.navigate(['']);
    return false;
  }

  return true;
};

export const privateGuard: CanActivateFn = () => {
  const routerService = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isLoggedIn()) {
    routerService.navigate(['auth/login']);
    return false;
  }

  return true;
};
