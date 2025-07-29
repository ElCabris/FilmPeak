import { apiClient, setAuthToken } from './apiClient';
import type { User, LoginResponse, UserRegister, UserLogin, UserProfiles, ProfileCreateRequest } from './types/user';

export const userService = {
  // Login endpoint - corregido para usar /login en lugar de /users/login
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/login', {
      email,
      password,
    });
    
    setAuthToken(response.access_token);
    return response;
  },

  // Registro de usuario
  register: async (userData: UserRegister): Promise<User> => {
    const response = await apiClient.post('/register', userData);
    return response;
  },

  // Obtener perfiles de usuario
  getProfiles: async (email: string): Promise<UserProfiles> => {
    const response = await apiClient.get(`/user/profiles/${email}`);
    return response;
  },

  // Crear perfil de usuario
  createProfile: async (data: ProfileCreateRequest): Promise<{ message: string }> => {
    const response = await apiClient.post('/user/profiles/create', data);
    return response;
  },
};