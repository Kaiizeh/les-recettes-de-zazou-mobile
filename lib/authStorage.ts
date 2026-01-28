import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthTokens, User } from '@/types/auth';

const KEYS = {
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  USER: 'auth_user',
  TOKEN_EXPIRY: 'auth_token_expiry',
} as const;

export const authStorage = {
  getAccessToken: async (): Promise<string | null> => {
    return AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
  },

  getRefreshToken: async (): Promise<string | null> => {
    return AsyncStorage.getItem(KEYS.REFRESH_TOKEN);
  },

  getTokens: async (): Promise<AuthTokens | null> => {
    const [accessToken, refreshToken, expiryStr] = await Promise.all([
      AsyncStorage.getItem(KEYS.ACCESS_TOKEN),
      AsyncStorage.getItem(KEYS.REFRESH_TOKEN),
      AsyncStorage.getItem(KEYS.TOKEN_EXPIRY),
    ]);

    if (!accessToken || !refreshToken) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      expiresIn: expiryStr ? parseInt(expiryStr, 10) : 0,
    };
  },

  setTokens: async (tokens: AuthTokens): Promise<void> => {
    await Promise.all([
      AsyncStorage.setItem(KEYS.ACCESS_TOKEN, tokens.accessToken),
      AsyncStorage.setItem(KEYS.REFRESH_TOKEN, tokens.refreshToken),
      AsyncStorage.setItem(KEYS.TOKEN_EXPIRY, tokens.expiresIn.toString()),
    ]);
  },

  getUser: async (): Promise<User | null> => {
    const data = await AsyncStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setUser: async (user: User): Promise<void> => {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  clearAll: async (): Promise<void> => {
    await Promise.all([
      AsyncStorage.removeItem(KEYS.ACCESS_TOKEN),
      AsyncStorage.removeItem(KEYS.REFRESH_TOKEN),
      AsyncStorage.removeItem(KEYS.USER),
      AsyncStorage.removeItem(KEYS.TOKEN_EXPIRY),
    ]);
  },

  isTokenExpired: async (): Promise<boolean> => {
    const expiryStr = await AsyncStorage.getItem(KEYS.TOKEN_EXPIRY);
    if (!expiryStr) return true;

    const expiryTimestamp = parseInt(expiryStr, 10);
    return Date.now() >= expiryTimestamp;
  },
};
