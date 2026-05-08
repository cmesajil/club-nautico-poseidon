import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Para usar *ngIf o [disabled]

@Component({
  selector: 'app-postular-form',
  standalone: true, // Asegúrate de que esto esté presente
  imports: [

    CommonModule,
    ReactiveFormsModule // <-- OBLIGATORIO aquí para componentes standalone
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
    numeroDocumento: ['', [Validators.required, Validators.minLength(8)]],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: [''],
    clasificacionExterna: ['PAGADOR', Validators.required]
  });

  enviar() {
    if (this.form.valid) {
      // Por ahora, como no tenemos el servicio conectado, 
      // emitimos el valor al componente padre (la página)
      this.onSubmit.emit(this.form.value);
    }
  }
}