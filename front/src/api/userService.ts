import { apiClient, setAuthToken } from './apiClient';
import type { User, LoginResponse } from './types/user'; // Usar import type

export const userService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/users/login', {
      email,
      password,
    });
    
    setAuthToken(response.access_token);
    return response;
  },

};