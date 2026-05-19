import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DashboardService } from './dashboard.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);

  resource = this.dashboardService.resumenResource;

  currentUser = this.authService.currentUser;

  resumen = this.resource.value;

  userEmail = computed(() => this.currentUser()?.user.email ?? '');

  serviciosDisponibles = () => this.resumen()?.servicios.filter((s) => s.disponible).length ?? 0;

  reload() {
    this.resource.reload();
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'Club_nautico_nocturno.jpg';
  }
}
