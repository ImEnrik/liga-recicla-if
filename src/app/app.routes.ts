import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'resumo',
    loadComponent: () => import('./resumo/resumo.page').then((m) => m.ResumoPage),
  },
    {
    path: 'resumo',
    loadComponent: () => import('./resumo/resumo.page').then((m) => m.ResumoPage),
  },
];
