# Spécifications Fonctionnelles - Application Mobile de Recettes

## 📋 Informations Générales

**Nom du projet** : Les Recettes de Zazou  
**Version** : 2.0.0 (MVP)  
**Date** : 2025-01-XX  
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
- **Header** : Logo de l'application + titre "Connexion" / "Login"
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
- Email invalide → "Format d'email invalide" / "Invalid email format"
- Mot de passe trop court → "Le mot de passe doit contenir au moins 6 caractères" / "Password must be at least 6 characters"
- Identifiants incorrects (API) → Toast rouge : "Email ou mot de passe incorrect" / "Invalid email or password"
- Erreur réseau → Toast rouge : "Impossible de se connecter. Vérifiez votre connexion." / "Unable to connect. Check your connection."

#### Toggle mot de passe
- Icône œil à droite du champ
- Clic : toggle entre texte visible / masqué

#### Navigation
- Clic sur "S'inscrire" → Navigation vers écran Register
- Connexion réussie → Navigation vers Home (Tab Navigation)

### 1.5 Flow d'authentification (API .NET)

```
┌─────────────┐         ┌─────────────┐
│   Mobile    │         │  API .NET   │
└──────┬──────┘         └──────┬──────┘
       │                       │
       │ POST /api/auth/login  │
       │ { email, password }   │
       │──────────────────────►│
       │                       │
       │ 200 OK                │
       │ { user, accessToken,  │
       │   refreshToken,       │
       │   expiresIn }         │
       │◄──────────────────────│
       │                       │
       │ Stockage MMKV :       │
       │ - accessToken         │
       │ - refreshToken        │
       │ - user                │
       │                       │
```

**Tokens** :
- **Access Token** : Durée de vie 15 minutes
- **Refresh Token** : Durée de vie 7 jours
- **Stockage** : MMKV (chiffré)

### 1.6 Persistance
- Session persistante : L'utilisateur reste connecté après fermeture de l'app
- Tokens stockés dans MMKV (sécurisé)
- Refresh automatique du token avant expiration

### 1.7 États de l'écran
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
- **Header** : Logo de l'application + titre "Inscription" / "Sign Up"
- **Contenu** : Formulaire centré verticalement

### 2.3 Composants

#### Formulaire
```
┌─────────────────────────────────┐
│   [Logo App]                    │
│   Inscription                   │
│                                 │
│   Nom d'affichage               │
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
| Nom d'affichage | Text input | Min 3 caractères, max 50 | ✅ |
| Email | Email input | Format email valide, unique | ✅ |
| Mot de passe | Password input | Min 6 caractères | ✅ |
| Confirmation mot de passe | Password input | Doit correspondre au mot de passe | ✅ |

### 2.4 Comportements

#### Gestion des erreurs
**Erreurs possibles** :
- Nom trop court → "Le nom doit contenir au moins 3 caractères" / "Name must be at least 3 characters"
- Nom trop long → "Le nom ne peut pas dépasser 50 caractères" / "Name cannot exceed 50 characters"
- Email invalide → "Format d'email invalide" / "Invalid email format"
- Email déjà utilisé (API) → Toast rouge : "Cet email est déjà utilisé" / "This email is already in use"
- Mot de passe trop court → "Le mot de passe doit contenir au moins 6 caractères" / "Password must be at least 6 characters"
- Mots de passe différents → "Les mots de passe ne correspondent pas" / "Passwords do not match"

#### Flow d'inscription (API .NET)

```
POST /api/auth/register
Body: { email, password, displayName }

Response 201:
{
  "user": { "id": "guid", "email": "...", "displayName": "..." },
  "accessToken": "jwt...",
  "refreshToken": "...",
  "expiresIn": 900
}
```

#### Navigation
- Clic sur "Se connecter" → Navigation vers écran Login
- Inscription réussie → Toast vert "Compte créé avec succès" / "Account created successfully" + Navigation vers Home

---

## 3. 🏠 Homepage - Liste des Recettes

### 3.1 Objectif
Afficher la liste de toutes les recettes avec possibilité de filtrer, rechercher et accéder aux détails.

### 3.2 Layout
- **Orientation** : Portrait
- **Header** : Titre "Recettes" / "Recipes" + Barre de recherche
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
| Image | Photo principale de la recette (URL MinIO) | Ratio 16:9 |
| Nom | Titre de la recette | 1-2 lignes max (ellipsis) |
| Temps | Temps total (préparation + cuisson) | "X min" |
| Difficulté | Easy / Medium / Hard | Badge coloré + traduction |
| Note moyenne | Rating moyen | Étoiles + nombre (ex: 4.5) |
| Badge Thermomix | Icône mixer | Visible si tag "thermomix" |
| Badge Offline | Icône téléchargement | Visible si recette fully cached |
| Favori | Icône cœur | Rempli si en favori |

### 3.4 Comportements

#### Recherche
- **Déclenchement** : Recherche lancée après 300ms d'inactivité (debounce)
- **Champ de recherche** : Nom et description de la recette (côté API)
- **Comportement** : Fonctionne en parallèle des filtres tags (cumul des conditions)

#### Filtres par Tags
- **Sélection** : Tap sur un badge
- **Multi-sélection** : Possible
- **Logique** : ET (recette doit avoir TOUS les tags sélectionnés)
- **Réinitialisation** : Bouton "Effacer les filtres" / "Clear filters" si au moins 1 filtre actif

#### Tri par défaut
- **Ordre** : Par note moyenne décroissante (meilleures notes en premier)

#### Infinite Scroll
- **Pagination** : Chargement automatique au scroll
- **Seuil** : Quand l'utilisateur arrive à 80% du bas de la liste
- **Loader** : Spinner en bas de liste pendant chargement

#### Appel API

```
GET /api/recipes?page=1&limit=20&search=tarte&tags=dessert&tags=fruits&difficulty=Easy&sortBy=averageRating&sortOrder=desc

Response:
{
  "data": [...],
  "page": 1,
  "limit": 20,
  "total": 156,
  "totalPages": 8
}
```

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
- **Indicateur offline** : Badge "📡 Offline" / "📡 Hors ligne" dans le header
- **Comportement** : Affichage des recettes en cache uniquement
- **Message** : Toast info : "Mode hors ligne - Recettes limitées au cache" / "Offline mode - Limited to cached recipes"

---

## 4. 📄 Fiche Recette (Detail)

### 4.1 Objectif
Afficher le détail complet d'une recette : informations, ingrédients, étapes, notes et commentaires.

### 4.2 Layout
- **Orientation** : Portrait
- **Header** : Bouton retour + titre recette + icône favori
- **Contenu** : Scroll vertical
- **Bouton flottant** : "Commencer la recette" / "Start cooking" (fixed en bas)

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
- **Persistance** : Sauvegardé localement (MMKV) par recette

#### Restriction Commentaires
- **Lecture seule** : L'utilisateur peut voir mais pas commenter
- **Condition** : Doit **terminer le mode réalisation** (pas-à-pas complet) pour laisser un avis
- **Message si non éligible** : "Réalisez cette recette pour laisser un avis" / "Complete this recipe to leave a review"

#### Appel API

```
GET /api/recipes/{id}

Response:
{
  "id": "guid",
  "title": "...",
  "description": "...",
  "difficulty": "Medium",
  "prepTime": 15,
  "cookTime": 30,
  "servings": 4,
  "ingredients": [...],
  "steps": [...],
  "images": ["https://storage.recettes-zazou.fr/recipe-images/..."],
  "tags": [...],
  "averageRating": 4.5,
  "ratingsCount": 24
}

GET /api/recipes/{id}/comments

Response:
{
  "data": [
    {
      "id": "guid",
      "content": "...",
      "createdAt": "...",
      "user": { "id": "...", "displayName": "Marie" }
    }
  ]
}
```

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
- **Affichage** : Coin supérieur droit si durée définie pour l'étape
- **Lancement** : Manuel (tap sur timer)
- **États** : Non démarré / En cours / Pause / Terminé
- **Terminé** : Vibration + son + "00:00" clignotant

#### Gestion interruption

| Action | Comportement |
|--------|--------------|
| Retour Homepage (bouton Quitter) | Progression **réinitialisée** |
| App en background | Progression **sauvegardée** |
| Retour sur recette | Prompt "Reprendre la recette ?" / "Resume recipe?" |

#### Bouton Quitter
- **Tap** : Modale de confirmation
- **Modale** : "Quitter la recette ? Votre progression sera perdue." / "Leave recipe? Your progress will be lost."
- **Actions** : Annuler / Quitter

### 5.5 Dernière Étape - Écran de Complétion

**Passage en Portrait automatique**

```
┌─────────────────────────────────┐
│           🎉                    │
│                                 │
│    Recette terminée !           │
│    Recipe completed!            │
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
- "Passer" / "Skip" → Retour RecipeDetail sans noter (mais marque la recette comme "réalisée")
- "Envoyer" / "Submit" → Envoi + retour RecipeDetail

**Marquage "Recette réalisée"** :
- Stocké localement (MMKV) : liste des IDs de recettes terminées
- Débloque la possibilité de commenter/noter cette recette ultérieurement

**Appel API (si note/commentaire)** :

```
POST /api/ratings
Body: { recipeId: "guid", score: 5 }

POST /api/comments
Body: { recipeId: "guid", content: "Excellente recette !" }
```

**Gestion Offline** :
- Si offline : Ajout à la queue de synchronisation (Zustand + MMKV)
- Toast : "Votre avis sera envoyé dès la reconnexion" / "Your review will be sent when back online"

---

## 6. ⚙️ Page Settings (Profil)

### 6.1 Objectif
Gérer le profil, les préférences et la déconnexion.

### 6.2 Structure

```
┌─────────────────────────────────┐
│ Paramètres / Settings           │
├─────────────────────────────────┤
│ Section: Profil                 │
│                                 │
│ Nom d'affichage                 │
│ [marie_cuisine] [✏️]            │
│                                 │
│ Email                           │
│ marie@example.com (non éditable)│
├─────────────────────────────────┤
│ Section: Préférences            │
│                                 │
│ Langue / Language               │
│ Français          [→]           │
│                                 │
│ Thème / Theme                   │
│ Automatique       [→]           │
│                                 │
│ Maintenir l'écran allumé        │
│ en mode recette   [Toggle]      │
├─────────────────────────────────┤
│ Section: À propos               │
│                                 │
│ Version: 2.0.0                  │
│ Conditions d'utilisation        │
│ Politique de confidentialité    │
├─────────────────────────────────┤
│                                 │
│ [Bouton "Se déconnecter"]       │
└─────────────────────────────────┘
```

### 6.3 Comportements

#### Modification nom d'affichage
- **Tap sur ✏️** : Ouvre modale d'édition
- **Validation** : Min 3 caractères, max 50 caractères
- **Appel API** : `PUT /api/users/me { displayName: "..." }`

#### Sélection Langue
- **Options** : Français / English
- **Application** : Immédiate (re-render de l'app)
- **Sauvegarde** : MMKV + persiste au redémarrage

#### Thème
- **Options** : Automatique / Clair / Sombre (Auto / Light / Dark)
- **Application** : Immédiate avec preview
- **Sauvegarde** : MMKV

#### Déconnexion
- **Confirmation** : Modale "Se déconnecter ?" / "Log out?"
- **Actions** :
  1. Appel API : `POST /api/auth/logout`
  2. Sync données en attente (si online)
  3. Suppression tokens (MMKV)
  4. Clear cache TanStack Query
  5. Navigation Login

---

## 7. 🔄 Onboarding & Tutorial

### 7.1 Onboarding Initial

**Carrousel de 4 slides** (première ouverture) :

1. **Bienvenue** - Présentation de l'app / Welcome - App presentation
2. **Recherche & Filtres** - Trouver des recettes / Find recipes
3. **Mode Recette** - Cuisiner en mode guidé / Cook step by step
4. **Mode Offline** - Disponibilité hors ligne / Offline availability

**Actions** :
- Navigation entre slides (swipe ou dots)
- Bouton "Passer" / "Skip" en haut à droite
- "Commencer" / "Get Started" sur dernière slide

### 7.2 Tutorial Mode Recette

**Overlay explicatif** (premier lancement mode recette) :

1. **Navigation tap zones** - Explication zones gauche/droite
2. **Barre de progression** - Comment l'afficher/masquer
3. **Timer** - Comment le démarrer

**Réaffichage** : Bouton "Revoir le tutorial" / "View tutorial again" dans Settings

---

## 8. 🗂️ Gestion des Favoris

### 8.1 Comportements

**Ajout/Retrait** :
- Icône cœur sur card (Homepage) ou header (RecipeDetail)
- Tap → Toggle + animation bounce
- Toast feedback

**Appels API** :
```
POST /api/favorites/{recipeId}   # Ajouter
DELETE /api/favorites/{recipeId} # Retirer
GET /api/favorites               # Liste
```

**Page Favoris** :
- Accessible via icône cœur dans Homepage header
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
[📡 Hors ligne]  ou  [📡 Offline]
```

- Couleur : Jaune/Orange
- Position : Header, aligné à droite
- Visible uniquement en mode offline

### 9.2 Types de Feedback

#### Toasts

| Type | Couleur | Durée | Exemple FR | Exemple EN |
|------|---------|-------|------------|------------|
| Succès | Vert | 3s | "Recette ajoutée aux favoris" | "Recipe added to favorites" |
| Erreur | Rouge | 4s | "Erreur de connexion" | "Connection error" |
| Info | Bleu | 3s | "Mode hors ligne activé" | "Offline mode enabled" |
| Warning | Orange | 3s | "Données non synchronisées" | "Data not synced" |

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

## 10. 🔐 Sécurité & Authentification

### 10.1 Flow de Tokens

```
┌─────────────────────────────────────────────────────────┐
│                    Cycle de vie des tokens               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Login/Register                                         │
│       │                                                 │
│       ▼                                                 │
│  ┌─────────────────┐                                    │
│  │  Access Token   │  Durée: 15 minutes                 │
│  │  (JWT)          │  Usage: Header Authorization       │
│  └────────┬────────┘                                    │
│           │                                             │
│           │ Expiration proche (< 1 min)                 │
│           ▼                                             │
│  ┌─────────────────┐                                    │
│  │  Refresh Token  │  Durée: 7 jours                    │
│  │                 │  Endpoint: POST /api/auth/refresh  │
│  └────────┬────────┘                                    │
│           │                                             │
│           ▼                                             │
│  Nouveaux Access + Refresh Tokens                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 10.2 Gestion automatique des tokens

- **Intercepteur Axios** : Vérifie expiration avant chaque requête
- **Refresh automatique** : Si access token expire dans < 1 minute
- **Queue de requêtes** : Les requêtes en attente sont rejouées après refresh
- **Échec refresh** : Déconnexion automatique + redirection Login

### 10.3 Stockage sécurisé

| Donnée | Stockage | Chiffré |
|--------|----------|---------|
| Access Token | MMKV | ✅ |
| Refresh Token | MMKV | ✅ |
| User Info | MMKV | ✅ |
| Préférences | MMKV | ❌ |
| Cache recettes | MMKV (TanStack Query persister) | ❌ |

### 10.4 Permissions Requises

| Permission | Usage |
|------------|-------|
| Internet | API calls, sync |
| Network state | Détection online/offline |
| Wake lock | Keep screen awake en mode recette |

---

## 11. 📈 Métriques & Analytics

### 11.1 Événements Utilisateur

| Événement | Description |
|-----------|-------------|
| `app_opened` | Ouverture app |
| `recipe_viewed` | Consultation recette |
| `recipe_started` | Lancement mode recette |
| `recipe_completed` | Fin recette (toutes étapes) |
| `recipe_rated` | Note donnée |
| `recipe_commented` | Commentaire posté |
| `recipe_favorited` | Toggle favori |
| `search_performed` | Recherche lancée |
| `filter_applied` | Filtre appliqué |
| `language_changed` | Changement de langue |

### 11.2 Événements Techniques

| Événement | Description |
|-----------|-------------|
| `offline_mode_entered` | Passage offline |
| `sync_started` | Début sync |
| `sync_completed` | Fin sync réussie |
| `sync_failed` | Échec sync |
| `token_refreshed` | Refresh token effectué |
| `cache_hit` | Donnée servie depuis cache |
| `cache_miss` | Donnée fetchée depuis API |

---

## 12. ♿ Accessibilité

### 12.1 Standards
- WCAG 2.1 Level AA
- Screen readers (VoiceOver, TalkBack)

### 12.2 Pratiques
- Tous les boutons ont un `accessibilityLabel` traduit
- Contraste minimum 4.5:1 pour texte
- Tailles tactiles minimum 44x44 points
- Feedback visuel + haptic
- Labels traduits selon la langue sélectionnée

---

## 13. 🌍 Internationalisation (i18n)

### 13.1 Configuration
- **Langues supportées** : Français (défaut), English
- **Détection** : Langue système au premier lancement
- **Changement** : Settings > Langue
- **Persistance** : MMKV

### 13.2 Structure des traductions
```
/src/lib/i18n/
  ├─ index.ts       # Configuration react-i18next
  ├─ fr.json        # Traductions françaises
  └─ en.json        # Traductions anglaises
```

### 13.3 Éléments traduits
- Tous les textes de l'interface (boutons, labels, titres)
- Messages d'erreur
- Toasts et notifications
- Placeholders des champs
- Messages d'état vide

### 13.4 Éléments NON traduits
- Contenu des recettes (titre, description, ingrédients, étapes)
- Noms des tags (gérés côté back-office)
- Commentaires des utilisateurs

### 13.5 Exemple de clés
```json
// fr.json
{
  "common": {
    "loading": "Chargement...",
    "error": "Une erreur est survenue",
    "retry": "Réessayer",
    "cancel": "Annuler",
    "save": "Enregistrer",
    "delete": "Supprimer"
  },
  "auth": {
    "login": "Connexion",
    "register": "Inscription",
    "email": "Email",
    "password": "Mot de passe",
    "loginButton": "Se connecter",
    "registerButton": "S'inscrire",
    "noAccount": "Pas de compte ?",
    "hasAccount": "Déjà un compte ?"
  },
  "recipes": {
    "title": "Recettes",
    "search": "Rechercher une recette...",
    "filters": "Filtres",
    "clearFilters": "Effacer les filtres",
    "noResults": "Aucune recette trouvée",
    "difficulty": {
      "easy": "Facile",
      "medium": "Moyen",
      "hard": "Difficile"
    }
  },
  "cooking": {
    "start": "Commencer la recette",
    "step": "Étape",
    "previous": "Précédent",
    "next": "Suivant",
    "complete": "Recette terminée !",
    "leaveConfirm": "Quitter la recette ? Votre progression sera perdue."
  },
  "offline": {
    "badge": "Hors ligne",
    "message": "Mode hors ligne - Recettes limitées au cache",
    "syncPending": "Votre avis sera envoyé dès la reconnexion"
  }
}
```

---

## 14. 🚀 Roadmap & Priorisation

### 14.1 MVP (Phase 1) - 3-4 semaines

**Priorité Haute** :
- ✅ Authentification (Login/Register) via API .NET
- ✅ Homepage (Liste + Recherche + Filtres)
- ✅ Fiche recette (Detail)
- ✅ Mode recette (Réalisation)
- ✅ Notes & Commentaires (post-réalisation uniquement)
- ✅ Mode offline (cache + sync)
- ✅ Favoris
- ✅ Settings
- ✅ Onboarding & Tutorial
- ✅ Internationalisation (FR + EN)

### 14.2 Phase 2 (Post-MVP)

**Fonctionnalités** :
- Photo de profil
- Mot de passe oublié
- Partage de recettes
- Listes de courses générées
- Notifications push
- Widget iOS/Android
- Deep linking

---

## 15. 📝 Stack Technique Recap

| Couche | Technologie |
|--------|-------------|
| Framework | React Native (Expo) |
| Langage | TypeScript (strict) |
| Styling | NativeWind v4 |
| Navigation | React Navigation v6 |
| State local | Zustand v4 |
| State serveur | TanStack Query v5 |
| Storage local | MMKV |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Backend | API .NET 10 |
| Database | PostgreSQL |
| Auth | ASP.NET Identity + JWT |
| Storage images | MinIO (S3-compatible) |
| i18n | react-i18next |

---

## 16. 📌 API Endpoints Recap

### Authentification
```
POST   /api/auth/register    { email, password, displayName }
POST   /api/auth/login       { email, password }
POST   /api/auth/refresh     { refreshToken }
POST   /api/auth/logout      (auth required)
GET    /api/auth/me          (auth required)
```

### Recettes
```
GET    /api/recipes          ?page&limit&search&tags&difficulty&sortBy&sortOrder
GET    /api/recipes/{id}
```

### Commentaires
```
GET    /api/recipes/{id}/comments
POST   /api/comments         { recipeId, content }
DELETE /api/comments/{id}
```

### Notes
```
POST   /api/ratings          { recipeId, score }  # Create or Update
```

### Favoris
```
GET    /api/favorites
POST   /api/favorites/{recipeId}
DELETE /api/favorites/{recipeId}
```

### Utilisateur
```
GET    /api/users/me
PUT    /api/users/me         { displayName }
```

### Synchronisation Offline
```
POST   /api/sync/batch       { comments: [...], ratings: [...] }
```

---

## 17. 🔄 Synchronisation Offline

### 17.1 Stratégie

**Lectures** : Toujours disponibles via cache TanStack Query (persisté dans MMKV)

**Écritures** : Queue Zustand avec retry automatique

### 17.2 Données mises en queue offline

| Action | Données stockées |
|--------|-----------------|
| Ajouter commentaire | `{ localId, recipeId, content, createdAt }` |
| Noter recette | `{ localId, recipeId, score, createdAt }` |
| Toggle favori | `{ recipeId, action: 'add' \| 'remove' }` |

### 17.3 Déclencheurs de sync

1. Au démarrage de l'app (si online)
2. Toutes les 30 minutes (si app active)
3. Lors de la reconnexion réseau
4. Manuel (pull-to-refresh)
5. Avant un logout

### 17.4 Gestion des conflits

- **Commentaires** : Toujours créés (pas de conflit possible)
- **Ratings** : Le serveur fait un upsert (dernière valeur gagne)
- **Favoris** : État final déterminé par le serveur

---

## 18. ✅ Checklist de Validation MVP

### Authentification
- [ ] Inscription fonctionnelle
- [ ] Connexion fonctionnelle
- [ ] Refresh token automatique
- [ ] Session persistante
- [ ] Déconnexion avec cleanup
- [ ] Gestion erreurs (réseau, credentials)

### Homepage
- [ ] Liste recettes affichée
- [ ] Images chargées depuis MinIO
- [ ] Filtres multi-sélection (logique ET)
- [ ] Recherche fonctionnelle (debounce)
- [ ] Infinite scroll
- [ ] Pull-to-refresh
- [ ] Skeleton loading

### Fiche Recette
- [ ] Informations complètes
- [ ] Images MinIO
- [ ] Ajustement portions
- [ ] Checkboxes ingrédients (persistés)
- [ ] Notes/commentaires visibles
- [ ] Bouton "Commencer"
- [ ] Restriction commentaire si non réalisée

### Mode Recette
- [ ] Rotation paysage forcée
- [ ] Navigation tap zones + flèches
- [ ] Barre progression auto-hide
- [ ] Timer fonctionnel
- [ ] Keep screen awake
- [ ] Gestion interruption
- [ ] Écran complétion (note/commentaire)
- [ ] Marquage "recette réalisée"
- [ ] Tutorial overlay

### Favoris
- [ ] Ajout/retrait fonctionnel
- [ ] Page favoris accessible
- [ ] Sync offline

### Settings
- [ ] Édition nom d'affichage
- [ ] Sélection langue (FR/EN)
- [ ] Sélection thème
- [ ] Toggle keep awake
- [ ] Déconnexion avec confirmation

### Offline
- [ ] Détection réseau
- [ ] Badge offline visible
- [ ] Cache recettes (TanStack Query)
- [ ] Queue commentaires/notes (Zustand)
- [ ] Sync auto reconnexion
- [ ] Endpoint batch sync

### Internationalisation
- [ ] Textes interface en FR
- [ ] Textes interface en EN
- [ ] Changement de langue dynamique
- [ ] Persistance choix langue

### Général
- [ ] Onboarding première ouverture
- [ ] Toasts de feedback (traduits)
- [ ] Gestion erreurs réseau
- [ ] Performance (60fps)

---

**Version** : 2.0  
**Date** : 2025-01-XX  
**Statut** : ✅ Prêt pour développement  
**Changements majeurs v2** :
- Migration auth vers API .NET (ASP.NET Identity + JWT)
- Images servies depuis MinIO
- Ajout internationalisation FR + EN dès le MVP
- Alignement endpoints avec API .NET

---

**Prochaine étape** : Setup projet + Configuration technique

---

**Document mis à jour avec succès ! 🎉**