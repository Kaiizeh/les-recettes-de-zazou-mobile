# 🎨 Brand Guidelines — Les Recettes de Zazou

## 📋 Identité de Marque

### Nom
**Les Recettes de Zazou**

### Tagline
*"Cuisinez avec passion, savourez chaque instant"*

### Personnalité de marque
- **Chaleureuse** : Comme un repas en famille
- **Authentique** : Des recettes vraies, testées, approuvées
- **Élégante** : Un design raffiné qui met en valeur la cuisine
- **Accessible** : Simple d'utilisation, pour tous les niveaux

### Ton de voix
- Bienveillant et encourageant
- Précis mais pas technique
- Personnel (tutoiement)
- Enthousiaste sans excès

---

## 🎨 Palette de Couleurs

### Mode Clair (Light Mode)

| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| **Forest** | `#2D5A4A` | 45, 90, 74 | Couleur principale, CTA, éléments actifs |
| **Forest Dark** | `#1E3D32` | 30, 61, 50 | Hover states, texte sur fond clair |
| **Forest Light** | `#3D7A64` | 61, 122, 100 | États intermédiaires |
| **Cream** | `#F5F1EB` | 245, 241, 235 | Fond principal |
| **Cream Dark** | `#E8E2D9` | 232, 226, 217 | Fond secondaire, cards |
| **Cream Light** | `#FDFCFA` | 253, 252, 250 | Fond élevé, modales |
| **White** | `#FFFFFF` | 255, 255, 255 | Fond cards, surfaces |
| **Charcoal** | `#1A1A1A` | 26, 26, 26 | Texte principal |
| **Stone** | `#6B6B6B` | 107, 107, 107 | Texte secondaire |
| **Stone Light** | `#9A9A9A` | 154, 154, 154 | Texte désactivé, placeholders |

#### Couleurs sémantiques (Light)
| Nom | Hex | Usage |
|-----|-----|-------|
| **Success** | `#2D5A4A` | Confirmations (même que Forest) |
| **Warning** | `#D4A574` | Alertes légères, badges calories |
| **Error** | `#C45C5C` | Erreurs, validations |
| **Info** | `#5C8AC4` | Informations |

---

### Mode Sombre (Dark Mode)

| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| **Forest** | `#4A9B7F` | 74, 155, 127 | Couleur principale (plus claire pour contraste) |
| **Forest Dark** | `#3D8269` | 61, 130, 105 | Hover states |
| **Forest Light** | `#5DB896` | 93, 184, 150 | États actifs intenses |
| **Background** | `#121212` | 18, 18, 18 | Fond principal |
| **Surface** | `#1E1E1E` | 30, 30, 30 | Cards, surfaces élevées |
| **Surface Light** | `#2A2A2A` | 42, 42, 42 | Éléments surélevés |
| **Elevated** | `#333333` | 51, 51, 51 | Modales, overlays |
| **Text Primary** | `#F5F1EB` | 245, 241, 235 | Texte principal (cream) |
| **Text Secondary** | `#A8A8A8` | 168, 168, 168 | Texte secondaire |
| **Text Muted** | `#6B6B6B` | 107, 107, 107 | Texte désactivé |

#### Couleurs sémantiques (Dark)
| Nom | Hex | Usage |
|-----|-----|-------|
| **Success** | `#4A9B7F` | Confirmations |
| **Warning** | `#E8B889` | Alertes légères |
| **Error** | `#E87070` | Erreurs |
| **Info** | `#70A8E8` | Informations |

---

## ✍️ Typographie

### Famille de polices

#### Titres & Display
**Playfair Display** — Serif élégante avec personnalité
- Utilisée pour : Titres de recettes, headers principaux, onboarding
- Style : Regular (400), Medium (500), Bold (700)
- Fallback : Georgia, serif

#### Corps de texte & UI
**Source Sans 3** — Sans-serif lisible et moderne
- Utilisée pour : Corps de texte, boutons, labels, navigation
- Style : Regular (400), Medium (500), SemiBold (600), Bold (700)
- Fallback : -apple-system, BlinkMacSystemFont, sans-serif

### Échelle typographique

| Token | Taille | Line Height | Poids | Usage |
|-------|--------|-------------|-------|-------|
| `display` | 32px | 40px | 700 | Titre principal page |
| `h1` | 28px | 36px | 700 | Nom de recette |
| `h2` | 24px | 32px | 600 | Sections (Ingrédients, Étapes) |
| `h3` | 20px | 28px | 600 | Sous-sections |
| `h4` | 18px | 24px | 600 | Titres cards |
| `body-lg` | 16px | 24px | 400 | Corps principal |
| `body` | 14px | 20px | 400 | Corps standard |
| `body-sm` | 12px | 16px | 400 | Texte secondaire |
| `caption` | 11px | 14px | 500 | Labels, badges |
| `overline` | 10px | 14px | 600 | Catégories, tags (uppercase) |

### Règles typographiques
- Titres de recettes : **Playfair Display Bold**, style italique optionnel
- Jamais de ALL CAPS sauf pour `overline` et badges
- Letter-spacing légèrement augmenté (+0.5%) sur les petits textes
- Utiliser `font-feature-settings: 'kern'` pour un meilleur kerning

---

## 📐 Espacements & Layout

### Grille d'espacement (base 4px)

| Token | Valeur | Usage |
|-------|--------|-------|
| `xs` | 4px | Micro-espacements |
| `sm` | 8px | Entre éléments liés |
| `md` | 12px | Padding interne compact |
| `base` | 16px | Espacement standard |
| `lg` | 20px | Entre sections |
| `xl` | 24px | Padding cards |
| `2xl` | 32px | Entre blocs majeurs |
| `3xl` | 40px | Marges de page |
| `4xl` | 48px | Grands espacements |
| `5xl` | 64px | Espacement hero |

### Rayons de bordure

| Token | Valeur | Usage |
|-------|--------|-------|
| `none` | 0px | Éléments carrés |
| `sm` | 4px | Badges, chips |
| `md` | 8px | Boutons, inputs |
| `lg` | 12px | Cards compactes |
| `xl` | 16px | Cards standards |
| `2xl` | 24px | Bottom sheets |
| `full` | 9999px | Éléments circulaires |

### Ombres (Light Mode)

```css
/* Élévation basse - cards au repos */
--shadow-sm: 0 1px 2px rgba(26, 26, 26, 0.04);

/* Élévation moyenne - cards hover */
--shadow-md: 0 4px 12px rgba(26, 26, 26, 0.08);

/* Élévation haute - modales, bottom sheets */
--shadow-lg: 0 8px 24px rgba(26, 26, 26, 0.12);

/* Élévation très haute - dropdowns */
--shadow-xl: 0 16px 48px rgba(26, 26, 26, 0.16);
```

### Ombres (Dark Mode)

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.5);
```

---

## 🧩 Composants UI

### Boutons

#### Primary Button
- Background : `Forest` → `Forest Dark` au hover
- Texte : `White`
- Padding : `12px 24px`
- Border-radius : `md` (8px)
- Font : Source Sans 3 SemiBold, 14px
- Transition : 150ms ease

#### Secondary Button
- Background : `transparent`
- Border : 1.5px `Forest`
- Texte : `Forest`
- Hover : Background `Forest`, texte `White`

#### Ghost Button
- Background : `transparent`
- Texte : `Forest`
- Hover : Background `Forest` avec 10% opacité

#### Icon Button
- Taille : 44x44px (touch target minimum)
- Background : `White` ou `transparent`
- Border-radius : `full` ou `lg`
- Icône : 24px

---

### Cards Recette

#### Card Liste (Homepage)
```
┌─────────────────────────────────┐
│ ┌─────────────────────────────┐ │
│ │                             │ │
│ │      [Image 16:10]          │ │
│ │                             │ │
│ │  ┌─────────────────────┐    │ │
│ │  │ Overlay gradient    │    │ │
│ │  │ Titre recette       │    │ │
│ │  │ Description...      │    │ │
│ │  │ ⏱ 30min • 🍽 Facile │    │ │
│ │  └─────────────────────┘    │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

- Ratio image : 16:10
- Border-radius : `xl` (16px)
- Overlay : Gradient de `transparent` à `rgba(0,0,0,0.7)`
- Texte sur overlay : `White`
- Badges : Background semi-transparent `rgba(255,255,255,0.2)`

#### Card Horizontale (Suggestions)
```
┌──────────────────────────────────┐
│ ┌────────┐                       │
│ │ Image  │  Titre recette        │
│ │ 1:1    │  ⏱ 30min • Facile     │
│ │        │  ⭐ 4.5               │
│ └────────┘                       │
└──────────────────────────────────┘
```

---

### Filtres / Tags

#### État inactif
- Background : `White`
- Border : 1px `Stone Light`
- Texte : `Charcoal`
- Icône : `Charcoal`

#### État actif
- Background : `Forest`
- Border : none
- Texte : `Cream Light`
- Icône : `Cream Light`

#### Spécifications
- Padding : `8px 16px`
- Border-radius : `full`
- Gap entre icône et texte : `6px`
- Font : Source Sans 3 Medium, 13px

---

### Badges

#### Badge Temps
- Icône : ⏱ (clock)
- Format : "30 min" ou "1h30"

#### Badge Difficulté
| Niveau | Couleur fond | Couleur texte |
|--------|--------------|---------------|
| Facile | `#E8F5E9` | `#2D5A4A` |
| Moyen | `#FFF3E0` | `#E65100` |
| Difficile | `#FFEBEE` | `#C62828` |

#### Badge Calories (optionnel)
- Icône : 🔥 (flamme)
- Format : "450 kcal"

---

### Bottom Sheet (Page Recette)

Comme dans l'image de référence :
- Image plein écran en arrière-plan
- Sheet blanc qui monte avec contenu
- Border-radius top : `2xl` (24px)
- Handle bar : 40px × 4px, centered, `Stone Light`
- Padding : `24px`

---

## 🖼️ Logo Concept

### Proposition 1 : Monogramme "RZ"
Un monogramme élégant combinant les initiales avec une touche culinaire.

```
    ╭───────╮
   ╱  R     ╲
  │    ╲z    │   ← Les lettres s'entrelacent
   ╲   ╱    ╱     avec un trait de cuillère
    ╰───────╯       stylisé
```

### Proposition 2 : Icône + Texte
Une casserole/marmite stylisée avec vapeur formant un "Z".

```
      ~ ~ ~    ← Vapeur en forme de Z
    ╭───────╮
    │       │  ← Marmite minimaliste
    ╰───┬───╯
        │
```

### Spécifications Logo
- **Taille minimum** : 32px de hauteur
- **Zone de protection** : Hauteur du logo × 0.5 autour
- **Versions** :
  - Couleur sur fond clair : `Forest`
  - Couleur sur fond sombre : `Cream Light`
  - Monochrome : Noir ou blanc selon contexte

---

## 🎭 Iconographie

### Style
- **Famille** : Lucide Icons (cohérent avec l'écosystème React Native)
- **Épaisseur** : 1.5px stroke
- **Taille standard** : 24px
- **Taille compacte** : 20px
- **Taille large** : 28px

### Icônes principales

| Usage | Icône | Nom Lucide |
|-------|-------|------------|
| Temps | ⏱ | `Clock` |
| Portions | 👥 | `Users` |
| Difficulté | ⭐ | `Star` |
| Calories | 🔥 | `Flame` |
| Favoris (off) | 🤍 | `Heart` |
| Favoris (on) | ❤️ | `Heart` (filled) |
| Bookmark (off) | 🔖 | `Bookmark` |
| Bookmark (on) | 🔖 | `Bookmark` (filled) |
| Retour | ← | `ArrowLeft` |
| Menu | ☰ | `Menu` |
| Recherche | 🔍 | `Search` |
| Filtre | ⚙ | `SlidersHorizontal` |
| Check | ✓ | `Check` |
| Plus | + | `Plus` |
| Thermomix | 🤖 | Custom icon |

---

## 📸 Traitement des Images

### Photos de recettes
- **Ratio liste** : 16:10 (horizontal)
- **Ratio détail** : 4:3 ou plein écran
- **Qualité** : WebP, 80% quality
- **Placeholder** : Blur hash ou couleur `Cream Dark`

### Overlay sur images
```css
/* Gradient pour texte lisible */
background: linear-gradient(
  180deg,
  transparent 0%,
  transparent 40%,
  rgba(0, 0, 0, 0.6) 100%
);
```

---

## ✨ Animations & Transitions

### Durées
| Token | Durée | Usage |
|-------|-------|-------|
| `fast` | 100ms | Micro-interactions |
| `normal` | 200ms | Transitions standard |
| `slow` | 300ms | Apparitions, modales |
| `slower` | 500ms | Animations complexes |

### Easing
- **Standard** : `cubic-bezier(0.4, 0, 0.2, 1)` — ease-in-out
- **Enter** : `cubic-bezier(0, 0, 0.2, 1)` — decelerate
- **Exit** : `cubic-bezier(0.4, 0, 1, 1)` — accelerate
- **Spring** : `cubic-bezier(0.34, 1.56, 0.64, 1)` — bounce

### Animations clés
- **Fade in** : Opacity 0 → 1, 200ms
- **Slide up** : TranslateY 20px → 0, 300ms
- **Scale in** : Scale 0.95 → 1, 200ms
- **Skeleton shimmer** : Gradient animé, 1.5s loop

---

## 📱 Responsive & Accessibilité

### Touch Targets
- **Minimum** : 44×44 points
- **Recommandé** : 48×48 points

### Contraste
- Texte sur fond : Minimum 4.5:1 (WCAG AA)
- Texte large : Minimum 3:1
- Éléments interactifs : Minimum 3:1

### Mode Sombre
- Automatique selon préférence système
- Toggle manuel dans Settings
- Transition fluide (300ms)

---

## 📁 Arborescence Assets

```
/assets
├── /fonts
│   ├── PlayfairDisplay-Regular.ttf
│   ├── PlayfairDisplay-Medium.ttf
│   ├── PlayfairDisplay-Bold.ttf
│   ├── PlayfairDisplay-BoldItalic.ttf
│   ├── SourceSans3-Regular.ttf
│   ├── SourceSans3-Medium.ttf
│   ├── SourceSans3-SemiBold.ttf
│   └── SourceSans3-Bold.ttf
├── /icons
│   ├── logo.svg
│   ├── logo-dark.svg
│   └── thermomix.svg
├── /images
│   ├── splash.png
│   ├── icon.png
│   ├── adaptive-icon.png
│   └── onboarding/
└── /animations
    └── loading.json (Lottie)
```

---

## ✅ Checklist d'implémentation

- [ ] Configurer `tailwind.config.js` avec tokens
- [ ] Installer et configurer les fonts (expo-font)
- [ ] Créer les composants de base (Button, Card, Badge, etc.)
- [ ] Implémenter le ThemeContext (light/dark)
- [ ] Tester les contrastes (accessibilité)
- [ ] Créer les assets (logo, icônes, splash)

---

**Version** : 1.0  
**Date** : 2025-01-XX  
**Auteur** : Brand Guidelines — Les Recettes de Zazou
