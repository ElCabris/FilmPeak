// src/api/userService.ts
import { apiClient, setAuthToken } from './apiClient';
import { User, LoginResponse, RegisterRequest } from './types/user';

export const userService = {
  // Registrar un nuevo usuario
  register: async (userData: RegisterRequest): Promise<User> => {
    return apiClient.post('/users/register', userData);
  },

  // Iniciar sesión
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/users/login', {
      email,
      password,
    });
    
    setAuthToken(response.access_token);
    return response;
  },

  // Cerrar sesión
  logout: () => {
    setAuthToken(null);
  },

  // Obtener información del usuario actual
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get('/users/me');
  },

  // Actualizar perfil de usuario
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    return apiClient.put('/users/me', userData);
  },

  // Eliminar cuenta de usuario
  deleteAccount: async (): Promise<void> => {
    await apiClient.delete('/users/me');
    setAuthToken(null);
  },

  // Obtener usuario por ID (solo admin)
  getUserById: async (id: string): Promise<User> => {
    return apiClient.get(`/users/${id}`);
  },
};