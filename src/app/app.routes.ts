import { Routes } from '@angular/router';
import {AppLayoutComponent} from './shared/components/layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/pages/home-page/home-page.component')
          .then(m => m.HomePageComponent),
        title: 'CableLuz - Internet y TV de Alta Velocidad'
      },
      {
        path: 'planes',
        loadChildren: () => import('./features/plans/plans.routes')
          .then(m => m.PLANS_ROUTES),
        title: 'Planes de Internet - CableLuz'
      },
      {
        path: 'servicios',
        loadChildren: () => import('./features/services/services.routes')
          .then(m => m.SERVICES_ROUTES),
        title: 'Servicios - CableLuz'
      },
      {
        path: 'cobertura',
        loadComponent: () => import('./features/coverage/pages/coverage-page/coverage-page.component')
          .then(m => m.CoveragePageComponent),
        title: 'Cobertura - CableLuz'
      },
      {
        path: 'soporte',
        loadChildren: () => import('./features/support/support.routes')
          .then(m => m.SUPPORT_ROUTES),
        title: 'Soporte Técnico - CableLuz'
      },
      {
        path: 'nosotros',
        loadComponent: () => import('./features/about/pages/about-page/about-page.component')
          .then(m => m.AboutPageComponent),
        title: 'Nosotros - CableLuz'
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component')
      .then(m => m.NotFoundComponent),
    title: 'Página no encontrada - CableLuz'
  }
];
