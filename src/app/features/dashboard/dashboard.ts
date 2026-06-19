import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DashboardService } from './dashboard.service';
import { CurrencyPipe } from '@angular/common';
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, NgApexchartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);

  resource = this.dashboardService.resumenResource;
  sociosResource = this.dashboardService.sociosEstadoResource;
  ingresosResource = this.dashboardService.ingresosMesResource;

  currentUser = this.authService.currentUser;

  resumen = this.resource.value;
  sociosData = this.sociosResource.value;
  ingresosData = this.ingresosResource.value;

  userEmail = computed(() => this.currentUser()?.user.email ?? '');

  serviciosDisponibles = () => this.resumen()?.servicios.filter((s) => s.disponible).length ?? 0;

  pieChartOptions = computed<ApexOptions>(() => {
    const data = this.sociosData();
    if (!data) return { series: [], labels: [], chart: { type: 'pie' } };
    return {
      series: data.map((d) => d.cantidad),
      labels: data.map((d) => d.estado),
      chart: {
        type: 'pie',
        height: 350
      },
      legend: {
        position: 'bottom'
      }
    };
  });

  barChartOptions = computed<ApexOptions>(() => {
    const data = this.ingresosData();
    if (!data) return { series: [], chart: { type: 'bar' }, xaxis: { categories: [] } };
    return {
      series: [{
        name: 'Ingresos',
        data: data.map((d) => d.total)
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: data.map((d) => `${d.month}/${d.year}`)
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        labels: {
          formatter: (value) => {
            return "$" + value.toFixed(2);
          }
        }
      }
    };
  });

  reload() {
    this.resource.reload();
    this.sociosResource.reload();
    this.ingresosResource.reload();
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'Club_nautico_nocturno.jpg';
  }
}
