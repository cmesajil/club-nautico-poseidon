import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudPostulacion } from '../interfaces/membership.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Membership {
  private readonly API_URL = `${environment.apiUrl}/api/solicitudes`;

  constructor(private http: HttpClient) { }

  postular(datos: SolicitudPostulacion): Observable<any> {
    return this.http.post(`${this.API_URL}/postular`, datos);
  }
}
