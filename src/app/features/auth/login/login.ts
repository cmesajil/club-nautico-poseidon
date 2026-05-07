import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    console.log(credentials);

    this.authService.login(credentials).subscribe({

      next: (response) => {

        console.log("TOKEN:");
        console.log(response);

        this.router.navigate(['/solicitud/lista-solicitudes']);
      },

      error: (error) => {

        console.log("ERROR");
        console.log(error);

        alert("Credenciales incorrectas");
      }

    });

  }
}