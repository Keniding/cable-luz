import { Routes } from '@angular/router';

export const SUPPORT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/support-page/support-page.component')
      .then(m => m.SupportPageComponent),
    title: 'Soporte Técnico - CableLuz'
  },
  /**
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq-page/faq-page.component')
      .then(m => m.FaqPageComponent),
    title: 'Preguntas Frecuentes - CableLuz'
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat-support/chat-support.component')
      .then(m => m.ChatSupportComponent),
    title: 'Chat en Vivo - CableLuz'
  },
  {
    path: 'estado-servicio',
    loadComponent: () => import('./pages/service-status/service-status.component')
      .then(m => m.ServiceStatusComponent),
    title: 'Estado del Servicio - CableLuz'
  }
    */
];
