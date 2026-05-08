import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LoginComponent } from './features/auth/login/login';

// Importa tu HomeComponent aquí si ya lo tienes creado
export const routes: Routes = [
  // 1. Ruta inicial (Home)
  { path: '', component: Home },
  {
    path: 'membership', // El prefijo de la ruta
    loadChildren: () => import('./features/membership/membership-module').then(m => m.MembershipModule)
  },
  // 2. Ruta de Login (Ahora sí la va a encontrar)
  { path: 'login', component: LoginComponent },

  // 3. Comodín (SIEMPRE al final). Si escriben cualquier tontería, al Home.
  { path: '**', redirectTo: '' },

];
