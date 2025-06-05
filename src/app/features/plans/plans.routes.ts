// src/app/features/plans/plans.routes.ts
import { Routes } from '@angular/router';

export const PLANS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/plans-page/plans-page.component')
      .then(m => m.PlansPageComponent),
    title: 'Planes de Internet - CableLuz'
  },
  /*
  {
    path: 'comparar',
    loadComponent: () => import('./pages/compare-plans/compare-plans.component')
      .then(m => m.ComparePlansComponent),
    title: 'Comparar Planes - CableLuz'
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/plan-detail/plan-detail.component')
      .then(m => m.PlanDetailComponent),
    title: 'Detalle del Plan - CableLuz'
  }
  */
];
