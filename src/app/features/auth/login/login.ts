import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // Necesario para usar formGroup en el HTML
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Definimos el formulario con validaciones básicas
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as any;

      this.authService.login(credentials).subscribe({
        next: () => {
          console.log('Login exitoso');
          this.router.navigate(['/solicitud/lista-solicitudes']);
        },
        error: (err) => {
          console.error('Error en login', err);
          alert('Credenciales incorrectas');
        },
      });
    }
  }
}
