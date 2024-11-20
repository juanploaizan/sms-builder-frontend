import { Routes } from '@angular/router';
import { publicGuard, privateGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/ui/layout/layout.component';
import { RootPageComponent } from './dashboard/features/root-page/root-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
    canActivate: [publicGuard],
  },
  {
    path: '',
    canActivate: [privateGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: RootPageComponent,
      },
      {
        path: 'sms-configuration',
        loadComponent: () =>
          import(
            './dashboard/sms-configuration/sms-configuration.component'
          ).then((m) => m.SmsConfigurationComponent),
      },
      {
        path: 'goals',
        loadComponent: () =>
          import('./dashboard/goals/goals.component').then(
            (m) => m.GoalsComponent
          ),
        title: 'Paso 2 - Gestión de objetivos - SMS Builder',
      },
      {
        path: 'terminos',
        loadComponent: () =>
          import('./dashboard/terminos-busqueda/terminos-busqueda.component').then(
            (m) => m.TerminosBusquedaComponent
          ),
        title: 'Paso 4 - Termino de búsqueda - SMS Builder',
      },
      {
        path: 'selection-criteria',
        loadComponent: () =>
          import(
            './dashboard/selection-criteria/selection-criteria.component'
          ).then((m) => m.SelectionCriteriaComponent),
        title: 'Paso 5 - Criterios de selección - SMS Builder',
      },

      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
