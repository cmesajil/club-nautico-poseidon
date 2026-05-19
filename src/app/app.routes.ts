import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LoginComponent } from './features/auth/login/login';

// Importa tu HomeComponent aquí si ya lo tienes creado
export const routes: Routes = [
  { path: '', component: Home },

  {
    path: 'membership',
    loadChildren: () =>
      import('./features/membership/membership-module').then((m) => m.MembershipModule),
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
  },

  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: '' },
];
