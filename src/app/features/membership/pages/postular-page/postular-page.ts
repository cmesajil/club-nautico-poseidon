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
  imports: [CommonModule,
    PostularForm],
  templateUrl: './postular-page.html',
  styleUrl: './postular-page.scss',
})
export class PostularPage {

  private membershipService = inject(Membership);
  private router = inject(Router)
  alRecibirDatos(datos: any) {
    console.log('Datos recibidos en la página:', datos);
    // Aquí es donde más adelante llamarás a tu servicio
    this.membershipService.postular(datos).subscribe({
      next: (response) => {

        // 1. ¿Qué mensaje te gustaría mostrarle al usuario aquí? 
        console.log('¡Éxito!', response);
        this.router.navigate(['/Estados/postulacion']);
      },

      error: (error) => {

        console.log("ERROR");
        console.log(error);

        alert("Error al enviar");
      }
    })

  }
}
