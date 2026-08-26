import { Routes } from '@angular/router';
// import { authGuard } from './auth-guard';
// import { loginGuard } from './services/login Guard/login.guard';
// import { routeGuard } from './services/routeGuard/route-guard';
// import { VerifyComponent } from './pages/public/verify-agent/verify';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about').then((m) => m.About),
  },
  {
    path: 'menu',
    loadComponent: () => import('./components/menu/menu').then((m) => m.Menu),
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./components/gallery/gallery').then((m) => m.Gallery),
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact').then((m) => m.Contact),
  },
];
