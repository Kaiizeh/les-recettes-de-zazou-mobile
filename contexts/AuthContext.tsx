import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiClient, getAuthErrorMessage } from '@/lib/api/client';
import { AUTH_ENDPOINTS } from '@/lib/api/endpoints';
import { authStorage } from '@/lib/authStorage';
import type {
  User,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from '@/types/auth';

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const [user, tokens] = await Promise.all([
          authStorage.getUser(),
          authStorage.getTokens(),
        ]);

        if (user && tokens) {
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.post<AuthResponse>(
        AUTH_ENDPOINTS.LOGIN,
        credentials
      );

      const { user, tokens } = response.data;

      await Promise.all([
        authStorage.setTokens(tokens),
        authStorage.setUser(user),
      ]);

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      const response = await apiClient.post<AuthResponse>(
        AUTH_ENDPOINTS.REGISTER,
        credentials
      );

      const { user, tokens } = response.data;

      await Promise.all([
        authStorage.setTokens(tokens),
        authStorage.setUser(user),
      ]);

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    } catch {
      // Ignore logout errors - we'll clear local state anyway
    } finally {
      await authStorage.clearAll();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await apiClient.get<{ user: User }>(AUTH_ENDPOINTS.ME);
      const { user } = response.data;

      await authStorage.setUser(user);

      setState((prev) => ({
        ...prev,
        user,
      }));
    } catch (error) {
      // If refresh fails with 401, user will be logged out by interceptor
      throw new Error(getAuthErrorMessage(error));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
