import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginCredentials } from './auth.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient); // Inyección moderna de Angular 21

  // Usamos un Signal para que la app reaccione al cambio de estado
  private currentUser = signal<AuthResponse | null>(null);

  // Un signal computado (solo lectura) para que los componentes sepan si hay sesión
  isAuthenticated = computed(() => !!this.currentUser());

  login(credentials: LoginCredentials) {
    // Aquí usamos la URL que te de el equipo de backend
    return this.http.post<AuthResponse>('api/login', credentials).pipe(
      tap((response) => {
        this.currentUser.set(response); // Guardamos en el Signal
        localStorage.setItem('token', response.token); // Persistencia simple
      }),
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('token');
  }
}
