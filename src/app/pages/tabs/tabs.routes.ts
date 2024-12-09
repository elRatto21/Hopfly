import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'beers',
        loadComponent: () =>
          import('../beers/beers.page').then((m) => m.BeersPage),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('../map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('../stats/stats.page').then((m) => m.StatsPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../settings/settings.page').then((m) => m.SettingsPage)
      },
      {
        path: '',
        redirectTo: '/beers',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/beers',
    pathMatch: 'full',
  },
];
