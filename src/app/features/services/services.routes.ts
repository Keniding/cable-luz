import { Routes } from '@angular/router';

export const SERVICES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/services-page/services-page.component')
      .then(m => m.ServicesPageComponent),
    title: 'Servicios - CableLuz'
  },
/**
  {
    path: 'internet',
    loadComponent: () => import('./pages/internet-service/internet-service.component')
      .then(m => m.InternetServiceComponent),
    title: 'Internet Fibra Óptica - CableLuz'
  },
  {
    path: 'cable-tv',
    loadComponent: () => import('./pages/tv-service/tv-service.component')
      .then(m => m.TvServiceComponent),
    title: 'Cable TV HD - CableLuz'
  },
  {
    path: 'streaming',
    loadComponent: () => import('./pages/streaming-service/streaming-service.component')
      .then(m => m.StreamingServiceComponent),
    title: 'Streaming Premium - CableLuz'
  }
    */
];
