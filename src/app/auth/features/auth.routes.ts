import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export default [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - SMS Builder',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
] as Routes;
