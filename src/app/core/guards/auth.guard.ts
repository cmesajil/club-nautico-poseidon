import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si está autenticado (según nuestro Signal), pasa. Si no, al login.
  return authService.isAuthenticated() || router.parseUrl('/auth/login');
};
