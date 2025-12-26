// src/constants/theme.ts
// Tokens de design exportés pour usage TypeScript
// Les Recettes de Zazou

// ═══════════════════════════════════════════════════════════════════
// COULEURS
// ═══════════════════════════════════════════════════════════════════

export const colors = {
  // Palette principale
  forest: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#4A9B7F', // Dark mode primary
    500: '#2D5A4A', // Light mode primary
    600: '#1E3D32', // Hover/pressed
    700: '#162D25',
    800: '#0F1E19',
    900: '#080F0C',
    DEFAULT: '#2D5A4A',
  },

  cream: {
    50: '#FDFCFA',
    100: '#F5F1EB',
    200: '#E8E2D9',
    300: '#D9D1C5',
    400: '#C9BFB0',
    500: '#B8AC9A',
    DEFAULT: '#F5F1EB',
  },

  charcoal: {
    50: '#F5F5F5',
    100: '#E8E8E8',
    200: '#D1D1D1',
    300: '#A8A8A8',
    400: '#6B6B6B',
    500: '#4A4A4A',
    600: '#333333',
    700: '#2A2A2A',
    800: '#1E1E1E',
    900: '#121212',
    DEFAULT: '#1A1A1A',
  },

  // Couleurs sémantiques
  semantic: {
    success: {
      light: '#2D5A4A',
      dark: '#4A9B7F',
    },
    warning: {
      light: '#D4A574',
      dark: '#E8B889',
    },
    error: {
      light: '#C45C5C',
      dark: '#E87070',
    },
    info: {
      light: '#5C8AC4',
      dark: '#70A8E8',
    },
  },

  // Blanc et transparents
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Overlays
  overlay: {
    light: 'rgba(26, 26, 26, 0.3)',
    medium: 'rgba(26, 26, 26, 0.6)',
    dark: 'rgba(0, 0, 0, 0.7)',
  },
} as const;

// Thèmes light/dark
export const lightTheme = {
  primary: colors.forest[500],
  primaryHover: colors.forest[600],
  primaryLight: colors.forest[400],
  
  background: colors.cream[100],
  backgroundSecondary: colors.cream[200],
  surface: colors.white,
  surfaceSecondary: colors.cream[50],
  
  text: colors.charcoal.DEFAULT,
  textSecondary: colors.charcoal[400],
  textMuted: colors.charcoal[300],
  textInverse: colors.cream[100],
  
  border: colors.cream[200],
  borderLight: colors.cream[100],
  
  success: colors.semantic.success.light,
  warning: colors.semantic.warning.light,
  error: colors.semantic.error.light,
  info: colors.semantic.info.light,
};

export const darkTheme = {
  primary: colors.forest[400],
  primaryHover: colors.forest[300],
  primaryLight: colors.forest[500],
  
  background: colors.charcoal[900],
  backgroundSecondary: colors.charcoal[800],
  surface: colors.charcoal[800],
  surfaceSecondary: colors.charcoal[700],
  
  text: colors.cream[100],
  textSecondary: colors.charcoal[300],
  textMuted: colors.charcoal[400],
  textInverse: colors.charcoal[900],
  
  border: colors.charcoal[700],
  borderLight: colors.charcoal[600],
  
  success: colors.semantic.success.dark,
  warning: colors.semantic.warning.dark,
  error: colors.semantic.error.dark,
  info: colors.semantic.info.dark,
};

// ═══════════════════════════════════════════════════════════════════
// TYPOGRAPHIE
// ═══════════════════════════════════════════════════════════════════

export const fonts = {
  display: 'PlayfairDisplay-Bold',
  displayItalic: 'PlayfairDisplay-BoldItalic',
  serif: 'PlayfairDisplay-Regular',
  serifMedium: 'PlayfairDisplay-Medium',
  
  sans: 'SourceSans3-Regular',
  sansMedium: 'SourceSans3-Medium',
  sansSemiBold: 'SourceSans3-SemiBold',
  sansBold: 'SourceSans3-Bold',
} as const;

export const fontSizes = {
  display: 32,
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 18,
  bodyLg: 16,
  body: 14,
  bodySm: 12,
  caption: 11,
  overline: 10,
} as const;

export const lineHeights = {
  display: 40,
  h1: 36,
  h2: 32,
  h3: 28,
  h4: 24,
  bodyLg: 24,
  body: 20,
  bodySm: 16,
  caption: 14,
  overline: 14,
} as const;

// Styles de texte pré-configurés
export const textStyles = {
  display: {
    fontFamily: fonts.display,
    fontSize: fontSizes.display,
    lineHeight: lineHeights.display,
  },
  h1: {
    fontFamily: fonts.display,
    fontSize: fontSizes.h1,
    lineHeight: lineHeights.h1,
  },
  h2: {
    fontFamily: fonts.sansSemiBold,
    fontSize: fontSizes.h2,
    lineHeight: lineHeights.h2,
  },
  h3: {
    fontFamily: fonts.sansSemiBold,
    fontSize: fontSizes.h3,
    lineHeight: lineHeights.h3,
  },
  h4: {
    fontFamily: fonts.sansSemiBold,
    fontSize: fontSizes.h4,
    lineHeight: lineHeights.h4,
  },
  bodyLg: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyLg,
    lineHeight: lineHeights.bodyLg,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
  },
  bodySm: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodySm,
    lineHeight: lineHeights.bodySm,
  },
  caption: {
    fontFamily: fonts.sansMedium,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
  },
  overline: {
    fontFamily: fonts.sansSemiBold,
    fontSize: fontSizes.overline,
    lineHeight: lineHeights.overline,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// ESPACEMENTS
// ═══════════════════════════════════════════════════════════════════

export const spacing = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,   // xs
  2: 8,   // sm
  3: 12,  // md
  4: 16,  // base
  5: 20,  // lg
  6: 24,  // xl
  8: 32,  // 2xl
  10: 40, // 3xl
  12: 48, // 4xl
  16: 64, // 5xl
  20: 80,
  24: 96,
} as const;

// Alias sémantiques
export const spacingAliases = {
  pageX: spacing[4],      // 16px - Marge horizontale
  pageY: spacing[6],      // 24px - Marge verticale
  card: spacing[4],       // 16px - Padding cards
  section: spacing[8],    // 32px - Entre sections
  gutter: spacing[3],     // 12px - Gouttière grille
  input: spacing[3],      // 12px - Padding inputs
} as const;

// ═══════════════════════════════════════════════════════════════════
// BORDURES
// ═══════════════════════════════════════════════════════════════════

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

export const borderWidth = {
  0: 0,
  1: 1,
  1.5: 1.5,
  2: 2,
} as const;

// ═══════════════════════════════════════════════════════════════════
// OMBRES
// ═══════════════════════════════════════════════════════════════════

export const shadows = {
  light: {
    sm: {
      shadowColor: '#1A1A1A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#1A1A1A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#1A1A1A',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 8,
    },
    xl: {
      shadowColor: '#1A1A1A',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.16,
      shadowRadius: 48,
      elevation: 16,
    },
  },
  dark: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 24,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.5,
      shadowRadius: 48,
      elevation: 16,
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════

export const durations = {
  fast: 100,
  normal: 200,
  slow: 300,
  slower: 500,
} as const;

export const easings = {
  standard: [0.4, 0, 0.2, 1] as const,
  enter: [0, 0, 0.2, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
};

// Pour react-native-reanimated
export const springConfigs = {
  gentle: {
    damping: 15,
    stiffness: 150,
  },
  bouncy: {
    damping: 10,
    stiffness: 180,
  },
  stiff: {
    damping: 20,
    stiffness: 300,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// DIMENSIONS
// ═══════════════════════════════════════════════════════════════════

export const sizes = {
  // Touch targets
  touchMin: 44,
  touchRecommended: 48,
  
  // Icônes
  iconSm: 20,
  icon: 24,
  iconLg: 28,
  iconXl: 32,
  
  // Boutons
  buttonHeight: 48,
  buttonHeightSm: 40,
  
  // Inputs
  inputHeight: 48,
  
  // Navigation
  tabBarHeight: 80,
  headerHeight: 56,
  
  // Cards
  cardMaxWidth: 400,
  
  // Modales
  modalMaxWidth: 500,
  
  // Bottom sheet handle
  handleWidth: 40,
  handleHeight: 4,
} as const;

export const aspectRatios = {
  card: 16 / 10,
  recipeDetail: 4 / 3,
  square: 1,
  video: 16 / 9,
} as const;

// ═══════════════════════════════════════════════════════════════════
// OPACITÉS
// ═══════════════════════════════════════════════════════════════════

export const opacity = {
  hover: 0.8,
  pressed: 0.6,
  disabled: 0.5,
  overlay: 0.6,
  overlayLight: 0.3,
} as const;

// ═══════════════════════════════════════════════════════════════════
// BREAKPOINTS (pour responsive si nécessaire)
// ═══════════════════════════════════════════════════════════════════

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// ═══════════════════════════════════════════════════════════════════
// EXPORT PAR DÉFAUT
// ═══════════════════════════════════════════════════════════════════

const theme = {
  colors,
  lightTheme,
  darkTheme,
  fonts,
  fontSizes,
  lineHeights,
  textStyles,
  spacing,
  spacingAliases,
  borderRadius,
  borderWidth,
  shadows,
  durations,
  easings,
  springConfigs,
  sizes,
  aspectRatios,
  opacity,
  breakpoints,
};

export default theme;

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export type ThemeColors = typeof colors;
export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;
export type Fonts = typeof fonts;
export type FontSizes = typeof fontSizes;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Sizes = typeof sizes;
