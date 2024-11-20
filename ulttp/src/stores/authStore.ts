import { defineStore } from 'pinia';
import router from '@/router';
import { registerUser as registerService, loginUser, renewToken, getCsrfToken } from '@/services/authService';
import axiosInstance from '@/api/axios';
import type { SesionStateModel } from '@/models/SesionStateModel';
import type { CredentialsModel } from '@/models/CredentialsModel';
import type { AuthApiResponseModel } from '@/models/AuthApiResponseModel';

export const useAuthStore = defineStore('auth', {
  state: (): SesionStateModel => ({
    isAuthenticated: false,
    user: null,
    jwtExpires: undefined,
    csrfToken: localStorage.getItem('csrfToken') || '',
    loading: false,
    error: '',
  }),
  actions: {
    async loadCsrfToken() {
      if (this.csrfToken) {
        console.log('[AuthStore] CSRF Token cargado desde el estado:', this.csrfToken);
        axiosInstance.defaults.headers.common['X-CSRF-Token'] = this.csrfToken;
        return;
      }

      const tokenFromLocalStorage = localStorage.getItem('csrfToken');
      if (tokenFromLocalStorage) {
        this.csrfToken = tokenFromLocalStorage;
        axiosInstance.defaults.headers.common['X-CSRF-Token'] = tokenFromLocalStorage;
        console.log('[AuthStore] CSRF Token cargado desde localStorage:', this.csrfToken);
        return;
      }

      try {
        const response = await getCsrfToken();
        this.csrfToken = response;
        localStorage.setItem('csrfToken', response);
        axiosInstance.defaults.headers.common['X-CSRF-Token'] = response;
        console.log('[AuthStore] CSRF Token obtenido:', this.csrfToken);
      } catch (error: any) {
        console.error('[AuthStore] Error al obtener CSRF Token:', error.response?.data || error.message);
        this.error = error.response?.data?.message || 'Error al obtener CSRF Token';
      }
    },

    async registerUser(credentials: CredentialsModel) {
      this.loading = true;
      try {
        await this.loadCsrfToken();
        const response = await registerService(credentials, this.csrfToken);
        console.log('[AuthStore] Registro exitoso:', response);
        await this.login(credentials);
      } catch (error: any) {
        console.error('[AuthStore] Error al registrar usuario:', error.response?.data || error.message);
        this.error = error.response?.data?.message || 'Error al registrar usuario';
      } finally {
        this.loading = false;
      }
    },

    async login(credentials: CredentialsModel) {
      this.loading = true;
      try {
        const { data }: { data: AuthApiResponseModel } = await loginUser(credentials);
        this.user = {
          userId: data.userId,
          email: credentials.email,
          token: data.token,
          refreshToken: data.refreshToken,
        };
        this.isAuthenticated = true;
        this.jwtExpires = Math.floor(Date.now() / 1000) + 3 * 60;
        console.info('[AuthStore] Usuario logueado correctamente:', data);
        router.push('/');
      } catch (error: any) {
        console.error('[AuthStore] Error al iniciar sesión:', error.response?.data || error.message);
        this.error = error.response?.data?.message || 'Error al iniciar sesión';
      } finally {
        this.loading = false;
      }
    },

    async renewToken() {
      try {
        const { data } = await renewToken(this.user?.refreshToken || '');
        this.jwtExpires = Math.floor(Date.now() / 1000) + 3 * 60;
        this.user.token = data.token;
        console.info('[AuthStore] Token renovado correctamente');
      } catch (error) {
        console.error('[AuthStore] Error al renovar token, cerrando sesión:', error);
        await this.logout();
      }
    },

    async logout() {
      try {
        await axiosInstance.post('/auth/logout');
        this.isAuthenticated = false;
        this.user = null;
        this.jwtExpires = undefined;
        console.info('[AuthStore] Usuario cerrado sesión');
        router.push('/login');
      } catch (error) {
        console.error('[AuthStore] Error al cerrar sesión:', error);
      }
    },
  },
});
