import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, AUTH_ENDPOINTS } from './endpoints';
import { authStorage } from '../authStorage';
import type { AuthTokens } from '@/types/auth';

interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else if (token) {
      item.resolve(token);
    }
  });
  failedQueue = [];
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await authStorage.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Skip refresh for auth endpoints
    const isAuthEndpoint =
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/register') ||
      originalRequest?.url?.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        // Queue request while refreshing
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await authStorage.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post<{ tokens: AuthTokens }>(
          `${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`,
          { refreshToken }
        );

        const { tokens } = response.data;
        await authStorage.setTokens(tokens);

        processQueue(null, tokens.accessToken);

        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        await authStorage.clearAll();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Auth error messages in French
export const getAuthErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const code = error.response?.data?.code;

    if (!error.response) {
      return 'Impossible de se connecter. Verifiez votre connexion.';
    }

    switch (code) {
      case 'INVALID_CREDENTIALS':
        return 'Email ou mot de passe incorrect';
      case 'EMAIL_EXISTS':
        return 'Cet email est deja utilise';
      case 'USER_NOT_FOUND':
        return 'Utilisateur non trouve';
      case 'INVALID_TOKEN':
        return 'Session expiree. Veuillez vous reconnecter.';
      default:
        if (status === 401) {
          return 'Email ou mot de passe incorrect';
        }
        if (status === 409) {
          return 'Cet email est deja utilise';
        }
        if (status === 422) {
          return 'Donnees invalides. Verifiez les champs.';
        }
        if (status && status >= 500) {
          return 'Erreur serveur. Veuillez reessayer plus tard.';
        }
        return 'Une erreur est survenue. Veuillez reessayer.';
    }
  }
  return 'Une erreur est survenue. Veuillez reessayer.';
};
