// tailwind.config.js
// Configuration NativeWind v4 - Les Recettes de Zazou

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class", // Gestion manuelle du dark mode
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════
      // COULEURS
      // ═══════════════════════════════════════════════════════════
      colors: {
        // Couleurs principales
        forest: {
          DEFAULT: "#2D5A4A",
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#4A9B7F", // Utilisé en dark mode
          500: "#2D5A4A", // Principal
          600: "#1E3D32", // Hover / Dark
          700: "#162D25",
          800: "#0F1E19",
          900: "#080F0C",
        },
        cream: {
          DEFAULT: "#F5F1EB",
          50: "#FDFCFA",  // Light
          100: "#F5F1EB", // Principal
          200: "#E8E2D9", // Dark
          300: "#D9D1C5",
          400: "#C9BFB0",
          500: "#B8AC9A",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#D1D1D1",
          300: "#A8A8A8",
          400: "#6B6B6B", // Stone
          500: "#4A4A4A",
          600: "#333333",
          700: "#2A2A2A",
          800: "#1E1E1E",
          900: "#121212",
        },
        // Couleurs sémantiques
        success: {
          light: "#2D5A4A",
          dark: "#4A9B7F",
        },
        warning: {
          light: "#D4A574",
          dark: "#E8B889",
        },
        error: {
          light: "#C45C5C",
          dark: "#E87070",
        },
        info: {
          light: "#5C8AC4",
          dark: "#70A8E8",
        },
        // Alias pratiques
        background: {
          DEFAULT: "#F5F1EB",
          dark: "#121212",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#E8E2D9",
          dark: "#1E1E1E",
          "dark-secondary": "#2A2A2A",
        },
        text: {
          DEFAULT: "#1A1A1A",
          secondary: "#6B6B6B",
          muted: "#9A9A9A",
          inverse: "#F5F1EB",
        },
      },

      // ═══════════════════════════════════════════════════════════
      // TYPOGRAPHIE
      // ═══════════════════════════════════════════════════════════
      fontFamily: {
        // Display & Titres
        display: ["PlayfairDisplay-Bold", "Georgia", "serif"],
        "display-italic": ["PlayfairDisplay-BoldItalic", "Georgia", "serif"],
        serif: ["PlayfairDisplay-Regular", "Georgia", "serif"],
        "serif-medium": ["PlayfairDisplay-Medium", "Georgia", "serif"],
        
        // Corps & UI
        sans: ["SourceSans3-Regular", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        "sans-medium": ["SourceSans3-Medium", "-apple-system", "sans-serif"],
        "sans-semibold": ["SourceSans3-SemiBold", "-apple-system", "sans-serif"],
        "sans-bold": ["SourceSans3-Bold", "-apple-system", "sans-serif"],
      },

      fontSize: {
        // Échelle typographique personnalisée
        "display": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "h1": ["28px", { lineHeight: "36px", fontWeight: "700" }],
        "h2": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "h3": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "h4": ["18px", { lineHeight: "24px", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "caption": ["11px", { lineHeight: "14px", fontWeight: "500" }],
        "overline": ["10px", { lineHeight: "14px", fontWeight: "600", letterSpacing: "0.05em" }],
      },

      // ═══════════════════════════════════════════════════════════
      // ESPACEMENTS
      // ═══════════════════════════════════════════════════════════
      spacing: {
        // Système base 4
        "0": "0px",
        "px": "1px",
        "0.5": "2px",
        "1": "4px",   // xs
        "2": "8px",   // sm
        "3": "12px",  // md
        "4": "16px",  // base
        "5": "20px",  // lg
        "6": "24px",  // xl
        "8": "32px",  // 2xl
        "10": "40px", // 3xl
        "12": "48px", // 4xl
        "16": "64px", // 5xl
        "20": "80px",
        "24": "96px",
        // Alias sémantiques
        "page-x": "16px",    // Marge horizontale des pages
        "page-y": "24px",    // Marge verticale des pages
        "card": "16px",      // Padding interne cards
        "section": "32px",   // Espacement entre sections
      },

      // ═══════════════════════════════════════════════════════════
      // BORDURES
      // ═══════════════════════════════════════════════════════════
      borderRadius: {
        "none": "0px",
        "sm": "4px",
        "md": "8px",
        "lg": "12px",
        "xl": "16px",
        "2xl": "24px",
        "3xl": "32px",
        "full": "9999px",
      },

      borderWidth: {
        DEFAULT: "1px",
        "0": "0px",
        "1": "1px",
        "1.5": "1.5px",
        "2": "2px",
      },

      // ═══════════════════════════════════════════════════════════
      // OMBRES
      // ═══════════════════════════════════════════════════════════
      boxShadow: {
        // Light mode
        "sm": "0 1px 2px rgba(26, 26, 26, 0.04)",
        "md": "0 4px 12px rgba(26, 26, 26, 0.08)",
        "lg": "0 8px 24px rgba(26, 26, 26, 0.12)",
        "xl": "0 16px 48px rgba(26, 26, 26, 0.16)",
        // Dark mode (à utiliser avec dark:shadow-*)
        "dark-sm": "0 1px 2px rgba(0, 0, 0, 0.2)",
        "dark-md": "0 4px 12px rgba(0, 0, 0, 0.3)",
        "dark-lg": "0 8px 24px rgba(0, 0, 0, 0.4)",
        "dark-xl": "0 16px 48px rgba(0, 0, 0, 0.5)",
        // Spécifiques
        "card": "0 2px 8px rgba(26, 26, 26, 0.06)",
        "card-hover": "0 6px 16px rgba(26, 26, 26, 0.1)",
        "button": "0 2px 4px rgba(45, 90, 74, 0.2)",
      },

      // ═══════════════════════════════════════════════════════════
      // ANIMATIONS
      // ═══════════════════════════════════════════════════════════
      transitionDuration: {
        "fast": "100ms",
        "normal": "200ms",
        "slow": "300ms",
        "slower": "500ms",
      },

      transitionTimingFunction: {
        "standard": "cubic-bezier(0.4, 0, 0.2, 1)",
        "enter": "cubic-bezier(0, 0, 0.2, 1)",
        "exit": "cubic-bezier(0.4, 0, 1, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      animation: {
        "fade-in": "fadeIn 200ms ease-out",
        "fade-out": "fadeOut 200ms ease-in",
        "slide-up": "slideUp 300ms ease-out",
        "slide-down": "slideDown 300ms ease-out",
        "scale-in": "scaleIn 200ms ease-out",
        "shimmer": "shimmer 1.5s infinite",
        "pulse-soft": "pulseSoft 2s infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },

      // ═══════════════════════════════════════════════════════════
      // DIMENSIONS SPÉCIFIQUES
      // ═══════════════════════════════════════════════════════════
      width: {
        "touch": "44px",  // Touch target minimum
        "icon-sm": "20px",
        "icon": "24px",
        "icon-lg": "28px",
        "icon-xl": "32px",
      },

      height: {
        "touch": "44px",
        "icon-sm": "20px",
        "icon": "24px",
        "icon-lg": "28px",
        "icon-xl": "32px",
        "button": "48px",
        "button-sm": "40px",
        "input": "48px",
        "tab-bar": "80px",
      },

      minHeight: {
        "touch": "44px",
        "button": "48px",
      },

      maxWidth: {
        "card": "400px",
        "modal": "500px",
        "content": "600px",
      },

      // ═══════════════════════════════════════════════════════════
      // ASPECT RATIOS
      // ═══════════════════════════════════════════════════════════
      aspectRatio: {
        "card": "16 / 10",
        "recipe-detail": "4 / 3",
        "square": "1 / 1",
        "video": "16 / 9",
      },

      // ═══════════════════════════════════════════════════════════
      // OPACITÉS
      // ═══════════════════════════════════════════════════════════
      opacity: {
        "hover": "0.8",
        "disabled": "0.5",
        "overlay": "0.6",
        "overlay-light": "0.3",
      },
    },
  },
  plugins: [],
};
