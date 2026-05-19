import { Injectable, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { DashboardResumen } from './dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api';

  resumenResource = httpResource<DashboardResumen>(() => `${this.apiUrl}/dashboard/resumen`);
}
