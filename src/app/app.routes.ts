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
        title: 'Gestión de objetivos - SMS Builder',
      },
      {
        path: 'sources',
        loadComponent: () =>
          import('./dashboard/sources/sources.component').then(
            (m) => m.SourcesComponent
          ),
        title: 'Fuentes de datos - SMS Builder',
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
            './dashboard/selection-criteria/selection-criteria.component'
          ).then((m) => m.SelectionCriteriaComponent),
        title: 'Criterios de selección - SMS Builder',
      },
      {
        path: 'selection-criteria',
        loadComponent: () =>
          import(
            './dashboard/selection-criteria/selection-criteria.component'
          ).then((m) => m.SelectionCriteriaComponent),
        title: 'Criterios de selección - SMS Builder',
      },
      {
        path: 'quality-attributes',
        loadComponent: () =>
          import(
            './dashboard/quality-attributes/quality-attributes.component'
          ).then((m) => m.QualityAttributesComponent),
        title: 'Atributos de Calidad - SMS Builder',
      },
      {
        path: 'search-strings',
        loadComponent: () =>
          import('./dashboard/search-strings/search-strings.component').then(
            (m) => m.SearchStringsComponent
          ),
        title: 'Cadenas de búsqueda - SMS Builder',
      },
      {
        path: 'screening',
        loadComponent: () =>
          import('./dashboard/screening/screening.component').then(
            (m) => m.ScreeningComponent
          ),
        title: 'Screening - SMS Builder',
      },
      {
        path: 'duplicate-studies',
        loadComponent: () =>
          import(
            './dashboard/duplicate-studies/duplicate-studies.component'
          ).then((m) => m.DuplicateStudiesComponent),
        title: 'Paso 11 - Remover Estudios Duplicados - SMS Builder',
      },
      {
        path: 'search-strings',
        loadComponent: () =>
          import('./dashboard/search-strings/search-strings.component').then(
            (m) => m.SearchStringsComponent
          ),
        title: 'Cadenas de búsqueda - SMS Builder',
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
