export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  REFRESH: '/api/auth/refresh',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
} as const;

export const RECIPE_ENDPOINTS = {
  LIST: '/api/recipes',
  DETAIL: (id: string) => `/api/recipes/${id}`,
  FAVORITES: '/api/recipes/favorites',
  TOGGLE_FAVORITE: (id: string) => `/api/recipes/${id}/favorite`,
} as const;
