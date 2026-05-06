// Estructura de lo que el backend te enviará tras un login exitoso
export interface AuthResponse {
  token: string;
  user: {
    email: string;
    role: string; // Útil para saber si es administrador o usuario común
  };
}

// Estructura de lo que tú envías desde el formulario
export interface LoginCredentials {
  email: string;
  password: string;
}
