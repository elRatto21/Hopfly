import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create-beer/create-beer.page').then( m => m.BeersPage)
  },
];
