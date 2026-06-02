import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- IMPORTANTE AÑADIR ESTO
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule], // <-- LO AGREGAMOS AQUÍ
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}
