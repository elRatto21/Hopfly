import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../screens/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('../screens/map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('../screens/stats/stats.page').then((m) => m.StatsPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../screens/settings/settings.page').then((m) => m.SettingsPage)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
