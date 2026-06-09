import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Para usar *ngIf o [disabled]

@Component({
  selector: 'app-postular-form',
  standalone: true, // Asegúrate de que esto esté presente
  imports: [
    CommonModule,
    ReactiveFormsModule, // <-- OBLIGATORIO aquí para componentes standalone
  ],
  templateUrl: './postular-form.html',
  styleUrl: './postular-form.scss',
})
export class PostularForm {
  private fb = inject(FormBuilder); // Forma moderna de inyectar en Angular 17+

  @Output() onSubmit = new EventEmitter<any>();

  // Usamos un solo nombre para el formulario
  form = this.fb.group({
    tipoDocumento: ['', Validators.required],

    numeroDocumento: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],

    nombres: [
      '',
      [
        Validators.required,

        // Solo letras y espacios, y obliga a que exista al menos una vocal
        Validators.pattern(/^(?=.*[AEIOUÁÉÍÓÚaeiouáéíóú])[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/),

        // Longitud máxima
        Validators.maxLength(50),
      ],
    ],

    apellidos: [
      '',
      [
        Validators.required,

        Validators.pattern(/^(?=.*[AEIOUÁÉÍÓÚaeiouáéíóú])[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/),

        Validators.maxLength(50),
      ],
    ],

    correo: ['', [Validators.required, Validators.email]],

    telefono: ['', [Validators.pattern(/^\d{9}$/)]],

    clasificacionExterna: ['PAGADOR', Validators.required],
  });

  soloNumeros(event: KeyboardEvent) {
    const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

    if (teclasPermitidas.includes(event.key)) {
      return;
    }

    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  soloLetras(event: KeyboardEvent) {
    const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

    if (teclasPermitidas.includes(event.key)) {
      return;
    }

    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ ]/.test(event.key)) {
      event.preventDefault();
    }
  }

  enviar() {
    if (this.form.valid) {
      // Por ahora, como no tenemos el servicio conectado,
      // emitimos el valor al componente padre (la página)
      this.onSubmit.emit(this.form.value);
    }
  }
}
