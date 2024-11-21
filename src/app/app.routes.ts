import { Routes } from '@angular/router';
import { publicGuard, privateGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/ui/layout/layout.component';
import { RootPageComponent } from './dashboard/features/root-page/root-page.component';
import { QualityAttributesComponent } from './dashboard/quality-attributes/quality-attributes.component';

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
          import(
            './dashboard/terminos-busqueda/terminos-busqueda.component'
          ).then((m) => m.TerminosBusquedaComponent),
        title: 'Paso 4 - Termino de búsqueda - SMS Builder',
      },
      {
        path: 'terminos',
        loadComponent: () =>
          import(
            './dashboard/terminos-busqueda/terminos-busqueda.component'
          ).then((m) => m.TerminosBusquedaComponent),
        title: 'Paso 4 - Termino de búsqueda - SMS Builder',
      },
      {
        path: 'quality-attributes',
        loadComponent: () =>
          import(
            './dashboard/quality-attributes/quality-attributes.component'
          ).then((m) => m.QualityAttributesComponent),
        title: 'Paso 5 - Atributos de Calidad - SMS Builder',
      },

      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
