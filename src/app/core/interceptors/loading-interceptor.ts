import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize, catchError, throwError, delay } from 'rxjs';
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

  // 3. Procesar la petición
  return next(clonedReq).pipe(
    delay(4000), // Puesto aquí para que retrase tanto éxitos como errores durante tus pruebas
    catchError((error: HttpErrorResponse) => {
      // Convertimos el objeto de error a string para buscar la excepción de Java de forma segura
      const errorString = JSON.stringify(error.error);
      const isJwtExpired = errorString && errorString.includes('ExpiredJwtException');

      // Si el backend da 401, o da 500 pero el mensaje contiene la excepción del token caducado
      if (error.status === 401 || (error.status === 500 && isJwtExpired)) {
        console.warn('¡Token expirado detectado en el frontend! Limpiando sesión...');

        localStorage.removeItem('token'); // Borramos el token viejo para romper el bucle
        router.navigate(['/login']); // Mandamos al login
      }

      return throwError(() => error);
    }),
    finalize(() => loadingService.hide()), // Apaga el spinner siempre
  );
};
