import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudPostulacion } from '../interfaces/membership.model';

@Injectable({
  providedIn: 'root',
})
export class Membership {
  private readonly API_URL = 'http://localhost:8080/api/solicitudes';

  constructor(private http: HttpClient) { }

  postular(datos: SolicitudPostulacion): Observable<any> {
    return this.http.post(`${this.API_URL}/postular`, datos);
  }
}
