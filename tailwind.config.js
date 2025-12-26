const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Palettes de marque
        forest: {
          DEFAULT: '#2D5A4A',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#4A9B7F',
          500: '#2D5A4A',
          600: '#1E3D32',
          700: '#162D25',
          800: '#0F1E19',
          900: '#080F0C',
        },
        cream: {
          DEFAULT: '#F5F1EB',
          50: '#FDFCFA',
          100: '#F5F1EB',
          200: '#E8E2D9',
          300: '#D9D1C5',
          400: '#C9BFB0',
          500: '#B8AC9A',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
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
        },
        // Couleurs semantiques
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
};
