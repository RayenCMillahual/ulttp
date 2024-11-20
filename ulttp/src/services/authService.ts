import axiosInstance from '@/api/axios';
import type { CredentialsModel } from '@/models/CredentialsModel';
import type { AuthApiResponseModel } from '@/models/AuthApiResponseModel';

export async function registerUser(credentials: CredentialsModel, csrfToken: string) {
    const response = await axiosInstance.post('/auth/signup', credentials, {
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    });
    return response.data;
  }

export const loginUser = async (credentials: CredentialsModel) => {
  console.log('[AuthService] Logging in with credentials:', credentials);
  return await axiosInstance.post<AuthApiResponseModel>('/auth/login', credentials);
};

export const renewToken = async (refreshToken: string) => {
  return await axiosInstance.post('/auth/renew-token', { refreshToken });
};

export async function getCsrfToken(): Promise<string> {
    try {
      const response = await axiosInstance.get('/auth/csrf');
      return response.data.csrfToken;
    } catch (error) {
      throw new Error('Error obteniendo CSRF Token');
    }
  }