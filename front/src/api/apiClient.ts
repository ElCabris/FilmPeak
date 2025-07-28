// src/api/apiClient.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const apiClient = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return this.handleResponse(response);
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  },

  async put(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    return this.handleResponse(response);
  },

  async handleResponse(response: Response) {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { detail: 'Error desconocido' };
      }
      
      throw new ApiError(
        response.status,
        errorData.detail || 'Error en la solicitud',
        errorData
      );
    }
    
    // Manejar respuestas vacías
    if (response.status === 204) {
      return null;
    }
    
    return response.json();
  },
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Guardar token JWT
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Obtener token JWT
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Interceptor para añadir token a las solicitudes
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  const token = getAuthToken();
  const headers = new Headers(init?.headers);
  
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  
  const newInit = init ? { ...init, headers } : { headers };
  
  return originalFetch(input, newInit);
};