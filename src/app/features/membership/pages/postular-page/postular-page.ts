import { inject } from '@angular/core'; // Necesitas importar esto
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importa el componente del formulario
import { PostularForm } from '../../components/postular-form/postular-form';
import { Membership } from '../../services/membership'; // Ajusta la ruta
import { Router } from '@angular/router';

@Component({
  selector: 'app-postular-page',
  standalone: true,
  imports: [CommonModule, PostularForm],
  templateUrl: './postular-page.html',
  styleUrl: './postular-page.scss',
})
export class PostularPage {
  // Nueva variable para controlar el mensaje en la vista
  mensajeExito: string | null = null;

  private membershipService = inject(Membership);
  private router = inject(Router);
  alRecibirDatos(datos: any) {
    console.log('Datos recibidos en la página:', datos);
    // Aquí es donde más adelante llamarás a tu servicio
    this.membershipService.postular(datos).subscribe({
      next: (response) => {
        console.log('¡Éxito!', response);

        // 1. Mostramos el mensaje
        this.mensajeExito = '¡Postulación enviada con éxito!';

        // 2. Esperamos 3 segundos (3000 ms) antes de cambiar de página
        setTimeout(() => {
          this.router.navigate(['/Estados/postulacion']);
        }, 3000);
      },

      error: (error) => {
        console.log('ERROR');
        console.log(error);

        alert('Error al enviar');
      },
    });
  }
}
