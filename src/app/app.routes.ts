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
        path: 'questions',
        loadComponent: () =>
          import('./dashboard/questions/questions.component').then(
            (m) => m.QuestionsComponent
          ),
        title: 'Paso 3 - Gestión de preguntas de investigación - SMS Builder',
      },
      {
        path: 'importar-estudios-bd',
        loadComponent: () =>
          import('./dashboard/cargar-estudios-bd/cargar-estudios-bd.component').then(
            (m) => m.CargarEstudiosBDComponent
          ),
        title: 'Paso 9 - Importar estudios de BD',
      },

      {
        path: 'importar-estudios-id',
        loadComponent: () =>
          import('./dashboard/cargar-estudios-id/cargar-estudios-id.component').then(
            (m) => m.CargarEstudiosIdComponent
          ),
        title: 'Paso 10 - Importar estudios de Inclusion directa',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
