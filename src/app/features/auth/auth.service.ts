import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginCredentials } from './auth.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  //yano es private
  currentUser = signal<AuthResponse | null>(null);

  isAuthenticated = computed(() => !!this.currentUser());

  login(credentials: LoginCredentials) {
    return this.http.post<AuthResponse>('http://localhost:8080/auth/login', credentials).pipe(
      tap((response) => {
        console.log('LOGIN EXITOSO');
        console.log(response);

        this.currentUser.set(response);

        localStorage.setItem('token', response.token);
      }),
    );
  }

  logout() {
    this.currentUser.set(null);

    localStorage.removeItem('token');
  }
}
