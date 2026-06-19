export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

export interface DashboardResumen {
  totalServicios: number;
  totalSocios: number;
  servicios: Servicio[];
}

export interface SocioEstado {
  estado: string;
  cantidad: number;
}

export interface IngresoMes {
  year: number;
  month: number;
  total: number;
}
