export interface SolicitudPostulacion {
    // Datos de Persona
    tipoDocumento: string;
    numeroDocumento: string;
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string;
    direccion: string;

    // Datos de la Solicitud
    clasificacionExterna: 'PAGADOR' | 'PAGADOR_ESPORADICO' | 'RENUENTE';
}