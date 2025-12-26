# Spécifications Fonctionnelles - Application Mobile de Recettes

## 📋 Informations Générales

**Nom du projet** : Recipe App  
**Version** : 1.0.0 (MVP)  
**Date** : 08/11/2025  
**Type** : Application mobile React Native (iOS & Android)  
**Mode** : Offline-first avec synchronisation automatique

---

## 🎯 Objectif du Projet

Application mobile permettant aux utilisateurs de :
- Consulter des recettes de cuisine
- Réaliser des recettes en mode guidé étape par étape
- Noter et commenter les recettes réalisées
- Accéder aux recettes en mode hors ligne

---

## 👥 Personas & Cas d'Usage

### Persona Principal
**Marie, 32 ans, passionnée de cuisine**
- Cherche des recettes simples et rapides
- Cuisine souvent avec son Thermomix
- Utilise son téléphone en cuisine, même sans connexion
- Aime partager son avis sur les recettes

### Cas d'usage principaux
1. Trouver une recette rapide pour ce soir
2. Suivre une recette pas à pas en cuisinant
3. Ajuster les quantités selon le nombre de convives
4. Consulter des recettes sans connexion internet
5. Partager son avis après avoir testé une recette

---

## 🗺️ Architecture de Navigation

```
App
│
├─ Auth Stack (non connecté)
│  ├─ Login
│  └─ Register
│
└─ Main App (connecté)
   │
   └─ Bottom Tab Navigation
      │
      ├─ Tab: Home (Recettes)
      │  ├─ RecipesList (Homepage)
      │  ├─ RecipeDetail (Fiche recette)
      │  └─ RecipeRealization (Mode recette)
      │
      └─ Tab: Profile
         └─ Settings
```

---

## 📱 Spécifications Détaillées par Écran

---

## 1. 🔐 Écran de Connexion (Login)

### 1.1 Objectif
Permettre à un utilisateur existant de se connecter à l'application.

### 1.2 Layout
- **Orientation** : Portrait uniquement
- **Header** : Logo de l'application + titre "Connexion"
- **Contenu** : Formulaire centré verticalement

### 1.3 Composants

#### Formulaire
```
┌─────────────────────────────────┐
│   [Logo App]                    │
│   Connexion                     │
│                                 │
│   Email                         │
│   [____________________]        │
│   {Message d'erreur inline}     │
│                                 │
│   Mot de passe                  │
│   [____________________] [👁]   │
│   {Message d'erreur inline}     │
│                                 │
│   [Bouton "Se connecter"]       │
│                                 │
│   Pas de compte ?               │
│   [Lien "S'inscrire"]           │
└─────────────────────────────────┘
```

#### Champs du formulaire

| Champ | Type | Règles de validation | Requis |
|-------|------|---------------------|--------|
| Email | Email input | Format email valide | ✅ |
| Mot de passe | Password input | Min 6 caractères | ✅ |

### 1.4 Comportements

#### Validation
- **En temps réel** : Validation à la perte de focus (onBlur)
- **Messages d'erreur inline** : Affichés sous chaque champ en erreur
- **Couleur** : Rouge pour les erreurs

#### Gestion des erreurs
**Erreurs possibles** :
- Email invalide → "Format d'email invalide"
- Mot de passe trop court → "Le mot de passe doit contenir au moins 6 caractères"
- Identifiants incorrects (API) → Toast rouge : "Email ou mot de passe incorrect"
- Erreur réseau → Toast rouge : "Impossible de se connecter. Vérifiez votre connexion."

#### Toggle mot de passe
- Icône œil à droite du champ
- Clic : toggle entre texte visible / masqué

#### Navigation
- Clic sur "S'inscrire" → Navigation vers écran Register
- Connexion réussie → Navigation vers Home (Tab Navigation)

### 1.5 Persistance
- Session persistante : L'utilisateur reste connecté après fermeture de l'app
- Token stocké dans MMKV (sécurisé)

### 1.6 États de l'écran
1. **Par défaut** : Formulaire vide, bouton actif
2. **Validation** : Messages d'erreur inline si champs invalides
3. **Loading** : Bouton avec spinner, champs désactivés
4. **Erreur** : Toast + messages inline selon l'erreur

---

## 2. ✍️ Écran d'Inscription (Register)

### 2.1 Objectif
Permettre à un nouvel utilisateur de créer un compte.

### 2.2 Layout
- **Orientation** : Portrait uniquement
- **Header** : Logo de l'application + titre "Inscription"
- **Contenu** : Formulaire centré verticalement

### 2.3 Composants

#### Formulaire
```
┌─────────────────────────────────┐
│   [Logo App]                    │
│   Inscription                   │
│                                 │
│   Nom d'utilisateur             │
│   [____________________]        │
│   {Message d'erreur inline}     │
│                                 │
│   Email                         │
│   [____________________]        │
│   {Message d'erreur inline}     │
│                                 │
│   Mot de passe                  │
│   [____________________] [👁]   │
│   {Message d'erreur inline}     │
│                                 │
│   Confirmer le mot de passe     │
│   [____________________] [👁]   │
│   {Message d'erreur inline}     │
│                                 │
│   [Bouton "S'inscrire"]         │
│                                 │
│   Déjà un compte ?              │
│   [Lien "Se connecter"]         │
└─────────────────────────────────┘
```

#### Champs du formulaire

| Champ | Type | Règles de validation | Requis |
|-------|------|---------------------|--------|
| Nom d'utilisateur | Text input | Min 3 caractères, alphanumérique | ✅ |
| Email | Email input | Format email valide | ✅ |
| Mot de passe | Password input | Min 6 caractères | ✅ |
| Confirmation mot de passe | Password input | Doit correspondre au mot de passe | ✅ |

### 2.4 Comportements

#### Gestion des erreurs
**Erreurs possibles** :
- Username trop court → "Le nom d'utilisateur doit contenir au moins 3 caractères"
- Username non alphanumérique → "Le nom d'utilisateur ne peut contenir que des lettres et chiffres"
- Email invalide → "Format d'email invalide"
- Email déjà utilisé (API) → Toast rouge : "Cet email est déjà utilisé"
- Mot de passe trop court → "Le mot de passe doit contenir au moins 6 caractères"
- Mots de passe différents → "Les mots de passe ne correspondent pas"

#### Navigation
- Clic sur "Se connecter" → Navigation vers écran Login
- Inscription réussie → Toast vert "Compte créé avec succès" + Navigation vers Home

---

## 3. 🏠 Homepage - Liste des Recettes

### 3.1 Objectif
Afficher la liste de toutes les recettes avec possibilité de filtrer, rechercher et accéder aux détails.

### 3.2 Layout
- **Orientation** : Portrait
- **Header** : Titre "Recettes" + Barre de recherche
- **Contenu** : 
  - Section filtres (tags badges)
  - Liste de recettes cards (scroll vertical infini)
- **Bottom Tab** : Visible (Home actif)

### 3.3 Composants

#### Header
```
┌─────────────────────────────────┐
│ Recettes          [📡 Offline]  │
│                                 │
│ [🔍 Rechercher une recette...] │
└─────────────────────────────────┘
```

#### Section Filtres (Tags)
```
┌─────────────────────────────────┐
│ Filtres :                       │
│                                 │
│ [🥗 Végétarien] [⏱️ Rapide]     │
│ [🌶️ Épicé] [🤖 Thermomix] ...  │
│                                 │
│ ← Scroll horizontal             │
└─────────────────────────────────┘
```

**Comportement des badges** :
- **État par défaut** : Background gris clair, texte gris foncé
- **État actif** : Background primaire, texte blanc
- **Ordre** : Les badges actifs passent en premier dans la liste
- **Multi-sélection** : Possible (logique ET)

#### Card Recipe
```
┌─────────────────────────────────┐
│ [Image recette]       [❤️ Fav]  │
│                                 │
│ Nom de la recette              │
│                                 │
│ ⏱️ 30 min  👨‍🍳 Moyen  ⭐ 4.5   │
│                                 │
│ [🤖] [📥]                       │
└─────────────────────────────────┘
```

**Informations affichées** :

| Élément | Description | Format |
|---------|-------------|--------|
| Image | Photo principale de la recette | Ratio 16:9 |
| Nom | Titre de la recette | 1-2 lignes max (ellipsis) |
| Temps | Temps total (préparation + cuisson) | "X min" |
| Difficulté | Facile / Moyen / Difficile | Badge coloré |
| Note moyenne | Rating moyen | Étoiles + nombre (ex: 4.5) |
| Badge Thermomix | Icône mixer | Visible si compatible |
| Badge Offline | Icône téléchargement | Visible si recette fully cached |
| Favori | Icône cœur | Rempli si en favori |

### 3.4 Comportements

#### Recherche
- **Déclenchement** : Recherche lancée après 300ms d'inactivité (debounce)
- **Champ de recherche** : Nom de la recette (case-insensitive)
- **Comportement** : Fonctionne en parallèle des filtres tags (cumul des conditions)

#### Filtres par Tags
- **Sélection** : Tap sur un badge
- **Multi-sélection** : Possible
- **Logique** : ET (recette doit avoir TOUS les tags sélectionnés)
- **Réinitialisation** : Bouton "Effacer les filtres" si au moins 1 filtre actif

#### Tri par défaut
- **Ordre** : Par note moyenne décroissante (meilleures notes en premier)

#### Infinite Scroll
- **Pagination** : Chargement automatique au scroll
- **Seuil** : Quand l'utilisateur arrive à 80% du bas de la liste
- **Loader** : Spinner en bas de liste pendant chargement

#### État vide
**Aucun résultat de recherche/filtres** :
```
┌─────────────────────────────────┐
│           😢                    │
│                                 │
│   Aucune recette trouvée        │
│   avec ces critères             │
│                                 │
│   [Bouton "Réinitialiser"]      │
└─────────────────────────────────┘
```

### 3.5 États de l'écran

#### Loading initial
- **Skeleton** : Affichage de 6 cards en skeleton (placeholder animé)

#### Mode offline
- **Indicateur offline** : Badge "📡 Offline" dans le header
- **Comportement** : Affichage des recettes en cache uniquement
- **Message** : Toast info : "Mode hors ligne - Recettes limitées au cache"

---

## 4. 📄 Fiche Recette (Detail)

### 4.1 Objectif
Afficher le détail complet d'une recette : informations, ingrédients, étapes, notes et commentaires.

### 4.2 Layout
- **Orientation** : Portrait
- **Header** : Bouton retour + titre recette + icône favori
- **Contenu** : Scroll vertical
- **Bouton flottant** : "Commencer la recette" (fixed en bas)

### 4.3 Structure de la page

```
┌─────────────────────────────────┐
│ [←] Nom de la recette      [❤️] │
├─────────────────────────────────┤
│   [Image principale]            │
├─────────────────────────────────┤
│ Section: Informations           │
│                                 │
│ ⏱️ Préparation: 15 min          │
│ 🔥 Cuisson: 30 min              │
│ ⭐ Note: 4.5/5 (24 avis)        │
│ 👨‍🍳 Difficulté: Moyen            │
│ [🤖 Compatible Thermomix]       │
│                                 │
│ Portions: [Dropdown 2-12] pers  │
├─────────────────────────────────┤
│ Section: Description            │
│ {Texte description recette}     │
├─────────────────────────────────┤
│ Section: Ingrédients            │
│                                 │
│ [ ] 250g de farine              │
│ [ ] 3 œufs                      │
│ [ ] 200ml de lait               │
├─────────────────────────────────┤
│ Section: Étapes                 │
│                                 │
│ 1️⃣ Préchauffer le four à 180°C │
│ 2️⃣ Mélanger les ingrédients... │
│ 3️⃣ {Autres étapes...}          │
├─────────────────────────────────┤
│ Section: Notes & Commentaires   │
│                                 │
│ Note moyenne: ⭐⭐⭐⭐⭐ 4.5/5    │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 👤 Marie ⭐⭐⭐⭐⭐           │ │
│ │ "Excellente recette !"      │ │
│ │ Il y a 2 jours              │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Voir tous les commentaires]    │
└─────────────────────────────────┘

[Bouton: "Commencer la recette"]
```

### 4.4 Comportements clés

#### Ajustement portions
- **Dropdown** : Range 1 à 12 personnes
- **Recalcul** : Automatique des quantités d'ingrédients
- **Formule** : `nouvelle_quantité = (quantité_originale / portions_originales) * portions_sélectionnées`

#### Checkboxes ingrédients
- **Tap** → Toggle checked/unchecked
- **État checked** → Texte barré + opacité réduite
- **Persistance** : Sauvegardé localement (MMKV)

#### Restriction Commentaires
- **Lecture seule** : L'utilisateur peut voir mais pas commenter
- **Condition** : Doit réaliser la recette pour laisser un avis

---

## 5. 👨‍🍳 Mode Recette (Réalisation)

### 5.1 Objectif
Guider l'utilisateur étape par étape dans la réalisation de la recette avec une interface immersive.

### 5.2 Layout
- **Orientation** : **Paysage forcé** (rotation automatique vers la droite)
- **Mode immersif** : Barre de progression qui disparaît après 3 secondes
- **Navigation** : Tap zones gauche/droite + flèches visibles
- **Bouton Quitter** : Icône X en haut à gauche

### 5.3 Vue principale (Paysage)

```
┌───────────────────────────────────────────────────────┐
│ [X]  ●●●●●●●○○○○  Étape 3/12          [Timer 5:00]  │
├───────────────────────────────────────────────────────┤
│                                                       │
│ ┌─────────────────┐        [Image étape]            │
│ │  Ingrédients :  │                                  │
│ │  • 250g farine  │     Mélanger les ingrédients    │
│ │  • 3 œufs       │     secs dans un saladier.      │
│ │  • 200ml lait   │     Ajouter les œufs un par     │
│ └─────────────────┘     un en mélangeant bien.      │
│                                                       │
│                    [← Précédent]  [Suivant →]        │
│                                                       │
│ [Tap zone gauche]          [Tap zone droite]         │
└───────────────────────────────────────────────────────┘
```

### 5.4 Comportements

#### Orientation forcée
- **Au chargement** : Rotation automatique en paysage (droite)
- **Si rotation bloquée** : Rotation programmatique vers la droite

#### Keep Screen Awake
- **Activation** : Automatique dès l'entrée en mode recette
- **Désactivation** : Possible via Settings > Préférences

#### Navigation
- **Tap zone gauche** (1/2 gauche) : Étape précédente
- **Tap zone droite** (1/2 droite) : Étape suivante
- **Flèches** : Toujours visibles en bas
- **Feedback** : Animation/flash rapide au tap

#### Barre de progression
- Visible au chargement
- Disparaît après 3 secondes
- Réapparaît au tap n'importe où
- Format : `●●●●●○○○○` (étapes accomplies vs futures)

#### Timer
- **Affichage** : Coin supérieur droit si durée définie
- **Lancement** : Manuel (tap sur timer)
- **États** : Non démarré / En cours / Pause / Terminé
- **Terminé** : Vibration + son + "00:00" clignotant

#### Gestion interruption

| Action | Comportement |
|--------|--------------|
| Retour Homepage (bouton Quitter) | Progression **réinitialisée** |
| App en background | Progression **sauvegardée** |
| Retour sur recette | Prompt "Reprendre la recette ?" |

#### Bouton Quitter
- **Tap** : Modale de confirmation
- **Modale** : "Quitter la recette ? Votre progression sera perdue."
- **Actions** : Annuler / Quitter

### 5.5 Dernière Étape - Écran de Complétion

**Passage en Portrait automatique**

```
┌─────────────────────────────────┐
│           🎉                    │
│                                 │
│    Recette terminée !           │
│                                 │
│ Qu'avez-vous pensé de           │
│ cette recette ?                 │
│                                 │
│     ⭐ ⭐ ⭐ ⭐ ⭐              │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Laissez un commentaire...   │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Passer]  [Envoyer mon avis]    │
└─────────────────────────────────┘
```

**Comportements** :
- Note + commentaire optionnels
- "Passer" → Retour RecipeDetail sans noter
- "Envoyer" → Envoi + retour RecipeDetail

**Gestion Offline** :
- Si offline : Ajout à la queue de synchronisation
- Toast : "Votre avis sera envoyé dès la reconnexion"

---

## 6. ⚙️ Page Settings (Profil)

### 6.1 Objectif
Gérer le profil, les préférences et la déconnexion.

### 6.2 Structure

```
┌─────────────────────────────────┐
│ Paramètres                      │
├─────────────────────────────────┤
│ Section: Profil                 │
│                                 │
│ Nom d'utilisateur               │
│ [marie_cuisine] [✏️]            │
│                                 │
│ Email                           │
│ marie@example.com (non éditable)│
│                                 │
│ Mot de passe                    │
│ •••••••• [Modifier]             │
├─────────────────────────────────┤
│ Section: Préférences            │
│                                 │
│ Langue                          │
│ Français          [→]           │
│                                 │
│ Thème                           │
│ Automatique       [→]           │
│                                 │
│ Maintenir l'écran allumé        │
│ en mode recette   [Toggle]      │
├─────────────────────────────────┤
│ Section: À propos               │
│                                 │
│ Version: 1.0.0                  │
│ Conditions d'utilisation        │
│ Politique de confidentialité    │
├─────────────────────────────────┤
│                                 │
│ [Bouton "Se déconnecter"]       │
└─────────────────────────────────┘
```

### 6.3 Comportements

#### Modification username
- **Tap sur ✏️** : Ouvre modale d'édition
- **Validation** : Min 3 caractères, alphanumérique
- **Vérification** : À la soumission (appel API)

#### Modification mot de passe
- **Tap "Modifier"** : Ouvre modale
- **Champs** : Nouveau mot de passe + Confirmation
- **Validation** : Min 6 caractères, correspondance

#### Thème
- **Options** : Automatique / Clair / Sombre
- **Application** : Immédiate avec preview
- **Sauvegarde** : MMKV

#### Déconnexion
- **Confirmation** : Modale "Se déconnecter ?"
- **Actions** :
  1. Sync données en attente (si online)
  2. Suppression token
  3. Clear cache
  4. Navigation Login

---

## 7. 🔄 Onboarding & Tutorial

### 7.1 Onboarding Initial

**Carrousel de 4 slides** (première ouverture) :

1. **Bienvenue** - Présentation de l'app
2. **Recherche & Filtres** - Trouver des recettes
3. **Mode Recette** - Cuisiner en mode guidé
4. **Mode Offline** - Disponibilité hors ligne

**Actions** :
- Navigation entre slides
- Bouton "Passer" en haut à droite
- "Commencer" sur dernière slide

### 7.2 Tutorial Mode Recette

**Overlay explicatif** (premier lancement mode recette) :

1. **Navigation tap zones** - Explication zones gauche/droite
2. **Barre de progression** - Comment l'afficher/masquer
3. **Timer** - Comment le démarrer

**Réaffichage** : Bouton "Revoir le tutorial" dans Settings

---

## 8. 🗂️ Gestion des Favoris

### 8.1 Comportements

**Ajout/Retrait** :
- Icône cœur sur card (Homepage) ou header (RecipeDetail)
- Tap → Toggle + animation bounce
- Toast feedback

**Page Favoris** :
- Accessible via icône dans Homepage header
- Layout identique à Homepage
- Filtres/recherche disponibles

**Synchronisation** :
- Actions offline → Queue de sync
- Sync automatique à la reconnexion

---

## 9. 📊 États Globaux & Feedback

### 9.1 Indicateur Mode Offline

**Badge dans header** :
```
[📡 Offline]  ou  [⚠️ Mode hors ligne]
```

- Couleur : Jaune/Orange
- Position : Header, aligné à droite
- Visible uniquement en mode offline

### 9.2 Types de Feedback

#### Toasts

| Type | Couleur | Durée | Exemple |
|------|---------|-------|---------|
| Succès | Vert | 3s | "Recette ajoutée aux favoris" |
| Erreur | Rouge | 4s | "Erreur de connexion" |
| Info | Bleu | 3s | "Mode hors ligne activé" |
| Warning | Orange | 3s | "Données non synchronisées" |

#### Skeleton Screens
- Homepage : 6 cards
- RecipeDetail : Structure de page
- Animation shimmer

#### Messages État Vide
Format :
```
[Icône]
Message descriptif
[Action optionnelle]
```

---

## 10. 🔐 Sécurité & Permissions

### 10.1 Authentification

- **Token JWT** : Stocké dans MMKV (encrypted)
- **Expiration** : 7 jours
- **Refresh** : Automatique via Supabase Auth
- **Session** : Persistante après fermeture app

### 10.2 Permissions Requises

| Permission | Usage |
|------------|-------|
| Internet | API calls, sync |
| Network state | Détection online/offline |
| Wake lock | Keep screen awake en mode recette |

---

## 11. 📈 Métriques & Analytics

### 11.1 Événements Utilisateur

- `app_opened` - Ouverture app
- `recipe_viewed` - Consultation recette
- `recipe_started` - Lancement mode recette
- `recipe_completed` - Fin recette
- `recipe_rated` - Note donnée
- `recipe_commented` - Commentaire posté
- `recipe_favorited` - Toggle favori
- `search_performed` - Recherche lancée
- `filter_applied` - Filtre appliqué

### 11.2 Événements Techniques

- `offline_mode_entered` - Passage offline
- `sync_started` / `sync_completed` / `sync_failed`
- `cache_hit` / `cache_miss`

### 11.3 Outils Recommandés

**MVP** : Expo Analytics (basique)
**Production** : Mixpanel/Amplitude + Sentry

---

## 12. ♿ Accessibilité

### 12.1 Standards
- WCAG 2.1 Level AA
- Screen readers (VoiceOver, TalkBack)

### 12.2 Pratiques
- Tous les boutons ont un `accessibilityLabel`
- Contraste minimum 4.5:1 pour texte
- Tailles tactiles minimum 44x44 points
- Feedback visuel + haptic

---

## 13. 🌍 Internationalisation

### 13.1 Configuration
- **Langue par défaut** : Français
- **Langues MVP** : Français uniquement
- **Phase 2** : Anglais

### 13.2 Structure
```
/src/lib/i18n/
  ├─ index.ts
  ├─ fr.json
  └─ en.json (Phase 2)
```

---

## 14. 🚀 Roadmap & Priorisation

### 14.1 MVP (Phase 1) - 3-4 semaines

**Priorité Haute** :
- ✅ Authentification (Login/Register)
- ✅ Homepage (Liste + Recherche + Filtres)
- ✅ Fiche recette (Detail)
- ✅ Mode recette (Réalisation)
- ✅ Notes & Commentaires (post-réalisation)
- ✅ Mode offline (cache + sync)
- ✅ Favoris
- ✅ Settings
- ✅ Onboarding & Tutorial

### 14.2 Phase 2 (Post-MVP)

**Fonctionnalités** :
- Photo de profil
- Mot de passe oublié
- Partage de recettes
- Listes de courses
- Notifications push
- Widget
- Langue anglaise
- Deep linking

---

## 15. 📝 Stack Technique Recap

| Couche | Technologie |
|--------|-------------|
| Framework | React Native (Expo) |
| Langage | TypeScript (strict) |
| Styling | NativeWind v4 |
| Navigation | React Navigation v6 |
| State | Zustand + Context API |
| Server State | TanStack Query v5 |
| Storage | MMKV |
| Forms | React Hook Form + Zod |
| API | Axios (REST) |
| Backend | Next.js 14+ |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase Auth (JWT) |
| i18n | react-i18next |

---

## 16. 📌 API Endpoints Recap

```
Auth:
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me

Recipes:
GET    /api/recipes (pagination, filters, search)
GET    /api/recipes/:id

Comments:
GET    /api/recipes/:id/comments
POST   /api/comments { recipeId, content }

Ratings:
POST   /api/ratings { recipeId, score }

Favorites:
GET    /api/favorites
POST   /api/favorites/:recipeId
DELETE /api/favorites/:recipeId

User:
GET    /api/users/me
PUT    /api/users/me { username?, password? }

Sync:
POST   /api/sync/batch { comments, ratings }
```

---

## 17. ✅ Checklist de Validation MVP

### Authentification
- [ ] Inscription fonctionnelle
- [ ] Connexion fonctionnelle
- [ ] Session persistante
- [ ] Gestion erreurs

### Homepage
- [ ] Liste recettes affichée
- [ ] Filtres multi-sélection (logique ET)
- [ ] Recherche fonctionnelle
- [ ] Infinite scroll
- [ ] Pull-to-refresh
- [ ] Skeleton loading

### Fiche Recette
- [ ] Informations complètes
- [ ] Ajustement portions
- [ ] Checkboxes ingrédients
- [ ] Notes/commentaires visibles
- [ ] Bouton "Commencer"

### Mode Recette
- [ ] Rotation paysage forcée
- [ ] Navigation tap zones + flèches
- [ ] Barre progression auto-hide
- [ ] Timer fonctionnel
- [ ] Keep screen awake
- [ ] Gestion interruption
- [ ] Écran complétion (note/commentaire)
- [ ] Tutorial overlay

### Favoris
- [ ] Ajout/retrait fonctionnel
- [ ] Page favoris accessible
- [ ] Sync offline

### Settings
- [ ] Édition username
- [ ] Changement mot de passe
- [ ] Sélection thème
- [ ] Toggle keep awake
- [ ] Déconnexion avec confirmation

### Offline
- [ ] Détection réseau
- [ ] Badge offline visible
- [ ] Cache recettes
- [ ] Queue commentaires/notes
- [ ] Sync auto reconnexion

### Général
- [ ] Onboarding première ouverture
- [ ] Toasts de feedback
- [ ] Gestion erreurs réseau
- [ ] Performance (60fps)

---

**Version** : 1.0  
**Date** : 08/11/2025  
**Statut** : ✅ Prêt pour développement  
**Prochaine étape** : Setup projet + Configuration technique

---

**Document complet généré avec succès ! 🎉**