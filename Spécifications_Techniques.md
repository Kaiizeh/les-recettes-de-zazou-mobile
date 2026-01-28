# Spécifications Techniques - Application Mobile de Recettes

## 📋 Vue d'ensemble

Application mobile React Native/Expo permettant aux utilisateurs de consulter des recettes, les réaliser, et y ajouter des commentaires et notes. Mode offline-first avec synchronisation automatique.

---

## 🛠️ Stack Technique

### Frontend
- **Framework** : React Native via Expo SDK (latest stable)
- **Langage** : TypeScript (strict mode)
- **Styling** : NativeWind v4
- **UI Components** : React Native Reusables
- **Navigation** : React Navigation v6 (ou Expo Router selon préférence)

### State Management
- **État global** : Zustand v4
  - Queue de synchronisation offline
  - État applicatif (filters, preferences)
  - Queue commentaires/notes en attente
- **État contexte** : Context API
  - Authentication state
  - Theme (dark/light)
  - Internationalisation (i18n)
- **État serveur** : TanStack Query v5
  - Cache des recettes
  - Gestion automatique du loading/error
  - Invalidation intelligente

### Persistence & Offline
- **Storage local** : MMKV
  - Cache persistant TanStack Query
  - Tokens d'authentification (access + refresh)
  - Préférences utilisateur
  - Queue offline (commentaires/notes)
- **Stratégie de cache** :
  - Recettes : Cache 24h, stale-while-revalidate
  - Images : Cache permanent avec éviction LRU
  - User data : Cache 1h

### Forms & Validation
- **Forms** : React Hook Form v7
- **Validation** : Zod v3
- **Use cases** :
  - Formulaire commentaire
  - Formulaire notation
  - Formulaire authentification

### Backend & API
- **Backend** : .NET 10 (Minimal APIs)
- **API** : REST API
- **Database** : PostgreSQL (standalone sur VPS)
- **Auth** : ASP.NET Identity + JWT
- **Storage Images** : MinIO (S3-compatible) - URLs publiques en lecture seule

### HTTP Client
- **Librairie** : Axios
- **Interceptors** : Gestion automatique du refresh token

### Internationalisation
- **Librairie** : react-i18next
- **Langues** : Français (défaut), Anglais
- **Fallback** : Français

---

## 📁 Architecture de Projet

```
/src
├── /api                    # Configuration API clients
│   ├── client.ts          # Axios instance + interceptors
│   ├── endpoints.ts       # Endpoints constants
│   └── types.ts           # Types API responses
│
├── /features              # Features (domain-driven)
│   ├── /auth
│   │   ├── /components
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── /hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useRefreshToken.ts
│   │   ├── /screens
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── /stores
│   │   │   └── authStore.ts
│   │   └── /types
│   │       └── auth.types.ts
│   ├── /recipes
│   │   ├── /components
│   │   │   ├── RecipeCard.tsx
│   │   │   ├── RecipeDetail.tsx
│   │   │   └── RecipeList.tsx
│   │   ├── /hooks
│   │   │   ├── useRecipes.ts
│   │   │   ├── useRecipeDetail.ts
│   │   │   └── useRecipeSync.ts
│   │   ├── /screens
│   │   │   ├── RecipesListScreen.tsx
│   │   │   ├── RecipeDetailScreen.tsx
│   │   │   └── RecipeRealizationScreen.tsx
│   │   ├── /stores
│   │   │   └── recipesStore.ts
│   │   ├── /services
│   │   │   └── recipeService.ts
│   │   └── /types
│   ├── /comments
│   │   ├── /components
│   │   │   └── CommentForm.tsx
│   │   ├── /hooks
│   │   │   └── useComments.ts
│   │   ├── /stores
│   │   │   └── offlineCommentsStore.ts
│   │   └── /types
│   └── /ratings
│       ├── /components
│       │   └── RatingForm.tsx
│       ├── /hooks
│       └── /stores
│
├── /components            # Composants partagés
│   ├── /ui               # React Native Reusables
│   ├── /layout
│   └── /common
│
├── /contexts             # React Contexts
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── I18nContext.tsx
│
├── /hooks                # Hooks globaux
│   ├── useNetworkStatus.ts
│   ├── useSync.ts
│   └── useAppState.ts
│
├── /lib                  # Utilitaires & config
│   ├── /i18n
│   │   ├── index.ts
│   │   ├── fr.json
│   │   └── en.json
│   ├── /storage
│   │   └── mmkv.ts
│   ├── /query
│   │   ├── queryClient.ts
│   │   └── mmkvPersister.ts
│   └── /utils
│
├── /navigation           # Configuration navigation
│   ├── RootNavigator.tsx
│   └── types.ts
│
├── /constants
│   ├── theme.ts
│   └── config.ts
│
└── /types                # Types globaux
    └── index.ts
```

---

## 🔐 Authentication Flow

### API .NET Integration

L'authentification est gérée entièrement par l'API .NET avec ASP.NET Identity et JWT.

```typescript
// src/api/client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { storage } from '@/lib/storage/mmkv';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Types
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

// State pour le refresh
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Instance Axios
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur Request - Ajout du token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = storage.getString('auth.accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur Response - Gestion refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Si 401 et pas déjà en retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Attendre que le refresh soit terminé
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject: (err: Error) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = storage.getString('auth.refreshToken');

      if (!refreshToken) {
        isRefreshing = false;
        // Déclencher logout
        storage.delete('auth.accessToken');
        storage.delete('auth.refreshToken');
        storage.delete('auth.user');
        // Naviguer vers login (via event ou store)
        return Promise.reject(error);
      }

      try {
        const response = await axios.post<TokenResponse>(
          `${API_URL}/api/auth/refresh`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Sauvegarder les nouveaux tokens
        storage.set('auth.accessToken', accessToken);
        storage.set('auth.refreshToken', newRefreshToken);

        // Mettre à jour le header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        
        // Logout
        storage.delete('auth.accessToken');
        storage.delete('auth.refreshToken');
        storage.delete('auth.user');
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
```

### Auth Context

```typescript
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiClient } from '@/api/client';
import { storage } from '@/lib/storage/mmkv';

interface User {
  id: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restaurer la session au démarrage
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const accessToken = storage.getString('auth.accessToken');
        const storedUser = storage.getString('auth.user');

        if (accessToken && storedUser) {
          setUser(JSON.parse(storedUser));
          
          // Vérifier que le token est encore valide
          try {
            const response = await apiClient.get('/api/auth/me');
            setUser(response.data);
            storage.set('auth.user', JSON.stringify(response.data));
          } catch {
            // Token invalide, le refresh sera tenté automatiquement par l'intercepteur
          }
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await apiClient.post('/api/auth/login', { email, password });
    const { user, accessToken, refreshToken } = response.data;

    storage.set('auth.accessToken', accessToken);
    storage.set('auth.refreshToken', refreshToken);
    storage.set('auth.user', JSON.stringify(user));

    setUser(user);
  }, []);

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    const response = await apiClient.post('/api/auth/register', {
      email,
      password,
      displayName,
    });
    const { user, accessToken, refreshToken } = response.data;

    storage.set('auth.accessToken', accessToken);
    storage.set('auth.refreshToken', refreshToken);
    storage.set('auth.user', JSON.stringify(user));

    setUser(user);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await apiClient.post('/api/auth/logout');
    } catch {
      // Ignorer les erreurs de logout côté serveur
    } finally {
      storage.delete('auth.accessToken');
      storage.delete('auth.refreshToken');
      storage.delete('auth.user');
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Stratégie offline
- Tokens stockés dans MMKV (sécurisé)
- Si offline : utiliser tokens en cache
- Si access token expiré + offline : maintenir session locale jusqu'à reconnexion
- À la reconnexion : refresh automatique via intercepteur
- Afficher badge "Mode Offline" dans l'UI

---

## 📊 Data Models

### Recipe

```typescript
interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  ingredients: Ingredient[];
  steps: Step[];
  images: string[]; // URLs MinIO (lecture seule)
  category: string;
  tags: string[];
  averageRating: number;
  ratingsCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  isOptional?: boolean;
  order: number;
}

interface Step {
  id: string;
  order: number;
  instruction: string;
  duration?: number; // minutes
  imageUrl?: string; // URL MinIO
}
```

### Comment

```typescript
interface Comment {
  id: string;
  recipeId: string;
  userId: string;
  user: {
    id: string;
    displayName: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: 'synced' | 'pending' | 'error';
  localId?: string; // UUID temporaire pour offline
}
```

### Rating

```typescript
interface Rating {
  id: string;
  recipeId: string;
  userId: string;
  score: number; // 1-5
  createdAt: string;
  syncStatus: 'synced' | 'pending' | 'error';
  localId?: string;
}
```

### Auth Types

```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

---

## 🔄 Synchronisation Offline

### Stratégie générale

**Priorités** :
1. **Lecture** : Toujours disponible offline (cache)
2. **Écriture** : Queue avec retry automatique

### Timing de sync

```typescript
// Sync triggers
1. Au démarrage de l'app
2. Toutes les 30 minutes (si app active)
3. Lors de la reconnexion réseau
4. Manuel (pull-to-refresh)
5. Avant un logout
```

### Queue de synchronisation (Zustand)

```typescript
// src/features/sync/stores/syncStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@/lib/storage/mmkv';
import { apiClient } from '@/api/client';

interface PendingComment {
  localId: string;
  recipeId: string;
  content: string;
  createdAt: string;
  retryCount: number;
}

interface PendingRating {
  localId: string;
  recipeId: string;
  score: number;
  createdAt: string;
  retryCount: number;
}

interface SyncStore {
  pendingComments: PendingComment[];
  pendingRatings: PendingRating[];
  isSyncing: boolean;
  lastSyncAt: string | null;
  
  addComment: (comment: Omit<PendingComment, 'retryCount'>) => void;
  addRating: (rating: Omit<PendingRating, 'retryCount'>) => void;
  removeComment: (localId: string) => void;
  removeRating: (localId: string) => void;
  syncAll: () => Promise<SyncResult>;
  clearAll: () => void;
}

interface SyncResult {
  comments: {
    created: Array<{ localId: string; serverId: string }>;
    failed: Array<{ localId: string; error: string }>;
  };
  ratings: {
    created: Array<{ localId: string; serverId: string }>;
    updated: Array<{ localId: string; serverId: string }>;
    failed: Array<{ localId: string; error: string }>;
  };
}

const MAX_RETRIES = 3;

export const useSyncStore = create<SyncStore>()(
  persist(
    (set, get) => ({
      pendingComments: [],
      pendingRatings: [],
      isSyncing: false,
      lastSyncAt: null,

      addComment: (comment) =>
        set((state) => ({
          pendingComments: [...state.pendingComments, { ...comment, retryCount: 0 }],
        })),

      addRating: (rating) =>
        set((state) => ({
          pendingRatings: [...state.pendingRatings, { ...rating, retryCount: 0 }],
        })),

      removeComment: (localId) =>
        set((state) => ({
          pendingComments: state.pendingComments.filter((c) => c.localId !== localId),
        })),

      removeRating: (localId) =>
        set((state) => ({
          pendingRatings: state.pendingRatings.filter((r) => r.localId !== localId),
        })),

      syncAll: async () => {
        const { pendingComments, pendingRatings, isSyncing } = get();

        if (isSyncing || (pendingComments.length === 0 && pendingRatings.length === 0)) {
          return { comments: { created: [], failed: [] }, ratings: { created: [], updated: [], failed: [] } };
        }

        set({ isSyncing: true });

        try {
          const response = await apiClient.post<SyncResult>('/api/sync/batch', {
            comments: pendingComments.map(({ localId, recipeId, content, createdAt }) => ({
              localId,
              recipeId,
              content,
              createdAt,
            })),
            ratings: pendingRatings.map(({ localId, recipeId, score, createdAt }) => ({
              localId,
              recipeId,
              score,
              createdAt,
            })),
          });

          const result = response.data;

          // Supprimer les items synchronisés avec succès
          const successfulCommentIds = result.comments.created.map((c) => c.localId);
          const successfulRatingIds = [
            ...result.ratings.created.map((r) => r.localId),
            ...result.ratings.updated.map((r) => r.localId),
          ];

          // Incrémenter les retryCount pour les échecs
          const failedCommentIds = result.comments.failed.map((c) => c.localId);
          const failedRatingIds = result.ratings.failed.map((r) => r.localId);

          set((state) => ({
            pendingComments: state.pendingComments
              .filter((c) => !successfulCommentIds.includes(c.localId))
              .map((c) =>
                failedCommentIds.includes(c.localId)
                  ? { ...c, retryCount: c.retryCount + 1 }
                  : c
              )
              .filter((c) => c.retryCount < MAX_RETRIES),
            pendingRatings: state.pendingRatings
              .filter((r) => !successfulRatingIds.includes(r.localId))
              .map((r) =>
                failedRatingIds.includes(r.localId)
                  ? { ...r, retryCount: r.retryCount + 1 }
                  : r
              )
              .filter((r) => r.retryCount < MAX_RETRIES),
            lastSyncAt: new Date().toISOString(),
          }));

          return result;
        } catch (error) {
          console.error('Sync failed:', error);
          throw error;
        } finally {
          set({ isSyncing: false });
        }
      },

      clearAll: () => set({ pendingComments: [], pendingRatings: [] }),
    }),
    {
      name: 'sync-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
```

### Cache Strategy (TanStack Query)

```typescript
// src/lib/query/queryClient.ts
import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { MMKV } from 'react-native-mmkv';

const queryStorage = new MMKV({ id: 'query-cache' });

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30min
      gcTime: 1000 * 60 * 60 * 24, // 24h (anciennement cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

// Persistance MMKV
export const queryPersister = createSyncStoragePersister({
  storage: {
    getItem: (key) => queryStorage.getString(key) ?? null,
    setItem: (key, value) => queryStorage.set(key, value),
    removeItem: (key) => queryStorage.delete(key),
  },
});
```

### Détection réseau

```typescript
// src/hooks/useNetworkStatus.ts
import { useState, useEffect, useCallback } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { apiClient } from '@/api/client';

interface NetworkStatus {
  isOnline: boolean;
  isSlowConnection: boolean;
  connectionType: string | null;
}

export const useNetworkStatus = () => {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: true,
    isSlowConnection: false,
    connectionType: null,
  });

  const checkApiReachable = useCallback(async (): Promise<boolean> => {
    try {
      await apiClient.get('/health', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state: NetInfoState) => {
      const isConnected = state.isConnected ?? false;
      
      // Vérifier si l'API est accessible
      const isApiReachable = isConnected ? await checkApiReachable() : false;

      setStatus({
        isOnline: isApiReachable,
        isSlowConnection: state.details?.isConnectionExpensive ?? false,
        connectionType: state.type,
      });
    });

    return () => unsubscribe();
  }, [checkApiReachable]);

  return status;
};
```

---

## 🎨 UI/UX Patterns

### Composants principaux

#### RecipeCard
```typescript
// Liste des recettes
- Image (lazy loading depuis URLs MinIO)
- Titre
- Difficulté (badge couleur)
- Temps total
- Rating moyen
- Badge "Offline available" si en cache
```

#### RecipeDetail
```typescript
// Détail d'une recette
- Carousel images (URLs MinIO)
- Informations (temps, portions, difficulté)
- Liste ingrédients (checkable)
- Étapes numérotées
- Section commentaires
- Formulaire rating
- Bouton "Commencer la réalisation"
```

#### RecipeRealization (Mode Cuisson)
```typescript
// Mode pas-à-pas
- Étape courante en grand
- Timer si durée définie
- Navigation Previous/Next
- Progression visuelle
- Mode "Keep screen awake"
- Bouton "Terminer" → Prompt rating
```

### Thèmes

```typescript
// Light & Dark mode
- Auto (système)
- Manuel
- Persisté dans MMKV
- Transition smooth
```

### Feedback utilisateur

```typescript
// États de loading
- Skeleton screens (pas de spinners)
- Pull-to-refresh natif
- Infinite scroll (pagination)

// Offline indicators
- Badge "Mode Offline" dans header
- Toast "Commentaire sera envoyé à la reconnexion"
- Icônes "synced/pending/error" sur items
```

---

## 🔌 API Integration

### Endpoints REST

```typescript
// Base URL depuis env
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Auth
POST   /api/auth/register          // Body: { email, password, displayName }
POST   /api/auth/login             // Body: { email, password }
POST   /api/auth/refresh           // Body: { refreshToken }
POST   /api/auth/logout            // Requires auth
GET    /api/auth/me                // Requires auth

// Recettes
GET    /api/recipes                // Liste avec pagination
GET    /api/recipes/:id            // Détail

// Commentaires
GET    /api/recipes/:id/comments   // Commentaires d'une recette
POST   /api/comments               // Body: { recipeId, content }
DELETE /api/comments/:id

// Ratings
POST   /api/ratings                // Body: { recipeId, score } - Create or Update
GET    /api/ratings/recipe/:id/me  // Ma note sur une recette

// Favoris
GET    /api/favorites              // Mes favoris
POST   /api/favorites/:recipeId    // Ajouter aux favoris
DELETE /api/favorites/:recipeId    // Retirer des favoris

// User
GET    /api/users/me
PUT    /api/users/me               // Body: { displayName? }

// Sync
POST   /api/sync/batch             // Envoi batch commentaires/ratings
```

### Services API

```typescript
// src/api/services/authService.ts
import { apiClient } from '../client';
import { AuthResponse, User } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  register: async (
    email: string,
    password: string,
    displayName: string
  ): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', {
      email,
      password,
      displayName,
    });
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/refresh', {
      refreshToken,
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/api/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/api/auth/me');
    return response.data;
  },
};
```

```typescript
// src/api/services/recipeService.ts
import { apiClient } from '../client';
import { Recipe, RecipeDetail, PagedResult } from '../types';

interface GetRecipesParams {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  sortBy?: 'averageRating' | 'createdAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export const recipeService = {
  getRecipes: async (params: GetRecipesParams = {}): Promise<PagedResult<Recipe>> => {
    const response = await apiClient.get<PagedResult<Recipe>>('/api/recipes', {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        search: params.search,
        tags: params.tags?.join(','),
        difficulty: params.difficulty,
        sortBy: params.sortBy ?? 'averageRating',
        sortOrder: params.sortOrder ?? 'desc',
      },
    });
    return response.data;
  },

  getRecipeById: async (id: string): Promise<RecipeDetail> => {
    const response = await apiClient.get<RecipeDetail>(`/api/recipes/${id}`);
    return response.data;
  },
};
```

---

## 🧪 Testing Strategy

### Types de tests

```typescript
// Unit tests
- Hooks (useRecipes, useSync, useAuth)
- Stores Zustand
- Utils functions
- Validation Zod schemas

// Integration tests
- Sync flow
- Auth flow (login, refresh, logout)
- Offline queue

// E2E tests (Detox ou Maestro)
- Parcours utilisateur complet
- Test offline/online transition
```

### Outils

```
- Jest
- React Native Testing Library
- MSW (Mock Service Worker) pour API
- Detox ou Maestro (E2E)
```

---

## 🚀 Performance Optimizations

### Images

```typescript
// expo-image (recommandé) ou react-native-fast-image
- Cache disque automatique
- Lazy loading
- Placeholder blur
- URLs MinIO directes (CDN-like)
```

### Lists

```typescript
// FlashList au lieu de FlatList
- Meilleure perf
- Moins de re-renders
- windowSize optimisé
```

### Memoization

```typescript
// React.memo pour composants
// useMemo pour calculs
// useCallback pour fonctions
// Éviter re-renders inutiles
```

### Bundle size

```typescript
// Hermes engine (activé par défaut Expo)
// Tree-shaking
// Lazy loading des features
// Code splitting si navigation par expo-router
```

---

## 🔒 Sécurité

### Bonnes pratiques

```typescript
// Tokens
- Stockage MMKV (encrypted sur iOS via Keychain, sur Android via Keystore)
- Access token : 15 minutes (court)
- Refresh token : 7 jours
- Rotation automatique du refresh token
- Clear complet au logout

// Secrets
- Toutes les clés dans .env
- Jamais commit de secrets
- EAS Secrets pour builds

// API
- Rate limiting backend
- Validation Zod côté client
- Sanitization côté serveur
```

---

## 📦 Configuration Environnements

### Variables d'environnement

```bash
# .env.development
EXPO_PUBLIC_API_URL=http://192.168.1.x:5000

# .env.production
EXPO_PUBLIC_API_URL=https://api.recettes-zazou.fr
```

### app.json / app.config.js

```javascript
export default {
  expo: {
    name: "Les Recettes de Zazou",
    slug: "recettes-zazou",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/[your-id]"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.recetteszazou.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.recetteszazou.app"
    },
    plugins: [
      "expo-router",
      "expo-localization",
      [
        "expo-build-properties",
        {
          android: {
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true
          }
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "your-project-id"
      }
    }
  }
}
```

---

## 🛠️ Setup & Installation

### Prérequis

```bash
Node.js >= 18
npm ou yarn ou pnpm
Expo CLI
EAS CLI (pour builds)
```

### Installation

```bash
# Créer le projet
npx create-expo-app@latest recettes-zazou --template blank-typescript

# Installer les dépendances
npm install @tanstack/react-query
npm install @tanstack/query-sync-storage-persister
npm install zustand
npm install react-native-mmkv
npm install axios
npm install react-hook-form
npm install zod
npm install @hookform/resolvers
npm install nativewind
npm install react-native-reusables
npm install react-i18next i18next
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install expo-image
npm install @shopify/flash-list
npm install @react-native-community/netinfo

# Dev dependencies
npm install -D tailwindcss
npm install -D @tanstack/eslint-plugin-query
npm install -D jest @testing-library/react-native
```

### Configuration

```bash
# NativeWind
npx tailwindcss init

# Configure tailwind.config.js
# Configure babel.config.js pour NativeWind

# EAS
eas init
eas build:configure
```

---

## 📱 Build & Deployment

### Development

```bash
# Start dev server
npx expo start

# iOS simulator
npx expo start --ios

# Android emulator
npx expo start --android
```

### Production Builds

```bash
# EAS Build
eas build --platform ios --profile production
eas build --platform android --profile production

# OTA Updates
eas update --branch production --message "Fix bug X"
```

### eas.json

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_ENV": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_ENV": "staging"
      }
    },
    "production": {
      "env": {
        "EXPO_PUBLIC_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## 🐛 Debug & Monitoring

### Outils

```typescript
// Reactotron (dev)
- État Zustand
- Requêtes API
- MMKV storage

// Flipper (dev)
- Network inspector
- Layout inspector
- React DevTools

// Sentry (prod)
- Error tracking
- Performance monitoring
- Release tracking
```

### Logs

```typescript
// Custom logger
import { logger } from '@/lib/utils/logger';

logger.info('User logged in', { userId });
logger.error('Sync failed', { error, context });
logger.debug('Cache hit', { key });

// En production : envoyer à Sentry
// En dev : console.log coloré
```

---

## 📈 Metrics & Analytics

### Événements à tracker

```typescript
// User events
- app_opened
- recipe_viewed
- recipe_started (mode réalisation)
- recipe_completed
- comment_posted
- rating_given
- search_performed

// Technical events
- sync_started
- sync_completed
- sync_failed
- offline_mode_entered
- cache_hit / cache_miss
- token_refreshed
```

### Outils recommandés

```
- Expo Analytics (basique)
- Mixpanel ou Amplitude (avancé)
- Custom events vers votre backend
```

---

## 📮 Évolutions Futures

### Phase 2 (optionnel)

```typescript
// Fonctionnalités
- Favoris
- Listes de courses générées
- Partage de recettes
- Mode sombre auto selon heure
- Widget iOS/Android (prochaine recette)

// Technique
- Notifications push (expo-notifications)
- Deep linking
- Universal links
- Background sync
```

---

## 📚 Documentation & Resources

### Documentation interne

```
/docs
├── API.md              # Documentation endpoints
├── ARCHITECTURE.md     # Décisions architecture
├── OFFLINE.md          # Stratégie offline détaillée
├── CONTRIBUTING.md     # Guidelines dev
└── DEPLOYMENT.md       # Process déploiement
```

### Ressources externes

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [NativeWind](https://www.nativewind.dev/)
- [Axios](https://axios-http.com/)

---

## ✅ Checklist de démarrage

### Avant de coder

- [ ] Créer projet Expo
- [ ] Installer toutes les dépendances
- [ ] Configurer NativeWind + Tailwind
- [ ] Configurer Axios client avec interceptors
- [ ] Configurer TanStack Query + persister MMKV
- [ ] Créer les contextes (Auth, Theme, I18n)
- [ ] Setup navigation
- [ ] Créer structure de dossiers

### Backend requirements

- [ ] API .NET déployée et accessible
- [ ] Endpoints REST documentés
- [ ] Variables d'environnement partagées
- [ ] CORS configuré pour mobile
- [ ] MinIO accessible (URLs publiques)

### Premier sprint

- [ ] Écran login/register
- [ ] Liste des recettes (avec cache)
- [ ] Détail d'une recette
- [ ] Mode offline basique
- [ ] Tests de connexion API
- [ ] Tests du refresh token

---

## 🎯 Conclusion

Cette stack est **optimale** pour ton cas d'usage :
- ✅ Simple à maintenir (solo dev)
- ✅ Performance native (Expo + optimisations)
- ✅ Offline-first léger mais efficace
- ✅ Scalable si besoin futur
- ✅ Stack 100% contrôlée (plus de dépendance Supabase)
- ✅ Auth robuste avec refresh token automatique

**Changements majeurs vs v1** :
- ❌ Suppression complète de Supabase SDK
- ✅ Auth via API .NET (ASP.NET Identity + JWT)
- ✅ Images en lecture seule (URLs MinIO)
- ✅ Interceptors Axios pour refresh automatique

**Prochaines étapes** :
1. Setup du projet de base
2. Configuration Axios + interceptors
3. Premier écran fonctionnel (login)
4. Tests offline/online

**Temps estimé MVP** : 3-4 semaines (solo, à temps partiel)

---

**Version** : 2.0 (Migration .NET)  
**Date** : 2025-01-XX  
**Auteur** : Specs techniques React Native - App Recettes