# Tickets de Développement - Application Mobile

## 📋 Vue d'ensemble

**Projet** : Les Recettes de Zazou - Application Mobile  
**Durée estimée MVP** : 3-4 semaines  
**Organisation** : Tickets groupés par phase avec parallélisation

---

## 🗺️ Vue des dépendances

```
PHASE 1 - FONDATIONS (Semaine 1)
═══════════════════════════════════════════════════════════════════════════

     ┌─────────────┐
     │   SETUP     │
     │   PROJET    │
     │   (M-001)   │
     └──────┬──────┘
            │
            ▼
     ┌─────────────┐
     │   CONFIG    │
     │   CORE      │
     │   (M-002)   │
     └──────┬──────┘
            │
    ┌───────┴───────┐
    │               │
    ▼               ▼
┌─────────┐   ┌─────────┐
│  i18n   │   │   UI    │      ← Parallélisables
│ (M-003) │   │ (M-004) │
└────┬────┘   └────┬────┘
     │             │
     └──────┬──────┘
            │
            ▼
     ┌─────────────┐
     │ NAVIGATION  │
     │   (M-005)   │
     └─────────────┘


PHASE 2 - AUTH & DONNÉES (Semaine 1-2)
═══════════════════════════════════════════════════════════════════════════

         ┌─────────────┐
         │  API CLIENT │
         │   (M-006)   │
         └──────┬──────┘
                │
        ┌───────┴───────┐
        │               │
        ▼               ▼
   ┌─────────┐    ┌─────────┐
   │  AUTH   │    │ OFFLINE │     ← Parallélisables
   │ CONTEXT │    │  SETUP  │
   │ (M-007) │    │ (M-008) │
   └────┬────┘    └────┬────┘
        │              │
        ▼              │
   ┌─────────┐         │
   │  LOGIN  │         │
   │ (M-009) │         │
   └────┬────┘         │
        │              │
        ▼              │
   ┌─────────┐         │
   │REGISTER │         │
   │ (M-010) │         │
   └────┬────┘         │
        │              │
        └──────┬───────┘
               │
               ▼


PHASE 3 - FEATURES RECETTES (Semaine 2-3)
═══════════════════════════════════════════════════════════════════════════

        ┌───────────────────────────────────────┐
        │                                       │
        ▼                                       │
   ┌─────────┐                                  │
   │ RECIPES │                                  │
   │  HOOKS  │                                  │
   │ (M-011) │                                  │
   └────┬────┘                                  │
        │                                       │
   ┌────┴────────────────┐                      │
   │                     │                      │
   ▼                     ▼                      │
┌─────────┐        ┌─────────┐                  │
│HOMEPAGE │        │ RECIPE  │    ← Parallél.  │
│ (M-012) │        │ DETAIL  │                  │
└────┬────┘        │ (M-013) │                  │
     │             └────┬────┘                  │
     │                  │                       │
     │             ┌────┴────┐                  │
     │             │         │                  │
     │             ▼         ▼                  │
     │       ┌─────────┐ ┌─────────┐           │
     │       │COMMENTS │ │FAVORITES│ ← Parall. │
     │       │ (M-014) │ │ (M-015) │           │
     │       └─────────┘ └────┬────┘           │
     │                        │                │
     └────────────────────────┘                │
                                               │

PHASE 4 - MODE RÉALISATION (Semaine 3)
═══════════════════════════════════════════════════════════════════════════

   ┌─────────────┐
   │   COOKING   │
   │    MODE     │
   │   (M-016)   │
   └──────┬──────┘
          │
   ┌──────┴──────┐
   │             │
   ▼             ▼
┌─────────┐ ┌─────────┐
│  TIMER  │ │COMPLETE │     ← Parallélisables
│ (M-017) │ │ SCREEN  │
└─────────┘ │ (M-018) │
            └─────────┘


PHASE 5 - FINALISATION (Semaine 3-4)
═══════════════════════════════════════════════════════════════════════════

   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │SETTINGS │  │  SYNC   │  │ONBOARD. │    ← Tous parallélisables
   │ (M-019) │  │ (M-020) │  │ (M-021) │
   └─────────┘  └─────────┘  └─────────┘
        │            │            │
        └────────────┼────────────┘
                     │
                     ▼
              ┌─────────────┐
              │   POLISH    │
              │   (M-022)   │
              └─────────────┘
```

---

## 📊 Résumé par phase

| Phase | Tickets | Durée | Parallélisation possible |
|-------|---------|-------|--------------------------|
| 1 - Fondations | M-001 → M-005 | 2-3 jours | M-003 // M-004 |
| 2 - Auth & Données | M-006 → M-010 | 3-4 jours | M-007 // M-008 |
| 3 - Features Recettes | M-011 → M-015 | 4-5 jours | M-012 // M-013, M-014 // M-015 |
| 4 - Mode Réalisation | M-016 → M-018 | 2-3 jours | M-017 // M-018 |
| 5 - Finalisation | M-019 → M-022 | 3-4 jours | M-019 // M-020 // M-021 |

---

# 📁 PHASE 1 - FONDATIONS

---

## M-001 : Setup Projet Expo

### Description
Initialiser le projet Expo avec TypeScript et configurer l'environnement de développement.

### Critères d'acceptation
- [ ] Projet créé avec `create-expo-app` (TypeScript template)
- [ ] Structure de dossiers `/src` mise en place selon l'architecture
- [ ] Configuration TypeScript strict mode
- [ ] ESLint + Prettier configurés
- [ ] `.env` et `.env.example` créés avec les variables
- [ ] `app.json` / `app.config.js` configuré (nom, icônes placeholder, etc.)
- [ ] Le projet démarre sans erreur sur iOS et Android

### Structure à créer
```
/src
├── /api
├── /features
│   ├── /auth
│   ├── /recipes
│   ├── /comments
│   ├── /ratings
│   └── /favorites
├── /components
│   ├── /ui
│   ├── /layout
│   └── /common
├── /contexts
├── /hooks
├── /lib
│   ├── /i18n
│   ├── /storage
│   ├── /query
│   └── /utils
├── /navigation
├── /constants
└── /types
```

### Variables d'environnement
```bash
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_ENV=development
```

### Dépendances
Aucune

### Estimation
**2-3 heures**

### Labels
`setup` `priority:critical` `phase:1`

---

## M-002 : Configuration Core (Storage, Query, Zustand)

### Description
Configurer les librairies core : MMKV, TanStack Query avec persistance, et Zustand.

### Critères d'acceptation
- [ ] MMKV installé et configuré
- [ ] TanStack Query configuré avec client global
- [ ] Persister MMKV pour TanStack Query fonctionnel
- [ ] Store Zustand de base créé (pour la queue offline)
- [ ] Tests manuels : données persistées après restart app

### Packages à installer
```bash
npm install @tanstack/react-query react-native-mmkv zustand
npm install @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

### Fichiers à créer
```
/src/lib/storage/mmkv.ts
/src/lib/query/queryClient.ts
/src/lib/query/persister.ts
/src/features/sync/stores/syncStore.ts
```

### Code clé - queryClient.ts
```typescript
import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { mmkvStorage } from '../storage/mmkv';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 heures
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export const persister = createSyncStoragePersister({
  storage: {
    getItem: (key) => mmkvStorage.getString(key) ?? null,
    setItem: (key, value) => mmkvStorage.set(key, value),
    removeItem: (key) => mmkvStorage.delete(key),
  },
});
```

### Dépendances
- M-001 (Setup projet)

### Estimation
**2-3 heures**

### Labels
`core` `storage` `priority:critical` `phase:1`

---

## M-003 : Configuration i18n (react-i18next)

### Description
Mettre en place l'internationalisation avec react-i18next pour supporter FR et EN.

### Critères d'acceptation
- [ ] react-i18next installé et configuré
- [ ] Fichiers de traduction `fr.json` et `en.json` créés (structure de base)
- [ ] Détection automatique de la langue système
- [ ] Persistance du choix de langue dans MMKV
- [ ] Hook `useTranslation` fonctionnel
- [ ] Changement de langue dynamique testé

### Packages à installer
```bash
npm install react-i18next i18next expo-localization
```

### Fichiers à créer
```
/src/lib/i18n/index.ts
/src/lib/i18n/fr.json
/src/lib/i18n/en.json
```

### Structure traductions (base)
```json
{
  "common": {
    "loading": "Chargement...",
    "error": "Une erreur est survenue",
    "retry": "Réessayer",
    "cancel": "Annuler",
    "save": "Enregistrer",
    "delete": "Supprimer",
    "confirm": "Confirmer"
  },
  "auth": {},
  "recipes": {},
  "cooking": {},
  "settings": {},
  "offline": {}
}
```

### Dépendances
- M-002 (MMKV pour persistance)

### Peut être parallélisé avec
- M-004 (Composants UI)

### Estimation
**2-3 heures**

### Labels
`i18n` `priority:high` `phase:1`

---

## M-004 : Composants UI de base

### Description
Créer les composants UI réutilisables avec NativeWind.

### Critères d'acceptation
- [ ] NativeWind v4 installé et configuré
- [ ] Thème (couleurs, fonts) défini dans `tailwind.config.js`
- [ ] Composants créés et fonctionnels :
  - [ ] Button (variants: primary, secondary, outline, ghost)
  - [ ] Input (text, email, password avec toggle)
  - [ ] Card
  - [ ] Badge
  - [ ] Toast (via context ou lib)
  - [ ] Skeleton
  - [ ] Modal
  - [ ] Avatar
- [ ] Support dark mode préparé

### Packages à installer
```bash
npm install nativewind tailwindcss
npm install react-native-reusables
npm install react-native-toast-message
```

### Fichiers à créer
```
/src/components/ui/Button.tsx
/src/components/ui/Input.tsx
/src/components/ui/Card.tsx
/src/components/ui/Badge.tsx
/src/components/ui/Skeleton.tsx
/src/components/ui/Modal.tsx
/src/components/ui/Avatar.tsx
/src/constants/theme.ts
```

### Dépendances
- M-001 (Setup projet)

### Peut être parallélisé avec
- M-003 (i18n)

### Estimation
**4-5 heures**

### Labels
`ui` `components` `priority:high` `phase:1`

---

## M-005 : Navigation (React Navigation)

### Description
Configurer la navigation de l'application avec React Navigation.

### Critères d'acceptation
- [ ] React Navigation installé avec toutes les dépendances
- [ ] Types de navigation définis
- [ ] Structure de navigation implémentée :
  - [ ] RootNavigator (switch Auth/Main)
  - [ ] AuthStack (Login, Register)
  - [ ] MainTabs (Home, Profile)
  - [ ] HomeStack (RecipesList, RecipeDetail, RecipeRealization)
- [ ] Écrans placeholder créés
- [ ] Navigation fonctionnelle testée

### Packages à installer
```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
```

### Fichiers à créer
```
/src/navigation/types.ts
/src/navigation/RootNavigator.tsx
/src/navigation/AuthStack.tsx
/src/navigation/MainTabs.tsx
/src/navigation/HomeStack.tsx
```

### Types de navigation
```typescript
// types.ts
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  RecipesList: undefined;
  RecipeDetail: { recipeId: string };
  RecipeRealization: { recipeId: string };
};
```

### Dépendances
- M-003 (i18n pour les titres)
- M-004 (Composants UI)

### Estimation
**3-4 heures**

### Labels
`navigation` `priority:critical` `phase:1`

---

# 📁 PHASE 2 - AUTH & DONNÉES

---

## M-006 : Client API (Axios)

### Description
Configurer Axios avec intercepteurs pour l'authentification et la gestion des erreurs.

### Critères d'acceptation
- [ ] Axios installé et instance configurée
- [ ] Intercepteur request : ajout automatique du token Bearer
- [ ] Intercepteur response : gestion des erreurs (401, 500, network)
- [ ] Logique de refresh token automatique
- [ ] Queue de requêtes pendant le refresh
- [ ] Types pour les réponses API
- [ ] Endpoints constants définis

### Packages à installer
```bash
npm install axios
```

### Fichiers à créer
```
/src/api/client.ts
/src/api/endpoints.ts
/src/api/types.ts
```

### Code clé - client.ts (structure)
```typescript
import axios from 'axios';
import { mmkvStorage } from '@/lib/storage/mmkv';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - Add token
apiClient.interceptors.request.use(async (config) => {
  const token = mmkvStorage.getString('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle 401, refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Refresh logic here
  }
);

export default apiClient;
```

### Dépendances
- M-002 (MMKV pour tokens)

### Estimation
**3-4 heures**

### Labels
`api` `auth` `priority:critical` `phase:2`

---

## M-007 : Auth Context & Hooks

### Description
Créer le contexte d'authentification et les hooks associés.

### Critères d'acceptation
- [ ] AuthContext créé avec état user/session
- [ ] Hook `useAuth` exposant : user, isAuthenticated, isLoading
- [ ] Fonctions : signIn, signUp, signOut, refreshSession
- [ ] Chargement initial de la session depuis MMKV
- [ ] Mise à jour automatique du state après login/logout
- [ ] Types TypeScript complets

### Fichiers à créer
```
/src/contexts/AuthContext.tsx
/src/features/auth/hooks/useAuth.ts
/src/features/auth/types/index.ts
```

### Interface AuthContext
```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
}
```

### Dépendances
- M-006 (Client API)

### Peut être parallélisé avec
- M-008 (Offline setup)

### Estimation
**3-4 heures**

### Labels
`auth` `context` `priority:critical` `phase:2`

---

## M-008 : Configuration Offline (NetInfo, Sync Store)

### Description
Mettre en place la détection réseau et le store de synchronisation offline.

### Critères d'acceptation
- [ ] NetInfo installé et hook `useNetworkStatus` créé
- [ ] Store Zustand `useSyncStore` complet :
  - [ ] Queue des commentaires en attente
  - [ ] Queue des ratings en attente
  - [ ] Queue des favoris en attente
  - [ ] Actions : addToQueue, removeFromQueue, clearQueue
- [ ] Persistance de la queue dans MMKV
- [ ] Hook `useOfflineIndicator` pour l'UI

### Packages à installer
```bash
npm install @react-native-community/netinfo
```

### Fichiers à créer
```
/src/hooks/useNetworkStatus.ts
/src/features/sync/stores/syncStore.ts
/src/features/sync/types/index.ts
```

### Interface SyncStore
```typescript
interface SyncStore {
  pendingComments: PendingComment[];
  pendingRatings: PendingRating[];
  pendingFavorites: PendingFavorite[];
  
  addComment: (comment: PendingComment) => void;
  addRating: (rating: PendingRating) => void;
  addFavorite: (favorite: PendingFavorite) => void;
  
  removeComment: (localId: string) => void;
  removeRating: (localId: string) => void;
  removeFavorite: (recipeId: string) => void;
  
  clearAll: () => void;
  getPendingCount: () => number;
}
```

### Dépendances
- M-002 (Zustand, MMKV)

### Peut être parallélisé avec
- M-007 (Auth Context)

### Estimation
**2-3 heures**

### Labels
`offline` `sync` `priority:high` `phase:2`

---

## M-009 : Écran Login

### Description
Implémenter l'écran de connexion complet.

### Critères d'acceptation
- [ ] UI conforme aux specs (formulaire centré, logo)
- [ ] Formulaire avec React Hook Form + Zod
- [ ] Validation en temps réel (onBlur)
- [ ] Toggle visibilité mot de passe
- [ ] États : default, loading, error
- [ ] Messages d'erreur traduits (i18n)
- [ ] Navigation vers Register
- [ ] Intégration avec AuthContext.signIn
- [ ] Gestion erreurs API (credentials, network)
- [ ] Toast de feedback

### Packages à installer
```bash
npm install react-hook-form zod @hookform/resolvers
```

### Fichiers à créer
```
/src/features/auth/screens/LoginScreen.tsx
/src/features/auth/components/LoginForm.tsx
/src/features/auth/schemas/loginSchema.ts
```

### Traductions à ajouter
```json
{
  "auth": {
    "login": "Connexion",
    "email": "Email",
    "password": "Mot de passe",
    "loginButton": "Se connecter",
    "noAccount": "Pas de compte ?",
    "signUpLink": "S'inscrire",
    "errors": {
      "invalidEmail": "Format d'email invalide",
      "passwordTooShort": "Le mot de passe doit contenir au moins 6 caractères",
      "invalidCredentials": "Email ou mot de passe incorrect",
      "networkError": "Impossible de se connecter. Vérifiez votre connexion."
    }
  }
}
```

### Dépendances
- M-004 (Composants UI)
- M-005 (Navigation)
- M-007 (Auth Context)
- M-003 (i18n)

### Estimation
**3-4 heures**

### Labels
`auth` `screen` `priority:critical` `phase:2`

---

## M-010 : Écran Register

### Description
Implémenter l'écran d'inscription complet.

### Critères d'acceptation
- [ ] UI conforme aux specs
- [ ] Formulaire : displayName, email, password, confirmPassword
- [ ] Validation Zod complète
- [ ] Vérification correspondance mots de passe
- [ ] États : default, loading, error
- [ ] Messages d'erreur traduits
- [ ] Navigation vers Login
- [ ] Intégration avec AuthContext.signUp
- [ ] Gestion erreur "email déjà utilisé"
- [ ] Toast succès + redirection Home

### Fichiers à créer
```
/src/features/auth/screens/RegisterScreen.tsx
/src/features/auth/components/RegisterForm.tsx
/src/features/auth/schemas/registerSchema.ts
```

### Traductions à ajouter
```json
{
  "auth": {
    "register": "Inscription",
    "displayName": "Nom d'affichage",
    "confirmPassword": "Confirmer le mot de passe",
    "registerButton": "S'inscrire",
    "hasAccount": "Déjà un compte ?",
    "loginLink": "Se connecter",
    "errors": {
      "nameTooShort": "Le nom doit contenir au moins 3 caractères",
      "nameTooLong": "Le nom ne peut pas dépasser 50 caractères",
      "passwordMismatch": "Les mots de passe ne correspondent pas",
      "emailInUse": "Cet email est déjà utilisé"
    },
    "success": {
      "accountCreated": "Compte créé avec succès"
    }
  }
}
```

### Dépendances
- M-009 (Réutilisation patterns Login)

### Estimation
**2-3 heures**

### Labels
`auth` `screen` `priority:critical` `phase:2`

---

# 📁 PHASE 3 - FEATURES RECETTES

---

## M-011 : Hooks & Services Recettes

### Description
Créer les hooks TanStack Query pour les recettes.

### Critères d'acceptation
- [ ] Service `recipeService.ts` avec toutes les fonctions API
- [ ] Hook `useRecipes` (liste paginée avec filtres)
- [ ] Hook `useRecipeDetail` (détail par ID)
- [ ] Hook `useRecipeComments` (commentaires d'une recette)
- [ ] Gestion du cache et invalidation
- [ ] Types TypeScript complets
- [ ] Support infinite query pour pagination

### Fichiers à créer
```
/src/features/recipes/services/recipeService.ts
/src/features/recipes/hooks/useRecipes.ts
/src/features/recipes/hooks/useRecipeDetail.ts
/src/features/recipes/hooks/useRecipeComments.ts
/src/features/recipes/types/index.ts
```

### Interface useRecipes
```typescript
interface UseRecipesOptions {
  search?: string;
  tags?: string[];
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  sortBy?: 'averageRating' | 'createdAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// Returns
{
  data: Recipe[];
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
}
```

### Dépendances
- M-006 (Client API)
- M-002 (TanStack Query)

### Estimation
**3-4 heures**

### Labels
`recipes` `hooks` `api` `priority:critical` `phase:3`

---

## M-012 : Homepage (Liste Recettes)

### Description
Implémenter l'écran principal avec liste, recherche et filtres.

### Critères d'acceptation
- [ ] Header avec titre + badge offline
- [ ] Barre de recherche avec debounce 300ms
- [ ] Section filtres (tags) avec scroll horizontal
- [ ] Multi-sélection tags (logique ET)
- [ ] Badge "actif" sur tags sélectionnés
- [ ] Bouton "Effacer filtres" conditionnel
- [ ] RecipeCard component :
  - [ ] Image (FastImage ou expo-image)
  - [ ] Titre, temps total, difficulté, note
  - [ ] Badge Thermomix si tag présent
  - [ ] Badge offline si en cache
  - [ ] Bouton favori
- [ ] FlashList pour performance
- [ ] Infinite scroll
- [ ] Pull-to-refresh
- [ ] Skeleton loading (6 cards)
- [ ] État vide avec message traduit
- [ ] Navigation vers RecipeDetail au tap

### Packages à installer
```bash
npm install @shopify/flash-list expo-image
```

### Fichiers à créer
```
/src/features/recipes/screens/RecipesListScreen.tsx
/src/features/recipes/components/RecipeCard.tsx
/src/features/recipes/components/SearchBar.tsx
/src/features/recipes/components/TagFilters.tsx
/src/features/recipes/components/RecipeCardSkeleton.tsx
/src/features/recipes/components/EmptyState.tsx
```

### Traductions à ajouter
```json
{
  "recipes": {
    "title": "Recettes",
    "search": "Rechercher une recette...",
    "filters": "Filtres",
    "clearFilters": "Effacer les filtres",
    "noResults": "Aucune recette trouvée avec ces critères",
    "resetButton": "Réinitialiser",
    "difficulty": {
      "easy": "Facile",
      "medium": "Moyen",
      "hard": "Difficile"
    },
    "time": "{{minutes}} min"
  }
}
```

### Dépendances
- M-011 (Hooks recettes)
- M-004 (Composants UI)
- M-008 (Offline indicator)

### Peut être parallélisé avec
- M-013 (RecipeDetail)

### Estimation
**5-6 heures**

### Labels
`recipes` `screen` `priority:critical` `phase:3`

---

## M-013 : Fiche Recette (Detail)

### Description
Implémenter l'écran de détail d'une recette.

### Critères d'acceptation
- [ ] Header avec retour, titre, bouton favori
- [ ] Image principale (carousel si plusieurs)
- [ ] Section informations (prep, cuisson, note, difficulté)
- [ ] Dropdown ajustement portions (1-12)
- [ ] Recalcul automatique des quantités
- [ ] Section description
- [ ] Section ingrédients avec checkboxes
- [ ] Persistance état checkboxes (MMKV par recette)
- [ ] Section étapes numérotées
- [ ] Section commentaires (aperçu)
- [ ] Lien "Voir tous les commentaires"
- [ ] Message si non éligible aux commentaires
- [ ] Bouton flottant "Commencer la recette"
- [ ] Skeleton loading

### Fichiers à créer
```
/src/features/recipes/screens/RecipeDetailScreen.tsx
/src/features/recipes/components/RecipeHeader.tsx
/src/features/recipes/components/RecipeInfo.tsx
/src/features/recipes/components/PortionSelector.tsx
/src/features/recipes/components/IngredientsList.tsx
/src/features/recipes/components/StepsList.tsx
/src/features/recipes/components/CommentsPreview.tsx
/src/features/recipes/hooks/useIngredientChecks.ts
```

### Logique portions
```typescript
const calculateQuantity = (
  originalQty: number,
  originalServings: number,
  newServings: number
): number => {
  return (originalQty / originalServings) * newServings;
};
```

### Traductions à ajouter
```json
{
  "recipeDetail": {
    "prepTime": "Préparation",
    "cookTime": "Cuisson",
    "servings": "Portions",
    "persons": "pers.",
    "ingredients": "Ingrédients",
    "steps": "Étapes",
    "comments": "Avis",
    "reviews": "{{count}} avis",
    "seeAllComments": "Voir tous les commentaires",
    "startCooking": "Commencer la recette",
    "completeToReview": "Réalisez cette recette pour laisser un avis"
  }
}
```

### Dépendances
- M-011 (Hooks recettes)
- M-004 (Composants UI)

### Peut être parallélisé avec
- M-012 (Homepage)

### Estimation
**5-6 heures**

### Labels
`recipes` `screen` `priority:critical` `phase:3`

---

## M-014 : Système de Commentaires

### Description
Implémenter l'affichage et l'ajout de commentaires.

### Critères d'acceptation
- [ ] Hook `useComments` (liste par recette)
- [ ] Hook `useAddComment` (mutation)
- [ ] Composant `CommentCard` (avatar, nom, contenu, date)
- [ ] Écran liste complète des commentaires
- [ ] Formulaire ajout commentaire (si éligible)
- [ ] Vérification éligibilité (recette réalisée)
- [ ] Support offline : ajout à la queue
- [ ] Toast de confirmation
- [ ] Invalidation cache après ajout

### Fichiers à créer
```
/src/features/comments/hooks/useComments.ts
/src/features/comments/hooks/useAddComment.ts
/src/features/comments/components/CommentCard.tsx
/src/features/comments/components/CommentForm.tsx
/src/features/comments/screens/CommentsListScreen.tsx
/src/features/comments/services/commentService.ts
```

### Logique éligibilité
```typescript
// Stocké dans MMKV
const COMPLETED_RECIPES_KEY = 'completedRecipes';

const useCanComment = (recipeId: string): boolean => {
  const completedRecipes = mmkvStorage.getString(COMPLETED_RECIPES_KEY);
  const completed: string[] = completedRecipes ? JSON.parse(completedRecipes) : [];
  return completed.includes(recipeId);
};
```

### Dépendances
- M-011 (Pattern hooks)
- M-008 (Sync store pour offline)

### Peut être parallélisé avec
- M-015 (Favoris)

### Estimation
**3-4 heures**

### Labels
`comments` `priority:high` `phase:3`

---

## M-015 : Système de Favoris

### Description
Implémenter la gestion des favoris.

### Critères d'acceptation
- [ ] Hook `useFavorites` (liste mes favoris)
- [ ] Hook `useToggleFavorite` (mutation add/remove)
- [ ] État optimiste (UI update immédiat)
- [ ] Support offline : ajout à la queue
- [ ] Animation bounce sur le cœur
- [ ] Écran liste des favoris (via header Homepage)
- [ ] Même layout que Homepage (filtres, recherche)
- [ ] Invalidation cache après toggle

### Fichiers à créer
```
/src/features/favorites/hooks/useFavorites.ts
/src/features/favorites/hooks/useToggleFavorite.ts
/src/features/favorites/screens/FavoritesScreen.tsx
/src/features/favorites/services/favoriteService.ts
```

### Mutation optimiste
```typescript
const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ recipeId, isFavorite }) => 
      isFavorite 
        ? favoriteService.remove(recipeId)
        : favoriteService.add(recipeId),
    onMutate: async ({ recipeId, isFavorite }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      
      // Snapshot previous value
      const previous = queryClient.getQueryData(['favorites']);
      
      // Optimistically update
      queryClient.setQueryData(['favorites'], (old) => /* update */);
      
      return { previous };
    },
    onError: (err, variables, context) => {
      // Rollback
      queryClient.setQueryData(['favorites'], context.previous);
    },
  });
};
```

### Dépendances
- M-011 (Pattern hooks)
- M-012 (RecipeCard avec bouton favori)

### Peut être parallélisé avec
- M-014 (Commentaires)

### Estimation
**3-4 heures**

### Labels
`favorites` `priority:high` `phase:3`

---

# 📁 PHASE 4 - MODE RÉALISATION

---

## M-016 : Mode Réalisation (Base)

### Description
Implémenter l'écran de réalisation pas-à-pas.

### Critères d'acceptation
- [ ] Forcer orientation paysage à l'entrée
- [ ] Retour portrait à la sortie
- [ ] Keep screen awake activé
- [ ] Barre de progression (dots) avec auto-hide 3s
- [ ] Réapparition au tap
- [ ] Navigation par tap zones (gauche/droite)
- [ ] Flèches Previous/Next toujours visibles
- [ ] Affichage étape courante :
  - [ ] Image (si disponible)
  - [ ] Instruction
  - [ ] Liste ingrédients de l'étape
- [ ] Bouton quitter (X) avec modale confirmation
- [ ] Gestion interruption (background = sauvegarde)
- [ ] Prompt "Reprendre ?" au retour

### Packages à installer
```bash
npm install expo-screen-orientation expo-keep-awake
```

### Fichiers à créer
```
/src/features/cooking/screens/CookingModeScreen.tsx
/src/features/cooking/components/ProgressBar.tsx
/src/features/cooking/components/StepView.tsx
/src/features/cooking/components/NavigationZones.tsx
/src/features/cooking/components/QuitModal.tsx
/src/features/cooking/hooks/useCookingMode.ts
/src/features/cooking/stores/cookingStore.ts
```

### Traductions à ajouter
```json
{
  "cooking": {
    "step": "Étape {{current}}/{{total}}",
    "previous": "Précédent",
    "next": "Suivant",
    "quit": "Quitter",
    "quitConfirm": "Quitter la recette ?",
    "quitMessage": "Votre progression sera perdue.",
    "resume": "Reprendre la recette ?",
    "resumeMessage": "Vous aviez commencé cette recette.",
    "resumeButton": "Reprendre",
    "restartButton": "Recommencer"
  }
}
```

### Dépendances
- M-013 (RecipeDetail pour lancer le mode)

### Estimation
**5-6 heures**

### Labels
`cooking` `screen` `priority:critical` `phase:4`

---

## M-017 : Timer Mode Réalisation

### Description
Implémenter le timer pour les étapes avec durée.

### Critères d'acceptation
- [ ] Affichage timer si `step.duration` défini
- [ ] États : idle, running, paused, finished
- [ ] Tap pour démarrer/pause
- [ ] Countdown MM:SS
- [ ] Vibration + son à la fin
- [ ] "00:00" clignotant quand terminé
- [ ] Reset auto au changement d'étape
- [ ] Continuer en background (notification optionnel)

### Fichiers à créer
```
/src/features/cooking/components/StepTimer.tsx
/src/features/cooking/hooks/useTimer.ts
```

### Hook useTimer
```typescript
interface UseTimerReturn {
  timeLeft: number; // seconds
  isRunning: boolean;
  isFinished: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const useTimer = (durationMinutes: number): UseTimerReturn => {
  // Implementation
};
```

### Dépendances
- M-016 (Mode Réalisation base)

### Peut être parallélisé avec
- M-018 (Écran complétion)

### Estimation
**2-3 heures**

### Labels
`cooking` `timer` `priority:high` `phase:4`

---

## M-018 : Écran Complétion & Rating

### Description
Implémenter l'écran de fin de recette avec notation.

### Critères d'acceptation
- [ ] Passage automatique en portrait
- [ ] Animation 🎉 de célébration
- [ ] Message "Recette terminée !"
- [ ] Sélecteur étoiles (1-5) interactif
- [ ] Champ commentaire optionnel
- [ ] Bouton "Passer" (skip)
- [ ] Bouton "Envoyer mon avis"
- [ ] Marquer recette comme "réalisée" (MMKV)
- [ ] Si offline : ajout à queue + toast
- [ ] Navigation retour RecipeDetail
- [ ] Hook `useRateRecipe` (mutation)

### Fichiers à créer
```
/src/features/cooking/screens/CompletionScreen.tsx
/src/features/cooking/components/StarRating.tsx
/src/features/cooking/components/ReviewForm.tsx
/src/features/ratings/hooks/useRateRecipe.ts
/src/features/ratings/services/ratingService.ts
```

### Traductions à ajouter
```json
{
  "completion": {
    "title": "Recette terminée !",
    "subtitle": "Qu'avez-vous pensé de cette recette ?",
    "commentPlaceholder": "Laissez un commentaire (optionnel)...",
    "skip": "Passer",
    "submit": "Envoyer mon avis",
    "offlineMessage": "Votre avis sera envoyé dès la reconnexion"
  }
}
```

### Dépendances
- M-016 (Mode Réalisation)
- M-014 (Pattern commentaires)

### Peut être parallélisé avec
- M-017 (Timer)

### Estimation
**3-4 heures**

### Labels
`cooking` `rating` `priority:high` `phase:4`

---

# 📁 PHASE 5 - FINALISATION

---

## M-019 : Page Settings

### Description
Implémenter la page de paramètres.

### Critères d'acceptation
- [ ] Section Profil :
  - [ ] Affichage nom + email
  - [ ] Édition nom (modale)
  - [ ] Appel API `PUT /api/users/me`
- [ ] Section Préférences :
  - [ ] Sélecteur langue (FR/EN)
  - [ ] Sélecteur thème (Auto/Light/Dark)
  - [ ] Toggle "Keep screen awake"
- [ ] Section À propos :
  - [ ] Version app
  - [ ] Liens CGU, Privacy (WebView ou external)
- [ ] Bouton déconnexion avec confirmation
- [ ] Flow déconnexion complet (sync, clear, redirect)

### Fichiers à créer
```
/src/features/settings/screens/SettingsScreen.tsx
/src/features/settings/components/ProfileSection.tsx
/src/features/settings/components/PreferencesSection.tsx
/src/features/settings/components/AboutSection.tsx
/src/features/settings/components/EditNameModal.tsx
/src/features/settings/components/LanguageSelector.tsx
/src/features/settings/components/ThemeSelector.tsx
/src/features/users/hooks/useUpdateProfile.ts
```

### Traductions
```json
{
  "settings": {
    "title": "Paramètres",
    "profile": "Profil",
    "displayName": "Nom d'affichage",
    "email": "Email",
    "preferences": "Préférences",
    "language": "Langue",
    "theme": "Thème",
    "themeAuto": "Automatique",
    "themeLight": "Clair",
    "themeDark": "Sombre",
    "keepAwake": "Maintenir l'écran allumé",
    "keepAwakeDesc": "En mode recette",
    "about": "À propos",
    "version": "Version",
    "terms": "Conditions d'utilisation",
    "privacy": "Politique de confidentialité",
    "logout": "Se déconnecter",
    "logoutConfirm": "Se déconnecter ?",
    "logoutMessage": "Vos données non synchronisées seront envoyées."
  }
}
```

### Dépendances
- M-003 (i18n pour changement langue)
- M-007 (Auth pour logout)

### Peut être parallélisé avec
- M-020 (Sync)
- M-021 (Onboarding)

### Estimation
**4-5 heures**

### Labels
`settings` `screen` `priority:high` `phase:5`

---

## M-020 : Service de Synchronisation

### Description
Implémenter la logique de synchronisation des données offline.

### Critères d'acceptation
- [ ] Service `syncService.ts` avec appel batch API
- [ ] Hook `useSync` orchestrant la sync
- [ ] Déclencheurs :
  - [ ] Au démarrage app (si online)
  - [ ] À la reconnexion réseau
  - [ ] Pull-to-refresh manuel
  - [ ] Avant logout
- [ ] Gestion des réponses :
  - [ ] Succès : retirer de la queue
  - [ ] Échec partiel : garder les failed
  - [ ] Mapping localId → serverId
- [ ] Toast de feedback
- [ ] Retry avec backoff exponentiel (max 3)

### Fichiers à créer
```
/src/features/sync/services/syncService.ts
/src/features/sync/hooks/useSync.ts
/src/features/sync/hooks/useSyncOnReconnect.ts
```

### Logique sync
```typescript
const syncAll = async () => {
  const { pendingComments, pendingRatings, pendingFavorites } = useSyncStore.getState();
  
  if (pendingComments.length === 0 && pendingRatings.length === 0) {
    return;
  }
  
  try {
    const result = await syncService.batch({
      comments: pendingComments,
      ratings: pendingRatings,
    });
    
    // Process results
    result.comments.created.forEach(({ localId }) => {
      useSyncStore.getState().removeComment(localId);
    });
    
    // Handle favorites separately (not batch)
    for (const fav of pendingFavorites) {
      await favoriteService[fav.action](fav.recipeId);
      useSyncStore.getState().removeFavorite(fav.recipeId);
    }
    
    // Invalidate queries
    queryClient.invalidateQueries({ queryKey: ['recipes'] });
    queryClient.invalidateQueries({ queryKey: ['favorites'] });
    
  } catch (error) {
    // Handle retry
  }
};
```

### Dépendances
- M-008 (Sync store)
- M-006 (API client)

### Peut être parallélisé avec
- M-019 (Settings)
- M-021 (Onboarding)

### Estimation
**3-4 heures**

### Labels
`sync` `offline` `priority:high` `phase:5`

---

## M-021 : Onboarding & Tutorial

### Description
Implémenter l'onboarding initial et le tutorial du mode recette.

### Critères d'acceptation
- [ ] Détection premier lancement (MMKV flag)
- [ ] Carrousel 4 slides :
  - [ ] Bienvenue
  - [ ] Recherche & Filtres
  - [ ] Mode Recette
  - [ ] Mode Offline
- [ ] Navigation dots + swipe
- [ ] Bouton "Passer" en haut
- [ ] Bouton "Commencer" sur dernière slide
- [ ] Tutorial mode recette (overlay) :
  - [ ] Explication tap zones
  - [ ] Explication barre progression
  - [ ] Explication timer
- [ ] Détection premier lancement mode recette
- [ ] Option "Revoir tutorial" dans Settings

### Fichiers à créer
```
/src/features/onboarding/screens/OnboardingScreen.tsx
/src/features/onboarding/components/OnboardingSlide.tsx
/src/features/onboarding/components/OnboardingDots.tsx
/src/features/cooking/components/TutorialOverlay.tsx
/src/features/onboarding/hooks/useOnboarding.ts
```

### Traductions
```json
{
  "onboarding": {
    "skip": "Passer",
    "next": "Suivant",
    "getStarted": "Commencer",
    "slide1": {
      "title": "Bienvenue !",
      "description": "Découvrez des recettes délicieuses et cuisinez comme un chef."
    },
    "slide2": {
      "title": "Trouvez vos recettes",
      "description": "Recherchez et filtrez parmi des centaines de recettes."
    },
    "slide3": {
      "title": "Cuisinez pas à pas",
      "description": "Suivez les instructions en mode mains libres."
    },
    "slide4": {
      "title": "Toujours disponible",
      "description": "Accédez à vos recettes même sans connexion."
    }
  },
  "tutorial": {
    "tapZones": "Tapez à gauche ou à droite pour naviguer entre les étapes",
    "progressBar": "La barre de progression réapparaît au tap",
    "timer": "Tapez sur le timer pour le démarrer",
    "gotIt": "Compris !"
  }
}
```

### Dépendances
- M-016 (Mode réalisation pour tutorial)

### Peut être parallélisé avec
- M-019 (Settings)
- M-020 (Sync)

### Estimation
**3-4 heures**

### Labels
`onboarding` `tutorial` `priority:medium` `phase:5`

---

## M-022 : Polish & QA

### Description
Finalisation, corrections et optimisations.

### Critères d'acceptation
- [ ] Revue complète des traductions FR/EN
- [ ] Test de tous les flows offline
- [ ] Test refresh token (expiration simulée)
- [ ] Vérification performance (60fps)
- [ ] Optimisation images (caching, lazy load)
- [ ] Test sur devices réels (iOS + Android)
- [ ] Fix bugs identifiés
- [ ] Accessibilité : vérification labels
- [ ] Contraste couleurs validé
- [ ] Splash screen configuré
- [ ] App icons finales
- [ ] Build EAS preview fonctionnel

### Checklist QA
```
[ ] Login/Register - Happy path
[ ] Login/Register - Erreurs validation
[ ] Login/Register - Erreur réseau
[ ] Homepage - Chargement initial
[ ] Homepage - Recherche
[ ] Homepage - Filtres
[ ] Homepage - Infinite scroll
[ ] Homepage - Pull to refresh
[ ] Homepage - Mode offline
[ ] RecipeDetail - Affichage complet
[ ] RecipeDetail - Ajustement portions
[ ] RecipeDetail - Checkboxes ingrédients
[ ] RecipeDetail - Commentaires
[ ] CookingMode - Navigation
[ ] CookingMode - Timer
[ ] CookingMode - Interruption
[ ] CookingMode - Complétion
[ ] Favoris - Toggle
[ ] Favoris - Liste
[ ] Settings - Édition profil
[ ] Settings - Changement langue
[ ] Settings - Changement thème
[ ] Settings - Déconnexion
[ ] Sync - Au démarrage
[ ] Sync - À la reconnexion
[ ] Onboarding - Premier lancement
[ ] Tutorial - Premier mode recette
```

### Dépendances
- Tous les tickets précédents

### Estimation
**4-6 heures**

### Labels
`qa` `polish` `priority:high` `phase:5`

---

# 📅 Planning Suggéré

## Semaine 1

| Jour | Dev 1 | Dev 2 (si parallélisation) |
|------|-------|---------------------------|
| J1 | M-001 Setup | - |
| J1 | M-002 Core config | - |
| J2 | M-003 i18n | M-004 Composants UI |
| J2 | M-005 Navigation | (continue M-004) |
| J3 | M-006 API Client | - |
| J3 | M-007 Auth Context | M-008 Offline setup |
| J4 | M-009 Login | (continue M-008) |
| J4 | M-010 Register | - |
| J5 | M-011 Hooks recettes | - |

## Semaine 2

| Jour | Dev 1 | Dev 2 (si parallélisation) |
|------|-------|---------------------------|
| J1-J2 | M-012 Homepage | M-013 RecipeDetail |
| J3 | M-014 Commentaires | M-015 Favoris |
| J4 | M-016 Mode Réalisation | - |
| J5 | M-017 Timer | M-018 Complétion |

## Semaine 3

| Jour | Dev 1 | Dev 2 (si parallélisation) |
|------|-------|---------------------------|
| J1 | M-019 Settings | M-020 Sync |
| J2 | M-021 Onboarding | (continue M-020) |
| J3-J5 | M-022 Polish & QA | - |

---

# 📊 Métriques

| Métrique | Valeur |
|----------|--------|
| Total tickets | 22 |
| Estimation totale | ~70-85 heures |
| Tickets parallélisables | 10 (en paires) |
| Gain potentiel parallélisation | ~20-25% |

---

**Document généré le** : 2025-01-XX  
**Version** : 1.0