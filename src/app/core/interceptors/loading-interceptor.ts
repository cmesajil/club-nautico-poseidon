import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const router = inject(Router);

  // 1. Intentar meter el token si existe
  const token = localStorage.getItem('token');
  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  // 2. Mostrar el spinner
  loadingService.show();

  // 3. Procesar la petición, capturar si el token expiró y apagar el spinner al final
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el backend da error porque el token caducó
      if (
        error.status === 401 ||
        (error.status === 500 && error.error?.includes('ExpiredJwtException'))
      ) {
        localStorage.removeItem('token'); // Borramos el token viejo
        router.navigate(['/login']); // Mandamos al login
      }
      return throwError(() => error);
    }),
    finalize(() => loadingService.hide()), // Tu código original que apaga el spinner siempre
  );
};
