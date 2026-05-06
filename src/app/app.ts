import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // Agrega RouterLink aquí

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // Agrégalo también a la lista de imports
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('mi-app');
}
